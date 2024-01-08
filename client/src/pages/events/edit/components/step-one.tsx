import { Button, Input, Option, Select } from "@material-tailwind/react";
import axios from "axios";
import { FC, useState } from "react";
import { UseFormRegister, UseFormReturn } from "react-hook-form";
import DELETE_BUTTON from "../../../../assets/12_edit_event/ep_delete.png";
import {
  audienceSizeCheckboxes,
  eventBudgetOptions,
  eventCategories,
  eventSubCategories,
  eventTypes,
  usStates,
} from "../../../../constants";
import api from "../../../../utils/api";
import { EventFormFormValues } from "../../../../utils/validations/event-form-validation";
import RichTextEditor from "./rich-text-editor";
import { Textarea } from "@material-tailwind/react";
import thumbnailIcon from "../../../../assets/12_edit_event/thumbnail.png";
import fileIcon from "../../../../assets/12_edit_event/files_icon.png";

interface UploadedFile extends File {
  fileName: string;
  url?: string; // Set to optional as it will be updated after upload
  progress: number;
}

interface StepOneProps {
  control: UseFormReturn<any>["control"];
  register: UseFormRegister<EventFormFormValues>;
  updateFormData: any;
  formData: any;
}

const StepOne: FC<StepOneProps> = ({
  control,
  register,
  updateFormData,
  formData,
}) => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [thumbnailFiles, setThumbnailFiles] = useState<UploadedFile[]>([]);

   const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
     const files = e.target.files;
     if (files) {
       const updatedFiles = Array.from(files);

       // Check if the files are thumbnails or regular files based on file type
       const isThumbnail = updatedFiles.some(
         (file) =>
           file.type === 'image/jpeg' ||
           file.type === 'image/png' ||
           file.type === 'image/gif'
       );

       if (isThumbnail) {
         // Handle thumbnail uploads
         // @ts-ignore
         setThumbnailFiles((prevFiles) => [...prevFiles, ...updatedFiles]);

         for (let i = 0; i < updatedFiles.length; i++) {
           await uploadThumbnailToS3(files[i], i);
         }
       } else {
         // Handle regular file uploads
         // @ts-ignore
         setUploadedFiles((prevFiles) => [...prevFiles, ...updatedFiles]);

         for (let i = 0; i < updatedFiles.length; i++) {
           await uploadFileToS3(files[i], i);
         }
       }
     }
   };

  const uploadFileToS3 = async (file: File, index: number) => {
    // @ts-ignore
    const fileExtension = file.name.split(".").pop().toLowerCase();

    if (fileExtension) {
      try {
        // Get S3 upload config
        const uploadConfig = await api.get("/upload?type=" + fileExtension);

        // Upload file to S3
        await axios.put(uploadConfig.data.url, file, {
          headers: {
            "Content-Type": file.type,
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              // @ts-ignore
              (progressEvent.loaded * 100) / progressEvent.total
            );

            setUploadedFiles((prevFiles) =>
              prevFiles.map((prevFile, i) =>
                i === index
                  ? { ...prevFile, progress: percentCompleted }
                  : prevFile
              )
            );
          },
        });

        // Update form data or do any other actions with the uploaded file info
        updateFormData((prevData: any) => ({
          ...prevData,
          // Add logic to store file info as needed
          files: [
            ...(prevData.files || []), // Previous files, if any
            {
              fileName: file.name,
              url: uploadConfig.data.key,
            },
          ],
        }));
      } catch (error) {
        console.error(error);
      } finally {
        setUploadedFiles((prevFiles) =>
          prevFiles.map((prevFile, i) =>
            i === index ? { ...prevFile, progress: 0 } : prevFile
          )
        );
      }
    }
  };

   const uploadThumbnailToS3 = async (file: File, index: number) => {
     const fileExtension = file.name.split('.').pop()?.toLowerCase();

     if (fileExtension) {
       try {
         const uploadConfig = await api.get('/upload?type=' + fileExtension);

         // Create an image element
         const img = new Image();

         // Read the file as a data URL
         const reader = new FileReader();
         reader.onload = (e) => {
           if (typeof e.target?.result === 'string') {
             // Set the source of the image to the data URL
             img.src = e.target.result;

             // When the image is loaded, create a canvas element and draw the image on it
             img.onload = () => {
               const canvas = document.createElement('canvas');
               const ctx = canvas.getContext('2d');

               // Set the canvas size to the image size
               canvas.width = img.width;
               canvas.height = img.height;

               // Draw the image on the canvas
               ctx?.drawImage(img, 0, 0);

               // Convert the canvas content to a new base64 string
               const optimizedBase64 = canvas.toDataURL(file.type);

               // Convert the base64 string to a Blob
               const optimizedBlob = dataURItoBlob(optimizedBase64);

               // Upload the optimized image to S3
               axios.put(uploadConfig.data.url, optimizedBlob, {
                 headers: {
                   'Content-Type': file.type,
                 },
                 onUploadProgress: (progressEvent) => {
                   const percentCompleted = Math.round(
                     (progressEvent.loaded * 100) / progressEvent.total!
                   );

                   setThumbnailFiles((prevFiles) =>
                     prevFiles.map((prevFile, i) =>
                       i === index
                         ? { ...prevFile, progress: percentCompleted }
                         : prevFile
                     )
                   );
                 },
               });

               // Update form data or do any other actions with the uploaded file info
               updateFormData((prevData: any) => ({
                 ...prevData,
                 thumbnail: [
                   ...(prevData.thumbnail || []),
                   {
                     fileName: file.name,
                     url: uploadConfig.data.key,
                   },
                 ],
               }));
             };
           }
         };

         // Read the file as data URL
         reader.readAsDataURL(file);
       } catch (error) {
         console.error(error);
       } finally {
         setThumbnailFiles((prevFiles) =>
           prevFiles.map((prevFile, i) =>
             i === index ? { ...prevFile, progress: 0 } : prevFile
           )
         );
       }
     }
   };

   // Helper function to convert base64 to Blob
   const dataURItoBlob = (dataURI: string) => {
     const byteString = atob(dataURI.split(',')[1]);
     const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
     const ab = new ArrayBuffer(byteString.length);
     const ia = new Uint8Array(ab);

     for (let i = 0; i < byteString.length; i++) {
       ia[i] = byteString.charCodeAt(i);
     }

     return new Blob([ab], { type: mimeString });
   };

  const handleInputChange = (name: string, value: string) => {
    updateFormData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelect = (name: string, value: string) => {
    updateFormData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const removeUploadedFile = (index: number) => {
    setUploadedFiles((prevFiles) => {
      const newFiles = [...prevFiles];
      newFiles.splice(index, 1);
      return newFiles;
    });
  };

  const removeThumbnailFile = (index: number) => {
    setThumbnailFiles((prevFiles) => {
      const newFiles = [...prevFiles];
      newFiles.splice(index, 1);
      return newFiles;
    });
  };

  return (
    <div>
      <p className='font-medium text-[18px] mb-4'>Event Details</p>

      <form>
        <div className='grid grid-cols-2 gap-x-16 gap-y-4 font-medium text-[16px] text-[#353535]'>
          <div className='col-span-2'>
            <p className='mb-2 font-medium'>
              Event Title <span className='text-[#DE5753]'>*</span>
            </p>
            <div className='mb-8 bg-input_background rounded-full'>
              <Input
                placeholder='Ex: 2023 Meeting Expo San Deigo'
                crossOrigin=''
                className='rounded-full !border !border-gray-300 text-gray-900 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10'
                labelProps={{
                  className: 'hidden',
                }}
                containerProps={{ className: 'min-w-[100px]' }}
                {...register('title')}
                onChange={(e: any) => {
                  handleInputChange('title', e.target.value);
                }}
                value={formData.title}
              />
            </div>

            <div className=''>
              <div className='grid grid-cols-3 gap-8'>
                <div className='col-span-3 sm:col-span-1'>
                  <p className='mb-2 font-medium'>Proposal Due Date</p>
                  <div className='mb-5 bg-input_background rounded-full'>
                    <Input
                      placeholder='Enter Date'
                      crossOrigin=''
                      className='rounded-full !border !border-gray-300 text-gray-900 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10 '
                      labelProps={{
                        className: 'hidden',
                      }}
                      containerProps={{ className: 'min-w-[100px]' }}
                      type='date'
                      {...register('proposalDueDate')}
                      onChange={(e: any) => {
                        handleInputChange('proposalDueDate', e.target.value);
                      }}
                      value={formData.proposalDueDate}
                    />
                  </div>
                </div>
                <div className='col-span-3 sm:col-span-1'>
                  <p className='mb-2 font-medium'>Event Start Date</p>
                  <div className='mb-5 bg-input_background rounded-full'>
                    <Input
                      placeholder='Enter Date'
                      crossOrigin=''
                      className='rounded-full !border !border-gray-300 text-gray-900 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10 '
                      labelProps={{
                        className: 'hidden',
                      }}
                      containerProps={{ className: 'min-w-[100px]' }}
                      type='date'
                      {...register('eventStartDate')}
                      onChange={(e: any) => {
                        handleInputChange('eventStartDate', e.target.value);
                      }}
                      value={formData.eventStartDate}
                    />
                  </div>
                </div>
                <div className='col-span-3 sm:col-span-1'>
                  <p className='mb-2 font-medium'>Event End Date</p>
                  <div className='mb-5 bg-input_background rounded-full'>
                    <Input
                      placeholder='Enter Date'
                      crossOrigin=''
                      className='rounded-full !border !border-gray-300 text-gray-900 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10 '
                      labelProps={{
                        className: 'hidden',
                      }}
                      containerProps={{ className: 'min-w-[100px]' }}
                      type='date'
                      {...register('eventEndDate')}
                      onChange={(e: any) => {
                        handleInputChange('eventEndDate', e.target.value);
                      }}
                      value={formData.eventEndDate}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-span-2'>
            <p className='mb-2 font-medium'>
              Event Description <span className='text-[#DE5753]'>*</span>
            </p>
            <div className='mb-5 hidden sm:block'>
              {/* @ts-ignore */}
              <RichTextEditor
                control={control}
                handleInputChange={handleInputChange}
                formData={formData}
              />
            </div>

            <div className='w-full block sm:hidden'>
              <Textarea
                label='Description'
                className='shadow-none drop-shadow-none border-none !bg-[#f3f1fb]'
              />
            </div>
          </div>
          <div className='col-span-2 sm:col-span-1'>
            <p className='mb-2 font-medium'>
              Event Type<span className='text-[#DE5753]'>*</span>{' '}
            </p>
            <div className='mb-5'>
              <Select
                label='Select Event Type'
                className='!bg-input_background'
                name='eventType'
                onChange={(e: any) => {
                  handleSelect('eventType', e);
                }}
                value={formData.eventType}
              >
                {eventTypes.map((type) => (
                  <Option key={type.value} value={type.value}>
                    {type.label}
                  </Option>
                ))}
              </Select>
            </div>
          </div>
          <div className='col-span-2 sm:col-span-1'>
            <p className='mb-2 font-medium'>
              Event Category<span className='text-[#DE5753]'>*</span>{' '}
            </p>
            <div className='mb-5'>
              <Select
                label='Select Event Category'
                className='!bg-input_background'
                name='eventCategory'
                onChange={(e: any) => {
                  handleSelect('eventCategory', e);
                }}
                value={formData.eventCategory}
              >
                {eventCategories.map((category) => (
                  <Option key={category.value} value={category.value}>
                    {category.label}
                  </Option>
                ))}
              </Select>
            </div>
          </div>
          <div className='col-span-2 sm:col-span-1'>
            <p className='mb-2 font-medium'>Event Sub Category</p>
            <div className=' mb-5'>
              <Select
                label='Select Event Sub Category'
                className='!bg-input_background'
                name='eventSubCategory'
                onChange={(e: any) => {
                  handleSelect('eventSubCategory', e);
                }}
                value={formData.eventSubCategory}
              >
                {eventSubCategories.map((category) => (
                  <Option key={category.value} value={category.value}>
                    {category.label}
                  </Option>
                ))}
              </Select>
            </div>
          </div>
          <div className='col-span-2 sm:col-span-1'>
            <p className='mb-2 font-medium'>Event Budget</p>
            <div className=' mb-8'>
              <Select
                label='Select Event Budget'
                className='!bg-input_background'
                name='eventBudget'
                onChange={(e: any) => {
                  handleSelect('eventBudget', e);
                }}
                value={formData.eventBudget}
              >
                {eventBudgetOptions.map((budget) => (
                  <Option key={budget.value} value={budget.value}>
                    {budget.label}
                  </Option>
                ))}
              </Select>
            </div>
          </div>

          <div className='col-span-2 sm:col-span-1'>
            <p className='mb-2 font-medium'>Audience Size</p>
            <div className=' mb-8'>
              <Select
                label='Select Audience Size'
                className='!bg-input_background'
                name='audienceSize'
                onChange={(e: any) => {
                  handleSelect('audienceSize', e);
                }}
                value={formData.audienceSize}
              >
                {audienceSizeCheckboxes.map((size) => (
                  <Option key={size.value} value={size.value}>
                    {size.label}
                  </Option>
                ))}
              </Select>
            </div>
          </div>
        </div>

        <p className='font-medium text-[18px] mb-4'>Address & Location</p>
        <div className='grid grid-cols-2 gap-x-16 gap-y-4 mb-4 font-medium text-[16px] text-[#353535]'>
          <div className='col-span-2 sm:col-span-1'>
            <p className='mb-2 font-medium'>Venue Name</p>
            <div className='mb-5 bg-input_background rounded-full'>
              <Input
                className='rounded-full !border !border-gray-300 text-gray-900 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10 '
                labelProps={{
                  className: 'hidden',
                }}
                containerProps={{ className: 'min-w-[100px]' }}
                placeholder='Venue Name'
                crossOrigin=''
                {...register('address.venueName')}
                onChange={(e: any) => {
                  handleSelect('address.venueName', e.target.value);
                }}
                value={formData.address?.venueName || ''}
              />
            </div>
          </div>

          <div className='col-span-2 sm:col-span-1'>
            <p className='mb-2 font-medium'>Address</p>
            <div className='mb-5 bg-input_background rounded-full'>
              <Input
                className='rounded-full !border !border-gray-300 text-gray-900 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10 '
                labelProps={{
                  className: 'hidden',
                }}
                containerProps={{ className: 'min-w-[100px]' }}
                placeholder='Address'
                crossOrigin=''
                {...register('address.venueAddress')}
                onChange={(e: any) => {
                  handleSelect('address.venueAddress', e.target.value);
                }}
                value={formData.address?.venueAddress}
              />
            </div>
          </div>
        </div>

        <div className='grid grid-cols-3 gap-x-16 gap-y-4 font-medium text-[16px] text-[#353535]'>
          <div className='col-span-3 sm:col-span-1'>
            <p className='mb-2 font-medium'>
              City<span className='text-[#DE5753]'>*</span>
            </p>
            <div className='mb-5 bg-input_background rounded-full'>
              <Input
                className='rounded-full !border !border-gray-300 text-gray-900 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10 '
                labelProps={{
                  className: 'hidden',
                }}
                containerProps={{ className: 'min-w-[100px]' }}
                placeholder='Enter City'
                crossOrigin=''
                {...register('address.city')}
                onChange={(e: any) => {
                  handleSelect('address.city', e.target.value);
                }}
                value={formData.address?.city}
              />
            </div>
          </div>

          <div className='col-span-3 sm:col-span-1'>
            <p className='mb-2 font-medium'>State</p>
            <div className='mb-5'>
              <Select
                label='Select State'
                className='!bg-input_background'
                name='address.state'
                onChange={(e: any) => {
                  handleSelect('address.state', e);
                }}
                value={formData.address?.state}
              >
                {usStates.map((state) => (
                  <Option key={state.value} value={state.value}>
                    {state.label}
                  </Option>
                ))}
              </Select>
            </div>
          </div>

          <div className='col-span-3 sm:col-span-1'>
            <p className='mb-2 font-medium'>Zip</p>
            <div className='mb-8 bg-input_background rounded-full'>
              <Input
                className='rounded-full !border !border-gray-300 text-gray-900 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10 '
                labelProps={{
                  className: 'hidden',
                }}
                containerProps={{ className: 'min-w-[100px]' }}
                placeholder='Enter Zip Code'
                crossOrigin=''
                {...register('address.zipCode')}
                onChange={(e: any) => {
                  handleSelect('address.zipCode', e.target.value);
                }}
                value={formData.address?.zipCode}
              />
            </div>
          </div>
        </div>
        <p className='font-medium text-[18px] mb-4'>File Attachment</p>
        {formData.files && formData.files.length > 0 ? (
          <div className='grid grid-cols-2 gap-x-16 gap-y-4 font-medium text-[18px] text-black mb-2'>
            {formData.files.map((file: any, index: number) => (
              <div key={index} className='mb-4'>
                <div className='flex items-center gap-4'>
                  <p>{file.fileName}</p>
                  <img
                    src={DELETE_BUTTON}
                    alt='delete'
                    className='object-scale-down w-[34px]'
                    onClick={() => removeUploadedFile(index)}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No attachments uploaded</p>
        )}

        <div className='grid grid-cols-2 gap-x-16 gap-y-4 font-medium text-[18px] text-black mb-2'>
          {formData?.thumbnail?.map((file: any, index: number) => (
            <div key={index} className='mb-4'>
              <div className='flex items-center gap-4'>
                <p>{file.fileName}</p>
                <img
                  src={DELETE_BUTTON}
                  alt='delete'
                  className='object-scale-down w-[34px]'
                  onClick={() => removeThumbnailFile(index)}
                />
              </div>
            </div>
          ))}
        </div>

        <div className='flex items-center gap-4'>
          <div className='bg-[#fff] py-3 w-[200px]'>
            <p className='text-center text-[#977df2] text-[16px]'>
              Upload your files
            </p>
            <p className='text-center text-[10px] mb-6 sm:mb-4'>
              Files should be jpg, png or bmp
            </p>

            <div className='border-dashed border-2 border-indigo-600 px-4 py-6 rounded-md'>
              <div className='flex justify-center'>
                <img
                  src={fileIcon}
                  alt='delete'
                  className='object-scale-down w-[34px]'
                />
              </div>

              {uploadedFiles.length > 0 ? (
                <div className='grid grid-cols-2 gap-x-16 gap-y-4 font-medium text-[18px] text-black mb-2'>
                  {uploadedFiles.map((file, index) => (
                    <div key={index} className='mb-4'>
                      <div className='flex items-center gap-4'>
                        <p>{file.name}</p>
                        <img
                          src={DELETE_BUTTON}
                          alt='delete'
                          className='object-scale-down w-[34px]'
                          onClick={() => removeUploadedFile(index)}
                        />
                      </div>
                      <div className='relative pt-1'>
                        <div className='flex mb-2 items-center justify-between'>
                          <div>
                            <span className='text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-teal-600 bg-teal-200'>
                              {file.progress}%
                            </span>
                          </div>
                        </div>
                        <div className='flex h-2 mb-4 overflow-hidden bg-gray-200 rounded'>
                          <div
                            style={{ width: `${file.progress}%` }}
                            className='shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-teal-500'
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className='text-center text-[13px]'>No files uploaded</p>
              )}

              <div className='flex items-center justify-center'>
                <Button
                  variant='filled'
                  color='indigo'
                  size='sm'
                  className='rounded-md py-2 mt-4 px-4 bg-primary font-poppins flex'
                >
                  <label className='text-white normal-case font-medium'>
                    Upload File
                    <input
                      type='file'
                      accept='.pdf, .doc, .docx, .jpg, .jpeg, .png'
                      onChange={handleFileUpload}
                      className='hidden' // This hides the file input element
                      multiple
                    />
                  </label>
                </Button>
              </div>
            </div>
          </div>
          {/* thumbnail upload */}

          <div className='bg-[#fff] py-3 w-[200px]'>
            <p className='text-center text-[#977df2] text-[16px]'>
              Upload your thumbnail
            </p>
            <p className='text-center text-[10px] mb-4'>
              Files should be pdf, rtf or txt
            </p>

            <div className='border-dashed border-2 border-indigo-600 px-4 py-6 rounded-md'>
              <div className='flex justify-center'>
                <img
                  src={thumbnailIcon}
                  alt='delete'
                  className='object-scale-down w-[34px]'
                  onClick={() => removeThumbnailFile(0)}
                />
              </div>

              {thumbnailFiles.length > 0 ? (
                <div className='grid grid-cols-2 gap-x-16 gap-y-4 font-medium text-[18px] text-black mb-2'>
                  {thumbnailFiles.map((file, index) => (
                    <div key={index} className='mb-4'>
                      <div className='flex items-center gap-4'>
                        <p>{file.name}</p>
                        <img
                          src={DELETE_BUTTON}
                          alt='delete'
                          className='object-scale-down w-[34px]'
                          onClick={() => removeThumbnailFile(index)}
                        />
                      </div>
                      <div className='relative pt-1'>
                        <div className='flex mb-2 items-center justify-between'>
                          <div>
                            <span className='text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-teal-600 bg-teal-200'>
                              {file.progress}%
                            </span>
                          </div>
                        </div>
                        <div className='flex h-2 mb-4 overflow-hidden bg-gray-200 rounded'>
                          <div
                            style={{ width: `${file.progress}%` }}
                            className='shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-teal-500'
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className='text-center text-[13px]'>No files uploaded</p>
              )}

              <div className='flex items-center justify-center'>
                <Button
                  variant='filled'
                  color='indigo'
                  size='sm'
                  className='rounded-md py-2 mt-4 px-4 bg-primary font-poppins flex'
                >
                  <label className='text-white normal-case font-medium'>
                    Upload File
                    <input
                      type='file'
                      accept='.pdf, .doc, .docx, .jpg, .jpeg, .png'
                      onChange={handleFileUpload}
                      className='hidden' // This hides the file input element
                      multiple
                    />
                  </label>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default StepOne;

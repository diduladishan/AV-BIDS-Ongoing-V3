import { Button } from '@material-tailwind/react';
import axios from 'axios';
import { FC, useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { ImSpinner3 } from 'react-icons/im';
import { setAlertWithTimeout } from '../../../../app/features/alerts/alertSlice';
import { useAppDispatch } from '../../../../app/hooks';
import UPLOAD_ICON from '../../../../assets/10_event_details_page/Upload icon.png';
import { Event, User } from '../../../../types';
import api from '../../../../utils/api';

interface SubmitProposalProps {
  handleOpen: () => void;
  event: Event | null;
  user: User | null;
}

export const SubmitProposal: FC<SubmitProposalProps> = ({
  handleOpen,
  event,
  user,
}) => {
  const dispatch = useAppDispatch();
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Take the first file for simplicity.
    const file = acceptedFiles[0];
    setUploadedFile(file);
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleFileUpload = async () => {
    setLoading(true);
    try {
      if (!uploadedFile) {
        console.error('No file uploaded');
        return;
      }

      const fileExtension = uploadedFile.name.split('.').pop()?.toLowerCase();

      if (!fileExtension) {
        console.error('Invalid file extension');
        return;
      }

      const uploadConfig = await api.get(`/upload?type=${fileExtension}`);

      await axios.put(uploadConfig.data.url, uploadedFile, {
        headers: {
          'Content-Type': uploadedFile.type,
        },
      });

      handleOpen();
      const { data } = await api.post(`/proposals`, {
        documents: {
          url: uploadConfig.data.key,
          fileName: uploadedFile.name,
        },
        event: event?._id,
        provider: user?._id,
      });

      dispatch(
        setAlertWithTimeout({
          message: data.message,
          color: 'green',
          open: true,
        })
      );
    } catch (error: any) {
      if (error.response) {
        handleOpen();
        dispatch(
          setAlertWithTimeout({
            message: error.response.data.error,
            color: 'red',
            open: true,
          })
        );
      } else if (error.request) {
        console.log('No response received from the server.');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error while setting up the request:', error.message);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className='m-5'>
      <div
        {...getRootProps()}
        className='bg-[#F3F1FB] px-4 py-10 border-dashed border-2 border-[#e7daff] mb-4 rounded-md cursor-pointer'
      >
        <div className='flex items-center justify-center '>
          <img
            src={UPLOAD_ICON}
            alt='aad'
            className='object-scale-down w-[50px]'
          />
        </div>
        <input {...getInputProps()} />
        <div className='flex items-center justify-center text-center'>
          <div>
            <p className='font-semibold text-[17px] mb-2'>
              {uploadedFile
                ? 'File uploaded!'
                : 'Drag files here or click to upload'}
            </p>
            {uploadedFile && (
              <div className='flex flex-col'>
                <p>File Name: {uploadedFile.name}</p>
                <p>
                  File Size: {(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB
                </p>
                {uploadedFile.type === 'application/pdf' && (
                  <embed
                    src={URL.createObjectURL(uploadedFile)}
                    type='application/pdf'
                    width='100%'
                    height='400px'
                  />
                )}
              </div>
            )}

            {!uploadedFile && (
              <p className='text-[15px]'>
                To upload file size is (Max 5Mb) and allowed file types are
                (.doc, .docx, .pdf)
              </p>
            )}
          </div>
        </div>
      </div>
      <div className='flex items-center justify-center'>
        <Button
          className='mx-6 mb-6  bg-primary flex items-center'
          onClick={handleFileUpload}
        >
          {loading && <ImSpinner3 className='animate-spin mr-2' />}
          {loading ? 'Uploading' : 'Upload Files'}
        </Button>
      </div>
    </div>
  );
};

export default SubmitProposal;

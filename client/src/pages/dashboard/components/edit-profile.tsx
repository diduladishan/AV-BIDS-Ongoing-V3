import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Option, Select } from "@material-tailwind/react";

import axios from "axios";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { setAlertWithTimeout } from "../../../app/features/alerts/alertSlice";
import { updateUser } from "../../../app/features/user/userSlice";
import { useAppDispatch } from "../../../app/hooks";
import { usStates } from "../../../constants";
import { User } from "../../../types";
import api from "../../../utils/api";
import {
  EditProfileFormSchema,
  EditProfileFormValues,
} from "../../../utils/validations/edit-profile-form-validation";

interface EditProfileProps {
  user: User | null;
}

const EditProfile: FC<EditProfileProps> = ({ user }) => {
  const [file, setFile] = useState(null);
  const dispatch = useAppDispatch();

  const { register, handleSubmit, setValue } = useForm<EditProfileFormValues>({
    resolver: zodResolver(EditProfileFormSchema),
    defaultValues: {
      firstName: user?.firstName ?? "",
      lastName: user?.lastName ?? "",
      email: user?.email ?? "",
      company: user?.company ?? "",
      phone: user?.phone ?? "",
      website: user?.website ?? "",
      companyAddress: {
        address: user?.companyAddress?.address ?? "",
        city: user?.companyAddress?.city ?? "",
        state: user?.companyAddress?.state ?? "",
        country: user?.companyAddress?.country ?? "",
        zip: user?.companyAddress?.zip ?? "",
      },
      address: {
        addressLine1: user?.address?.addressLine1 ?? "",
        addressLine2: user?.address?.addressLine2 ?? "",
        state: user?.address?.state ?? "",
        zip: user?.address?.zip ?? "",
      },
    },
  });
  const onFileChange = (event: any) => {
    setFile(event.target.files[0]);
  };

  const [selectedState, setSelectedState] = useState(
    user?.companyAddress?.state ?? ""
  );

  const [state, setState] = useState(user?.address?.state ?? "");

  const onSubmit = async (values: EditProfileFormValues) => {
    const fileExtension = file
      ? // @ts-ignore
        file.name.split(".").pop().toLowerCase()
      : null;

    if (fileExtension !== null) {
      const uploadConfig = await api.get("/upload?type=" + fileExtension);

      try {
        await axios.put(uploadConfig.data.url, file, {
          headers: {
            // @ts-ignore
            "Content-Type": file.type,
          },
        });
        const { data } = await api.put(`/users/${user?._id}`, {
          ...values,
          imageUrl: uploadConfig.data.key,
        });
        dispatch(updateUser(data));
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const { data } = await api.put(`/users/${user?._id}`, {
          ...values,
        });
        dispatch(
          setAlertWithTimeout({
            message: data.message,
            color: "green",
            open: true,
          })
        );
        dispatch(updateUser(data));
      } catch (error: any) {
        if (error.response) {
          dispatch(
            setAlertWithTimeout({
              message: error.response.data.error,
              color: "red",
              open: true,
            })
          );
        } else if (error.request) {
          console.log("No response received from the server.");
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error while setting up the request:", error.message);
        }
      }
    }
  };

  return (
    <section className="bg-[#fff] px-8 py-8 rounded-xl drop-shadow mb-6 mx-2">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid sm:grid-cols-2 gap-8">
          <div>
            <div className="flex items-center gap-4">
              <img
                src={
                  user?.imageUrl
                    ? `https://av-bids-bucket.s3.ap-south-1.amazonaws.com/${user?.imageUrl}`
                    : "https://image.pngaaa.com/569/2189569-middle.png"
                }
                alt="avatar"
                className="object-scale-down w-[67px]"
              />
              <Button
                variant="filled"
                color="indigo"
                size="sm"
                className="rounded-md w-40 py-2 mt-4 px-2 bg-primary font-poppins"
              >
                <label className="text-white normal-case text-center">
                  Upload New Photo
                  <input
                    type="file"
                    accept="image/*"
                    onChange={onFileChange}
                    className="hidden"
                  />
                </label>
              </Button>
            </div>
          </div>
          <div></div>
          <div>
            <div>
              <p className="text-[16px] mb-2">
                First Name<span className="text-[#DE5753]">*</span>
              </p>
              <div className="bg-input_background rounded-full">
                <Input
                  className="rounded-full !border !border-gray-300 text-gray-900 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                  labelProps={{
                    className: "hidden",
                  }}
                  containerProps={{ className: "min-w-[100px]" }}
                  crossOrigin=""
                  placeholder="Enter first name"
                  {...register("firstName")}
                />
              </div>
            </div>
          </div>

          <div>
            <p className="text-[16px] mb-2">Last Name</p>
            <div className="bg-input_background rounded-full">
              <Input
                className="rounded-full !border !border-gray-300 text-gray-900 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                labelProps={{
                  className: "hidden",
                }}
                containerProps={{ className: "min-w-[100px]" }}
                placeholder="Enter last name"
                crossOrigin=""
                {...register("lastName")}
              />
            </div>
          </div>

          <div>
            <div>
              <p className="text-[16px] mb-2">Email Address</p>
              <div className="bg-input_background rounded-full">
                <Input
                  className="rounded-full !border !border-gray-300 text-gray-900 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                  labelProps={{
                    className: "hidden",
                  }}
                  containerProps={{ className: "min-w-[100px]" }}
                  placeholder="Enter email"
                  label="Username"
                  crossOrigin=""
                  {...register("email")}
                />
              </div>
            </div>
          </div>
          <div>
            <div>
              <p className="text-[16px] mb-2">Company</p>
              <div className="bg-input_background rounded-full">
                <Input
                  className="rounded-full !border !border-gray-300 text-gray-900 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                  labelProps={{
                    className: "hidden",
                  }}
                  containerProps={{ className: "min-w-[100px]" }}
                  placeholder="Enter company"
                  crossOrigin=""
                  {...register("company")}
                />
              </div>
            </div>
          </div>
          <div>
            <div>
              <p className="text-[16px] mb-2">
                Phone Number <span className="text-[#DE5753]">*</span>
              </p>
              <div className="bg-input_background rounded-full">
                <Input
                  className="rounded-full !border !border-gray-300 text-gray-900 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                  labelProps={{
                    className: "hidden",
                  }}
                  containerProps={{ className: "min-w-[100px]" }}
                  placeholder="enter phone number"
                  crossOrigin=""
                  {...register("phone")}
                />
              </div>
            </div>
          </div>
          <div>
            <div>
              <p className="text-[16px] mb-2">Website</p>
              <div className="bg-input_background rounded-full">
                <Input
                  className="rounded-full !border !border-gray-300 text-gray-900 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                  labelProps={{
                    className: "hidden",
                  }}
                  containerProps={{ className: "min-w-[100px]" }}
                  placeholder="Enter url"
                  crossOrigin=""
                  {...register("website")}
                />
              </div>
            </div>
          </div>

          {user?.userType === "PLANNER" && (
            <>
              <div className="sm:col-span-2">
                <div>
                  <p className="text-[16px] mb-2">Address</p>
                  <div className="bg-input_background rounded-full">
                    <Input
                      className="rounded-full !border !border-gray-300 text-gray-900 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                      labelProps={{
                        className: "hidden",
                      }}
                      containerProps={{ className: "min-w-[100px]" }}
                      placeholder="Street Address"
                      crossOrigin=""
                      {...register("address.addressLine1")}
                    />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-2">
                <div>
                  <div className="bg-input_background rounded-full">
                    <Input
                      className="rounded-full !border !border-gray-300 text-gray-900 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                      labelProps={{
                        className: "hidden",
                      }}
                      containerProps={{ className: "min-w-[100px]" }}
                      placeholder="Address Line 2"
                      crossOrigin=""
                      {...register("address.addressLine2")}
                    />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-1">
                <div>
                  <div className="bg-input_background rounded-full">
                    {/* <Input
                  className="rounded-full !border !border-gray-300 text-gray-900 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                  labelProps={{
                    className: "hidden",
                  }}
                  containerProps={{ className: "min-w-[100px]" }}
                  placeholder="State"
                  crossOrigin=""
                /> */}
                    <Select
                      label="Select a State"
                      className="!bg-input_background"
                      value={state}
                      onChange={(value) =>
                        setValue("address.state", value || "")
                      }
                    >
                      {usStates.map((state) => (
                        <Option key={state.value} value={state.value}>
                          {state.label}
                        </Option>
                      ))}
                    </Select>
                  </div>
                </div>
              </div>
              <div className="sm:col-span-1">
                <div>
                  <div className="bg-input_background rounded-full">
                    <Input
                      className="rounded-full !border !border-gray-300 text-gray-900 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                      labelProps={{
                        className: "hidden",
                      }}
                      containerProps={{ className: "min-w-[100px]" }}
                      placeholder="Postal Code"
                      crossOrigin=""
                      {...register("address.zip")}
                    />
                  </div>
                </div>
              </div>
            </>
          )}

          <div></div>
        </div>

        <div>
          {user?.userType === "PROVIDER" && (
            <div className="grid sm:grid-cols-2 gap-8 ">
              <div className="">
                <h2 className="text-[20px] font-semibold text-left">
                  Company Address
                </h2>
              </div>

              <div className="sm:col-span-2">
                <div className="">
                  <p className="text-[16px] mb-2">
                    Address <span className="text-[#DE5753]">*</span>
                  </p>
                  <div className="bg-input_background rounded-full">
                    <Input
                      className="rounded-full !border !border-gray-300 text-gray-900 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                      labelProps={{
                        className: "hidden",
                      }}
                      containerProps={{ className: "" }}
                      placeholder="740 West Elm St. Unit 235"
                      crossOrigin=""
                      {...register("companyAddress.address")}
                    />
                  </div>
                </div>
              </div>

              <div>
                <div className="...">
                  <p className="mb-2">
                    Country <span className="text-[#DE5753]">*</span>
                  </p>
                  {/* <div className=''>
                    <Select
                      label='Select a Country'
                      className='!bg-input_background'
                      value={selectedCountry}
                      onChange={(value) =>
                        setValue('companyAddress.country', value || '')
                      }
                    >
                      <Option value='United States'>United States</Option>
                      <Option value='United Kingdom'>United Kingdom</Option>
                      <Option value='Canada'>Canada</Option>
                    </Select>
                  </div> */}
                  <div className="bg-input_background rounded-full">
                    <Input
                      className="rounded-full !border !border-gray-300 text-gray-900 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                      labelProps={{
                        className: "hidden",
                      }}
                      containerProps={{ className: "" }}
                      value="United States"
                      crossOrigin=""
                      {...register("companyAddress.country")}
                    />
                  </div>
                </div>
              </div>

              <div>
                <div className="...">
                  <p className="mb-2">
                    City <span className="text-[#DE5753]">*</span>
                  </p>
                  <div className="bg-input_background rounded-full">
                    <Input
                      className="rounded-full !border !border-gray-300 text-gray-900 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10 "
                      labelProps={{
                        className: "hidden",
                      }}
                      containerProps={{ className: "min-w-[50px]" }}
                      placeholder="City"
                      crossOrigin=""
                      {...register("companyAddress.city")}
                    />
                  </div>
                </div>
              </div>

              <div>
                <div>
                  <p className="text-[16px] mb-2">
                    Zip <span className="text-[#DE5753]">*</span>
                  </p>
                  <div className="w-full bg-input_background rounded-full">
                    <Input
                      className="rounded-full !border !border-gray-300 text-gray-900 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                      labelProps={{
                        className: "hidden",
                      }}
                      containerProps={{ className: "min-w-[100px]" }}
                      placeholder="Enter Zip Code"
                      crossOrigin=""
                      {...register("companyAddress.zip")}
                    />
                  </div>
                </div>
              </div>

              <div>
                <div className="...">
                  <p className="mb-2">
                    State <span className="text-[#DE5753]">*</span>
                  </p>
                  <div className="mb-5">
                    <div>
                      <Select
                        label="Select a State"
                        className="!bg-input_background"
                        value={selectedState}
                        onChange={(value) =>
                          setValue("companyAddress.state", value || "")
                        }
                      >
                        {usStates.map((state) => (
                          <Option key={state.value} value={state.value}>
                            {state.label}
                          </Option>
                        ))}
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end">
          <Button
            variant="filled"
            color="indigo"
            size="sm"
            type="submit"
            className="w-30 py-3 mt-4 px-6 bg-primary font-poppins rounded-full"
          >
            <span className="text-white normal-case">Submit</span>
          </Button>
        </div>
      </form>
    </section>
  );
};

export default EditProfile;

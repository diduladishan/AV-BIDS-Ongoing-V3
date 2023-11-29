import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Select, Option } from "@material-tailwind/react";

import axios from "axios";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { updateUser } from "../../../app/features/user/userSlice";
import { useAppDispatch } from "../../../app/hooks";
import { User } from "../../../types";
import api from "../../../utils/api";
import {
  EditProfileFormSchema,
  EditProfileFormValues,
} from "../../../utils/validations/edit-profile-form-validation";
import { usStates } from "../../../constants";

interface EditProfileProps {
  user: User | null;
}

const EditProfile: FC<EditProfileProps> = ({ user }) => {
  const [file, setFile] = useState(null);
  const dispatch = useAppDispatch();

  const { register, handleSubmit } = useForm<EditProfileFormValues>({
    resolver: zodResolver(EditProfileFormSchema),
    defaultValues: {
      firstName: user?.firstName ?? "",
      lastName: user?.lastName ?? "",
      email: user?.email ?? "",
      company: user?.company ?? "",
      phone: user?.phone ?? "",
      website: user?.website ?? "",
    },
  });
  const onFileChange = (event: any) => {
    setFile(event.target.files[0]);
  };

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
        dispatch(updateUser(data));
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <section className="bg-[#fff] px-8 py-8 rounded-xl drop-shadow mb-6">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2  gap-8">
          <div>
            <div className="flex items-center gap-4">
              <img
                src={
                  user?.imageUrl
                    ? `https://av-bids-bucket.s3.ap-south-1.amazonaws.com/${user?.imageUrl}`
                    : ""
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
                First Name <span className="text-[#DE5753]">*</span>
              </p>
              <div className="w-72 bg-input_background rounded-full">
                <Input
                  className="rounded-full !border !border-gray-300 text-gray-900 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                  labelProps={{
                    className: "hidden",
                  }}
                  containerProps={{ className: "min-w-[100px]" }}
                  crossOrigin=""
                  placeholder="John Smith"
                  {...register("firstName")}
                />
              </div>
            </div>
          </div>

          <div>
            <p className="text-[16px] mb-2">Last Name</p>
            <div className="w-72 bg-input_background rounded-full">
              <Input
                className="rounded-full !border !border-gray-300 text-gray-900 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                labelProps={{
                  className: "hidden",
                }}
                containerProps={{ className: "min-w-[100px]" }}
                placeholder="Smith"
                crossOrigin=""
                {...register("lastName")}
              />
            </div>
          </div>

          <div>
            <div>
              <p className="text-[16px] mb-2">Email Address</p>
              <div className="w-72 bg-input_background rounded-full">
                <Input
                  className="rounded-full !border !border-gray-300 text-gray-900 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                  labelProps={{
                    className: "hidden",
                  }}
                  containerProps={{ className: "min-w-[100px]" }}
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
              <div className="w-72 bg-input_background rounded-full">
                <Input
                  className="rounded-full !border !border-gray-300 text-gray-900 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                  labelProps={{
                    className: "hidden",
                  }}
                  containerProps={{ className: "min-w-[100px]" }}
                  placeholder="Anita Meetings LLC"
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
              <div className="w-72 bg-input_background rounded-full">
                <Input
                  className="rounded-full !border !border-gray-300 text-gray-900 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                  labelProps={{
                    className: "hidden",
                  }}
                  containerProps={{ className: "min-w-[100px]" }}
                  placeholder="+880 01723801729"
                  crossOrigin=""
                  {...register("phone")}
                />
              </div>
            </div>
          </div>
          <div>
            <div>
              <p className="text-[16px] mb-2">Website</p>
              <div className="w-72 bg-input_background rounded-full">
                <Input
                  className="rounded-full !border !border-gray-300 text-gray-900 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                  labelProps={{
                    className: "hidden",
                  }}
                  containerProps={{ className: "min-w-[100px]" }}
                  placeholder="www.anitameetings.com"
                  crossOrigin=""
                  {...register("website")}
                />
              </div>
            </div>
          </div>

          <div></div>
        </div>

        <div className="z-2">
          {" "}
          {user?.userType === "PROVIDER" && (
            <div className="grid grid-cols-2 gap-8">
              <div className="w-72">
                <h2 className="text-[20px] font-semibold text-left">
                  Company Address
                </h2>
              </div>

              <div></div>
              <div className="col-span-2">
                <div className="">
                  <p className="text-[16px] mb-2">
                    Address <span className="text-[#DE5753]">*</span>
                  </p>
                  <div className="w-full bg-input_background rounded-full">
                    <Input
                      className="rounded-full !border !border-gray-300 text-gray-900 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                      labelProps={{
                        className: "hidden",
                      }}
                      containerProps={{ className: "min-w-[100px]" }}
                      placeholder="740 West Elm St. Unit 235"
                      crossOrigin=""
                    />
                  </div>
                </div>
              </div>

              <div>
                <div className="...">
                  <p className="mb-2">
                    Country <span className="text-[#DE5753]">*</span>
                  </p>
                  <div className="">
                    <Select
                      label="United States of America"
                      className="!bg-input_background"
                    >
                      <Option>Option 01</Option>
                      <Option>Option 02</Option>
                      <Option>Option 03</Option>
                      <Option>Option 04</Option>
                      <Option>Option 05</Option>
                    </Select>
                  </div>
                </div>
              </div>

              <div>
                <div className="...">
                  <p className="mb-2">
                    City <span className="text-[#DE5753]">*</span>
                  </p>
                  <div className="bg-input_background rounded-full">
                    {/* <Select label="Phoenix" className="!bg-input_background">
                  <Option>Option 01</Option>
                  <Option>Option 02</Option>
                  <Option>Option 03</Option>
                  <Option>Option 04</Option>
                  <Option>Option 05</Option>
                </Select> */}

                    <Input
                      className="rounded-full !border !border-gray-300 text-gray-900 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10 "
                      labelProps={{
                        className: "hidden",
                      }}
                      containerProps={{ className: "min-w-[100px]" }}
                      placeholder="City"
                      crossOrigin=""
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
                      {/* <Select
                      label="Select a City"
                      className="!bg-input_background"
                    >
                      {usStates.map((state) => (
                        <Option key={state.value}>{state.label}</Option>
                      ))}
                    </Select> */}

                      <Select
                        label="United States of America"
                        className="!bg-input_background"
                      >
                        <Option>Option 01</Option>
                        <Option>Option 02</Option>
                        <Option>Option 03</Option>
                        <Option>Option 04</Option>
                        <Option>Option 05</Option>
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

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@material-tailwind/react";
import axios from "axios";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { updateUser } from "../../../app/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { RootState } from "../../../app/store";
import api from "../../../utils/api";
import {
  EditProfileFormSchema,
  EditProfileFormValues,
} from "../../../utils/validations/edit-profile-form-validation";

interface EditProfileProps {}

const EditProfile: FC<EditProfileProps> = () => {
  const [file, setFile] = useState(null);
  const user = useAppSelector((state: RootState) => state.user.user);
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
        <div className="grid grid-cols-2 justify-items-center gap-8">
          <div>
            <div className="flex items-center gap-4">
              <img
                src={`https://av-bids-bucket.s3.ap-south-1.amazonaws.com/${user?.imageUrl}`}
                alt="aad"
                className="object-scale-down w-[67px]"
              />
              <Button
                variant="filled"
                color="indigo"
                size="sm"
                className="rounded-md w-52 py-2 mt-4 px-2 bg-primary font-poppins"
              >
                <span className="text-white normal-case font-normal">
                  Upload New Photo
                </span>
              </Button>
              <Input
                type="file"
                accept="image/*"
                crossOrigin=""
                onChange={onFileChange}
              />
            </div>
          </div>
          <div></div>
          <div>
            <div>
              <p className="text-[16px] mb-2">First Name</p>
              <div className="w-72 bg-input_background rounded-full">
                <Input
                  className="rounded-full !border !border-gray-300 text-gray-900 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10 rounded-full"
                  labelProps={{
                    className: "hidden",
                  }}
                  containerProps={{ className: "min-w-[100px]" }}
                  crossOrigin=""
                  placeholder="Username"
                  {...register("firstName")}
                />
              </div>
            </div>
          </div>

          <div>
            <p className="text-[16px] mb-2">Last Name</p>
            <div className="w-72 bg-input_background rounded-full">
              <Input
                className="rounded-full !border !border-gray-300 text-gray-900 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10 rounded-full"
                labelProps={{
                  className: "hidden",
                }}
                containerProps={{ className: "min-w-[100px]" }}
                label="Username"
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
                  className="rounded-full !border !border-gray-300 text-gray-900 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10 rounded-full"
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
                  className="rounded-full !border !border-gray-300 text-gray-900 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10 rounded-full"
                  labelProps={{
                    className: "hidden",
                  }}
                  containerProps={{ className: "min-w-[100px]" }}
                  label="Username"
                  crossOrigin=""
                  {...register("company")}
                />
              </div>
            </div>
          </div>
          <div>
            <div>
              <p className="text-[16px] mb-2">Phone Number</p>
              <div className="w-72 bg-input_background rounded-full">
                <Input
                  className="rounded-full !border !border-gray-300 text-gray-900 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10 rounded-full"
                  labelProps={{
                    className: "hidden",
                  }}
                  containerProps={{ className: "min-w-[100px]" }}
                  label="Username"
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
                  className="rounded-full !border !border-gray-300 text-gray-900 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10 rounded-full"
                  labelProps={{
                    className: "hidden",
                  }}
                  containerProps={{ className: "min-w-[100px]" }}
                  label="Username"
                  crossOrigin=""
                  {...register("website")}
                />
              </div>
            </div>
          </div>

          <div></div>
        </div>

        <div className="flex justify-end">
          <Button
            variant="filled"
            color="indigo"
            size="sm"
            type="submit"
            className="w-30 py-3 mt-4 px-6 bg-primary font-poppins rounded-full"
          >
            <span className="text-white">Submit</span>
          </Button>
        </div>
      </form>
    </section>
  );
};

export default EditProfile;

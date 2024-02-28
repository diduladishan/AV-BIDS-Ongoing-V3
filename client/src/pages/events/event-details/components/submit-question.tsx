import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Textarea } from "@material-tailwind/react";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { setAlertWithTimeout } from "../../../../app/features/alerts/alertSlice";
import { useAppDispatch } from "../../../../app/hooks";
import { Event } from "../../../../types";
import api from "../../../../utils/api";
import {
  QuestionFormSchema,
  QuestionFormValues,
} from "../../../../utils/validations/question-form-validation";

interface SubmitQuestionProps {
  event: Event | null;
}

const SubmitQuestion: FC<SubmitQuestionProps> = ({ event }) => {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<QuestionFormValues>({
    resolver: zodResolver(QuestionFormSchema),
    defaultValues: {
      email: "",
      phone: "",
      subject: "",
      description: "",
    },
  });

  const onSubmit = async (values: QuestionFormValues) => {
    try {
      const { data } = await api.post("/email/event-question", {
        ...values,
        eventId: event?._id,
      });
      dispatch(
        setAlertWithTimeout({
          message: data.message,
          color: "green",
          open: true,
        })
      );
    } catch (error: any) {
      dispatch(
        setAlertWithTimeout({
          message: error.response.data.error,
          color: "red",
          open: true,
        })
      );
      console.log(error);
    }
  };
  return (
    <div>
      <h2 className="text-[18px] sm:text-[20px] mb-4">
        Submit a question about the event
      </h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-y-8 gap-x-6">
          <div className="col-span-2 sm:col-span-1">
            <p className="text-[16px] mb-2 font-medium">Email Address </p>
            <div className="w-full bg-input_background rounded-full">
              <Input
                className="rounded-full !border !border-gray-300 text-gray-900 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                labelProps={{
                  className: "hidden",
                }}
                containerProps={{ className: "min-w-[100px]" }}
                crossOrigin=""
                placeholder="example@example.com"
                {...register("email")}
              />
            </div>
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="col-span-2 sm:col-span-1">
            <p className="text-[16px] mb-2 font-medium">Phone Number</p>
            <div className="w-full bg-input_background rounded-full">
              <Input
                className="rounded-full !border !border-gray-300 text-gray-900 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                labelProps={{
                  className: "hidden",
                }}
                containerProps={{ className: "min-w-[100px]" }}
                crossOrigin=""
                placeholder="Phone Number"
                {...register("phone")}
              />
            </div>
            {errors.phone && (
              <p className="text-red-500">{errors.phone.message}</p>
            )}
          </div>

          <div className="col-span-2">
            <p className="text-[16px] mb-2 font-medium">Subject</p>
            <div className="w-full bg-input_background rounded-full">
              <Input
                className="rounded-full !border !border-gray-300 text-gray-900 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                labelProps={{
                  className: "hidden",
                }}
                containerProps={{ className: "min-w-[100px]" }}
                crossOrigin=""
                placeholder="Subject text"
                {...register("subject")}
              />
            </div>
            {errors.subject && (
              <p className="text-red-500">{errors.subject.message}</p>
            )}
          </div>

          <div className="rounded-lg col-span-2">
            <p className="text-[16px] mb-2 font-medium">Description</p>
            <div className="mb-6">
              <Textarea
                label="Description"
                className="!bg-[#F3F1FB] border-solid border-2 border-[#E4E4E4]"
                {...register("description")}
              />
              {errors.description && (
                <p className="text-red-500">{errors.description.message}</p>
              )}
            </div>

            <div className="flex justify-end mb-16">
              <Button
                variant="filled"
                color="indigo"
                size="sm"
                type="submit"
                className="rounded-full w-30 py-3 px-6 mt-4  bg-primary font-poppins"
              >
                <span className="text-white normal-case text-[14px]">
                  Submit
                </span>
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SubmitQuestion;

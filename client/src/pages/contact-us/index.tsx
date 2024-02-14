import CONTACT_US from "../../assets/7_contact_us/Call center-pana 1.png";
import CONTACT_US_01 from "../../assets/7_contact_us/Email.png";
import CONTACT_US_02 from "../../assets/7_contact_us/Phone.png";
import CONTACT_US_03 from "../../assets/7_contact_us/location.png";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Card,
  Input,
  Option,
  Select,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  ContactFormSchema,
  ContactFormValues,
} from "../../utils/validations/contact-form-validation";

import api from "../../utils/api";

function Index() {
  const [subject, setSubject] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { register, handleSubmit } = useForm<ContactFormValues>({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  const handleSubjectChange = (value: string) => {
    setSubject(value);
  };

  const onSubmit = async (values: ContactFormValues) => {
    try {
      await api.post("/email/contact-form", { ...values, subject });
      setFormSubmitted(true);
      setTimeout(() => {
        setFormSubmitted(false);
      }, 5000);
    } catch (error: any) {
      console.log("Error while setting up the request:", error.message);
    }
  };

  return (
    <div className="container mx-auto">
      <section className="py-8 md:py-16 grid md:grid-cols-2 content-center">
        <div className="px-0 md:px-8 lg:px-16 flex flex-col justify-center items-center md:items-start text-center md:text-left">
          <div className="bg-[#B5F9C4] rounded-full w-32 mb-4">
            <p className="text-[#178751] font-semibold px-4 py-1 text-center">
              Contact Us
            </p>
          </div>
          <h2 className="text-primary mb-3">Get in touch today</h2>
          <p className="text-primary_font_color ">
            Let us know how we can help or answer any questions. We would love
            to hear feedback about the site as well so we can make the user
            experience better.
          </p>

          <div className="mt-6">
            <div className="sm:flex items-center gap-16 mb-6">
              <div className="flex items-center gap-4 mb-6 sm:mb-0">
                <div className="flex items-center justify-center rounded-full w-12 h-12 bg-[#F3F1FB]">
                  <img
                    src={CONTACT_US_01}
                    alt="aad"
                    className="object-scale-down"
                  />
                </div>

                <p className="text-primary_font_color">info@avbids.com</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center rounded-full w-12 h-12 bg-[#F3F1FB]">
                  <img
                    src={CONTACT_US_02}
                    alt="aad"
                    className=" object-scale-down"
                  />
                </div>
                <p className="text-primary_font_color">(623) 420-6666</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center rounded-full w-12 h-12 bg-[#F3F1FB]">
                <img
                  src={CONTACT_US_03}
                  alt="aad"
                  className=" object-scale-down"
                />
              </div>
              <p className="text-primary_font_color">Phoenix, Arizona</p>
            </div>
          </div>
          <img
            src={CONTACT_US}
            alt="Contact us page main img"
            className="w-[500px] object-scale-down"
          />
        </div>

        <div className="flex justify-center items-center">
          {formSubmitted ? (
            <Card color="transparent" shadow={false}>
              <div className="p-6 rounded-xl bg-green-500 text-white">
                <Typography variant="h6" color="white">
                  Thank you for contacting us!
                </Typography>
                <p>Your message has been successfully submitted.</p>
              </div>
            </Card>
          ) : (
            <>
              <Card color="transparent" shadow={false}>
                <form
                  className="mt-8 mb-2 w-[23rem] max-w-screen-lg sm:w-96 bg-[#F3F1FB] p-6  rounded-xl"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="mb flex flex-col gap-2 ">
                    <Typography variant="h6" color="blue-gray" className="">
                      Name
                    </Typography>
                    <Input
                      placeholder="Enter Name"
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900 bg-white rounded-full"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                      crossOrigin=""
                      {...register("name")}
                    />
                    <Typography variant="h6" color="blue-gray" className="mt-3">
                      Email<span className="text-[#DE5753]">*</span>
                    </Typography>
                    <Input
                      placeholder="Enter Email"
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900 bg-white rounded-full"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                      crossOrigin=""
                      {...register("email")}
                    />
                    <Typography variant="h6" color="blue-gray" className="mt-3">
                      Phone
                    </Typography>
                    <Input
                      type="tel"
                      placeholder="Enter Phone Number"
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900 bg-white rounded-full"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                      crossOrigin=""
                      {...register("phone")}
                    />
                  </div>

                  <Typography
                    variant="h6"
                    color="blue-gray"
                    className="mt-5 mb-2"
                  >
                    Subject<span className="text-[#DE5753]">*</span>
                  </Typography>
                  <div className="border-none">
                    <Select
                      label="Select a Subject"
                      className="bg-white rounded-full border-none"
                      labelProps={{
                        className: "after:border-none before:border-none",
                      }}
                      value={subject}
                      // @ts-ignore
                      onChange={(value: string) => handleSubjectChange(value)}
                    >
                      <Option value="Feedback">Feedback</Option>
                      <Option value="Services">Services</Option>
                      <Option value="Help & Support">Help & Support</Option>
                      <Option value="Other">Other</Option>
                    </Select>
                  </div>

                  <Typography
                    variant="h6"
                    color="blue-gray"
                    className="mt-5 mb-2"
                  >
                    Message<span className="text-[#DE5753]">*</span>
                  </Typography>
                  <div className="">
                    <Textarea
                      placeholder="Please type your message"
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900 bg-white rounded-xl"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                      {...register("message")}
                    />
                  </div>
                  <div className="flex items-center justify-end">
                    <Button
                      className="mt-6 bg-primary rounded-full normal-case"
                      type="submit"
                    >
                      Submit
                    </Button>
                  </div>
                </form>
              </Card>
            </>
          )}
        </div>
      </section>
    </div>
  );
}

export default Index;

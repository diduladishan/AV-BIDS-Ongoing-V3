import React from "react";

import {
  Button,
  Input,
  Card,
  Typography,
  Select,
  Option,
} from "@material-tailwind/react";

import AVATAR from "../../assets/11_dashboard/avatar.png";

import PLUS_ICON from "../../assets/11_dashboard/plus.png";

import DELETE from "../../assets/15_dashboard/delete.png";

import EDIT from "../../assets/15_dashboard/edit.png";

// ------------------------------------Table Contents--------------------------------------------------
const TABLE_HEAD = ["Name", "Role", "Email", ""];

const TABLE_ROWS = [
  {
    name: "Dixie Normus",
    Role: "Manager",
    email: "dixie@anitameetings.com",
  },
  {
    name: "Jane Smith",
    Role: "Developer",
    email: "dixie@anitameetings.com",
  },
  {
    name: "Jane Smith",
    Role: "Executive",
    email: "dixie@anitameetings.com",
  },
  {
    name: "Jane Smith",
    Role: "Developer",
    email: "dixie@anitameetings.com",
  },
  {
    name: "Jane Smith",
    Role: "Manager",
    email: "dixie@anitameetings.com",
  },
];
// ------------------------------------Table Contents--------------------------------------------------

function index() {
  return (
    <div className="container mx-auto">
      <section className="bg-[#fff] px-8 py-8 rounded-xl drop-shadow mb-6">
        <div>
          <div className="grid grid-cols-2  gap-8">
            <div>
              <div className="flex items-center gap-4">
                <img
                  src={AVATAR}
                  alt="aad"
                  className="object-scale-down w-[67px]"
                />
                <Button
                  variant="filled"
                  color="indigo"
                  size="sm"
                  className="rounded-md w-41 py-2 mt-4 px-4 bg-primary font-poppins"
                >
                  <span className="text-white normal-case">
                    Upload New Photo
                  </span>
                </Button>
              </div>
            </div>
            <div></div>
            <div>
              <div>
                <p className="text-[16px] mb-2">Full Name</p>
                <div className="w-72">
                  <Input
                    label="John Smith"
                    crossOrigin=""
                    className=" bg-[#f0edfc]"
                  />
                </div>
              </div>
            </div>

            <div>
              <div>
                <p className="text-[16px] mb-2">Email Address</p>
                <div className="w-72">
                  <Input
                    label="info@anitameetings.com"
                    crossOrigin=""
                    className=" bg-[#f0edfc]"
                  />
                </div>
              </div>
            </div>
            <div>
              <div>
                <p className="text-[16px] mb-2">Company</p>
                <div className="w-72">
                  <Input
                    label="Anita Meetings LLC"
                    crossOrigin=""
                    className=" bg-[#f0edfc]"
                  />
                </div>
              </div>
            </div>
            <div>
              <div>
                <p className="text-[16px] mb-2">Phone Number</p>
                <div className="w-72">
                  <Input
                    label="+880 01723801729"
                    crossOrigin=""
                    className=" bg-[#f0edfc]"
                  />
                </div>
              </div>
            </div>
            <div>
              <div>
                <p className="text-[16px] mb-2">Website</p>
                <div className="w-72">
                  <Input
                    label="www.anitameetings.com"
                    crossOrigin=""
                    className=" bg-[#f0edfc]"
                  />
                </div>
              </div>
            </div>

            <div></div>

            {/* <div>
              <h2 className="text-[20px] font-semibold text-left">
                Company Address
              </h2>
            </div> */}

            <div className="w-72">
              <h2 className="text-[20px] font-semibold text-left">
                Company Address
              </h2>
            </div>
            <div></div>

            <div className="col-span-2">
              <p className="text-[16px] mb-2">Address</p>
              <div>
                <Input
                  label="740 West Elm St. Unit 235"
                  crossOrigin=""
                  className=" bg-[#f0edfc]"
                />
              </div>
            </div>

            <div className="...">
              <p className="mb-2">Country</p>
              <div className="mb-5">
                <Select
                  label="United States of America"
                  className="bg-[#eeebfc]"
                >
                  <Option>Option 01</Option>
                  <Option>Option 02</Option>
                  <Option>Option 03</Option>
                  <Option>Option 04</Option>
                  <Option>Option 05</Option>
                </Select>
              </div>
            </div>

            <div className="...">
              <p className="mb-2">City</p>
              <div className="mb-5">
                <Select label="Phoenix" className="bg-[#eeebfc]">
                  <Option>Option 01</Option>
                  <Option>Option 02</Option>
                  <Option>Option 03</Option>
                  <Option>Option 04</Option>
                  <Option>Option 05</Option>
                </Select>
              </div>
            </div>

            <div>
              <p className="text-[16px] mb-2">Zip</p>
              <div className="w-full">
                <Input
                  label="Enter Zip Code"
                  crossOrigin=""
                  className=" bg-[#f0edfc]"
                />
              </div>
            </div>

            <div className="...">
              <p className="mb-2">State</p>
              <div className="mb-5">
                <Select label="Arizona" className="bg-[#eeebfc]">
                  <Option>Option 01</Option>
                  <Option>Option 02</Option>
                  <Option>Option 03</Option>
                  <Option>Option 04</Option>
                  <Option>Option 05</Option>
                </Select>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              variant="filled"
              color="indigo"
              size="sm"
              className="rounded-md w-30 py-3 mt-4 px-6 bg-primary font-poppins rounded-full"
            >
              <span className="text-white">Submit</span>
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-[#fff] px-8 py-8 rounded-xl drop-shadow mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[20px] font-semibold">Members</h2>
          <Button
            variant="outlined"
            size="sm"
            className="hidden lg:inline-block rounded-btn "
          >
            <div className="flex items-center gap-2">
              <img src={PLUS_ICON} alt="aad" className="object-contain" />
              <span className="text-black normal-case">Add New Member</span>
            </div>
          </Button>
        </div>

        <div>
          <Card className="h-full w-full shadow-none rounded-xl ">
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th
                      key={head}
                      className="border-b border-blue-gray-100 bg-[#e7daff] p-4"
                    >
                      <p className="font-medium leading-none text-black">
                        {head}
                      </p>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TABLE_ROWS.map(({ name, Role, email }, index) => {
                  const isLast = index === TABLE_ROWS.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={name}>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {name}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {Role}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {email}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          as="a"
                          href="#"
                          variant="small"
                          color="blue-gray"
                          className="font-medium"
                        >
                          Edit
                        </Typography>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Card>
        </div>
      </section>

      <section className="bg-[#fff] px-8 py-8 rounded-xl drop-shadow mb-6">
        <h2 className="text-[20px] font-semibold mb-4">
          Upload Your Proof of Insurance *
        </h2>

        <div className="bg-[#F3F1FB] px-4 py-10 border-dashed border-2 border-[#e7daff] mb-4 rounded-md">
          <div className="flex items-center justify-center text-center">
            <div>
              <p className="font-semibold text-[17px] mb-2">
                Drop files here to upload
              </p>
              <p className="text-[15px] ">
                To upload file size is (Max 5Mb) and allowed file types are
                (.doc, .docx, .pdf)
              </p>
              <Button
                variant="filled"
                color="indigo"
                size="sm"
                className="rounded-md w-41 py-2 mt-4 px-4 bg-primary font-poppins"
              >
                <span className="text-white">Upload File</span>
              </Button>
            </div>
          </div>
        </div>

        <div className="bg-[#F3F1FB] p-8 flex items-center w-[120px] rounded-md">
          <div>
            <p className="font-semibold text-[17px] mb-2 text-center">COI</p>
            <div className="flex items-center gap-2">
              <img
                src={EDIT}
                alt="aad"
                className="object-scale-down w-[20px]"
              />
              <img
                src={DELETE}
                alt="aad"
                className="object-scale-down w-[20px]"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#fff] px-8 py-8 rounded-xl drop-shadow mb-6">
        <h2 className="text-[20px] font-semibold mb-4">Change Password</h2>

        <div className="grid grid-cols-1 gap-4">
          <div>
            <p className="mb-2">Current password</p>
            <div className="w-72">
              <Input
                type="password"
                label="Password"
                crossOrigin=""
                className=" bg-[#f0edfc]"
              />
            </div>
          </div>

          <div>
            <p className="mb-2">New Password</p>
            <div className="w-72">
              <Input
                type="password"
                label="Password"
                crossOrigin=""
                className=" bg-[#f0edfc]"
              />
            </div>
          </div>
          <div>
            {" "}
            <p className="mb-2">Confirm New Password</p>
            <div className="w-72">
              <Input
                type="password"
                label="Password"
                crossOrigin=""
                className=" bg-[#f0edfc]"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4">
          <Button
            variant="filled"
            color="indigo"
            size="sm"
            className="rounded-md w-30 py-3 mt-4 px-6 bg-primary font-poppins rounded-full"
          >
            <span className="text-white">Delete Account</span>
          </Button>

          <Button
            variant="filled"
            color="indigo"
            size="sm"
            className="rounded-md w-30 py-3 mt-4 px-6 bg-primary font-poppins rounded-full"
          >
            <span className="text-white">Submit</span>
          </Button>
        </div>
      </section>
    </div>
  );
}

export default index;

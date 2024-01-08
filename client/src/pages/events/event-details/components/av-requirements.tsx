import { FC, useState } from "react";
import { Event } from "../../../../types";
import RequirementDialog from "./requirement-dialog";

interface AvRequirementsProps {
  event: Event | null;
}

const AvRequirements: FC<AvRequirementsProps> = ({ event }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);
  return (
    <div className="bg-[#F3F1FB] mt-8 p-6 rounded-lg">
      <h2 className="text-[18px] sm:text-[20px]">AV Requirements</h2>

      <p className="mt-2 text-[16px]">
        Click{" "}
        <span
          className="underline text-purple-500 cursor-pointer"
          onClick={handleOpen}
        >
          here
        </span>{" "}
        to view Audio Video requirements of this event
      </p>
      <RequirementDialog open={open} handleOpen={handleOpen} event={event} />
    </div>
  );
};

export default AvRequirements;

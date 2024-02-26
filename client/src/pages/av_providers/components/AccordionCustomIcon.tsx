import React from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

function Icon({ id, open }: { id: string | number; open: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${
        id === open ? "rotate-180" : ""
      } h-5 w-5 transition-transform`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
}

export function AccordionCustomIcon() {
  const [open, setOpen] = React.useState(0);

  const handleOpen = (value: number) => setOpen(open === value ? 0 : value);

  return (
    <>
      <Accordion open={open === 1} icon={<Icon id={1} open={String(open)} />}>
        <AccordionHeader onClick={() => handleOpen(1)}>
          <p className="text-[#000000] font-semibold text-[18px]">
            What benefit does AV Bids provide?
          </p>
        </AccordionHeader>
        <AccordionBody>
          <p className="text-[16px] text-[#353535]">
            Any and all event types! Start with corporate, non-corporate,
            in-person, virtual, or hybrid. Choose from our categories when
            posting a new event or simply fill in the “Other” section if you do
            not see your event category. Feel free to reach out if you think we
            should add a category.
          </p>
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 2} icon={<Icon id={2} open={String(open)} />}>
        <AccordionHeader onClick={() => handleOpen(2)}>
          <p className="text-[#000000] font-semibold text-[18px]">
            Can I join for free as an av provider?
          </p>
        </AccordionHeader>
        <AccordionBody>
          <p className="text-[16px] text-[#353535]">
            It’s free to join however it defaults as a trial period, lasting
            only three days before a membership is required. During this trial
            period you can browse the events page but will not be able to submit
            proposals or connect with event planners.
          </p>
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 3} icon={<Icon id={3} open={String(open)} />}>
        <AccordionHeader onClick={() => handleOpen(3)}>
          <p className="text-[#000000] font-semibold text-[18px]">
            What type of events do event managers post?
          </p>
        </AccordionHeader>
        <AccordionBody>
          <p className="text-[16px] text-[#353535]">
            Our platform is meant for any and all types of events. Corporate,
            non-corporate, in-person, virtual, or hybrid. Check our “Event
            Categories” page to see our current options for events. We always
            try to keep them updated based on our event managers feedback.
          </p>
        </AccordionBody>
      </Accordion>
    </>
  );
}

export default AccordionCustomIcon;

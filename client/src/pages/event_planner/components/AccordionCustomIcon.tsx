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
            What type of events can I post?
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
            How does AV Bids make money?
          </p>
        </AccordionHeader>
        <AccordionBody>
          <p className="text-[16px] text-[#353535]">
            We charge a monthly subscription fee to av providers to use the
            site. For event managers it’s always free to post events, you can
            even add up to three members to your organization for free.
          </p>
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 3} icon={<Icon id={3} open={String(open)} />}>
        <AccordionHeader onClick={() => handleOpen(3)}>
          <p className="text-[#000000] font-semibold text-[18px]">
            What if I need help getting started?
          </p>
        </AccordionHeader>
        <AccordionBody>
          <p className="text-[16px] text-[#353535]">
            Whether you need help posting a new event or simply need guidance on
            what you’ll need for your event, you can always give us a call and
            we’d be happy to help guide you. Click on our Contact Us page to get
            started. You can also click on our Services page to see what
            services AV Bids currently has to offer in-house.
          </p>
        </AccordionBody>
      </Accordion>
    </>
  );
}

export default AccordionCustomIcon;

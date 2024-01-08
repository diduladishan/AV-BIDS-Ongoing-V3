import { Button, Checkbox, Spinner } from "@material-tailwind/react";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import React, { useState } from "react";
import { useAppSelector } from "../../../app/hooks";
import { RootState } from "../../../app/store";
import { StripePrice } from "../../../types";

interface Page02Props {
  onNext: () => void;
  onPrev: () => void;
}

const Page02: React.FC<Page02Props> = ({ onNext, onPrev }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const plan = useAppSelector((state: RootState) => state.stripe.plan);
  const priceList = useAppSelector((state: RootState) => state.stripe.prices);

  const prices = priceList as StripePrice[];

  if (!stripe || !elements) {
    // Stripe.js has not loaded yet. Make sure to disable
    // form submission until Stripe.js has loaded.
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  const handleSubmit = async () => {
    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/billing/success`,
      },
    });

    if (error) {
      setMessage(error.message!);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  return (
    <div>
      <div className="bg-[#f7f6fd]  py-10">
        <div className="grid sm:grid-cols-3 gap-x-16">
          <section className="bg-[#fff] px-8 py-8 rounded-xl drop-shadow mb-6 col-span-2">
            <h2 className="text-[20px] font-semibold mb-4">Billing Period</h2>

            <div>
              <div>
                <div>
                  {prices.map((price) => (
                    <div
                      key={price.id}
                      className="flex items-center gap-4 w-[550px] mb-8"
                    >
                      <div className="flex items-center">
                        <Checkbox
                          ripple={false}
                          className="h-5 w-5 rounded-full border-gray-900/20 bg-gray-900/10 transition-all hover:scale-105 hover:before:opacity-0"
                          color="purple"
                          crossOrigin=""
                          checked={plan?.id === price.id}
                        />
                        <p>
                          {price.recurring.interval === "year"
                            ? "Yearly"
                            : "Monthly"}
                        </p>
                      </div>

                      <div className="flex items-center">
                        <p>----------</p>
                      </div>

                      <div>
                        <p className="mt-2">
                          {price.recurring.interval === "year"
                            ? "$349/month"
                            : "$399/month"}
                        </p>
                      </div>
                    </div>
                  ))}

                  <PaymentElement />
                </div>
              </div>
            </div>
          </section>

          <div>
            <div>
              <p className="text-[28px] font-semibold mb-4">Order Summary</p>
              <div className="grid grid-cols-2 gap-y-4">
                <div>
                  <p className="text-[#353535]">
                    {plan?.recurring.interval === "year"
                      ? "$349 per month"
                      : "$399 per month"}
                  </p>
                </div>

                <div>
                  <p className="text-[#353535] text-right ">
                    ${plan?.unit_amount && (plan?.unit_amount / 100).toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-[#000000] font-bold border-b-2 border-[#D4D2DF]">
                    Total
                  </p>
                </div>

                <div className="">
                  <p className="text-[#000000] font-bold text-right border-b-2 border-[#D4D2DF]">
                    $
                    {/* {(plan?.recurring.interval === 'year'
                      ? plan?.unit_amount / 1200
                      : plan?.unit_amount! / 100
                    ).toFixed(2)} */}
                    {plan?.unit_amount && (plan?.unit_amount / 100).toFixed(2)}
                  </p>
                </div>

                <Button
                  className="bg-purple_two rounded-full mb-4 col-span-2 w-full"
                  disabled={isLoading || !stripe || !elements}
                  onClick={() => handleSubmit()}
                >
                  <div className="flex items-center justify-center">
                    {isLoading ? (
                      <Spinner className=" h-5 w-5" />
                    ) : (
                      <p className="font-semibold normal-case text-[15px]">
                        Confirm and Purchase
                      </p>
                    )}
                  </div>
                </Button>

                <Button
                  className="bg-[#181059] rounded-full mb-4 col-span-2 w-full"
                  onClick={onPrev}
                >
                  <p className="font-semibold normal-case text-[15px]">
                    Go Back and Edit
                  </p>
                </Button>

                {message && <div>{message}</div>}

                <div className="col-span-2">
                  <p className="text-[#353535]">
                    {`You’ll be charged                   
                    ${
                      plan?.recurring.interval === "year"
                        ? " a total of $4188.00 which is $349 per month"
                        : "$399 per month"
                    }
                         until you cancel the subscription.`}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page02;

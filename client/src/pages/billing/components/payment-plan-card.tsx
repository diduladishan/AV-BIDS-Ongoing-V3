import { Spinner } from '@material-tailwind/react';
import { FC, useState } from 'react';
import {
  setPlan,
  setSubscription,
} from '../../../app/features/stripe/stripeSlice';
import { useAppDispatch } from '../../../app/hooks';
import { useGetCurrentUser } from '../../../app/hooks/useUser';
import { StripePrice } from '../../../types';
import api from '../../../utils/api';

// new imports
import { MdCheck } from 'react-icons/md';
import { setUser } from '../../../app/features/user/userSlice';

interface PaymentPlanCardProps {
  src: string;
  plan: StripePrice;
  price: number;
  priceId: string;
  onNext: () => void;
}

const PaymentPlanCard: FC<PaymentPlanCardProps> = ({
  src,
  plan,
  price,
  onNext,
  priceId,
}) => {
  const user = useGetCurrentUser();
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);
  const [trialLoading, setTrialLoading] = useState(false);

  let key = 'defaultKey';

  const createSubscriptionWithTrial = async () => {
    setTrialLoading(true);
    try {
      const { data } = await api.post('/stripe/create-subscription-trial', {
        priceId,
        email: user?.email,
      });
      dispatch(setSubscription(data));
      dispatch(setPlan(plan));
      dispatch(setUser(data.user));
      // onNext();
    } catch (error) {
      console.log(error);
    } finally {
      setTrialLoading(false);
    }
    key = user?.email!;
  };

  const createSubscription = async () => {
    setLoading(true);
    try {
      const { data } = await api.post('/stripe/create-subscription', {
        priceId,
        email: user?.email,
      });
      dispatch(setSubscription(data));
      dispatch(setPlan(plan));
      onNext();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div key={key}>
      <div className='flex items-center justify-center bg-[#fff] border border-[#8645ff] rounded-md w-max sm:px-12 px-6 mt-16'>
        <div className=''>
          <div className='flex items-center justify-center'>
            <img src={src} alt='card-pic' className='object-scale-down my-8' />
          </div>

          <div className='border-b border-[#C0C0C0]'>
            <p className='mb-1 text-center'>
              <span className='font-semibold text-[18px] text-primary_font_color text-center'>
                ${price}
              </span>
              / {plan.recurring.interval === 'year' ? 'yearly' : 'monthly'}
            </p>

            <p className='text-[#828b9b] mb-2 text-center'>
              {plan.product.name}
            </p>
          </div>

          <div className='grid grid-cols-1 mt-6'>
            <div className='flex gap-2'>
              <MdCheck className='text-[20px] text-[#33da98] ' />
              <p className='text-primary_font_color mb-2'>
                Swift Proposal Submission
              </p>
            </div>
          </div>

          <div className='grid grid-cols-1'>
            <div className='flex gap-2'>
              <MdCheck className='text-[20px] text-[#33da98] ' />
              <p className='text-primary_font_color mb-2'>
                Effortless Team Collaboration
              </p>
            </div>
          </div>

          <div className='grid grid-cols-1'>
            <div className='flex gap-2'>
              <MdCheck className='text-[20px] text-[#33da98] ' />
              <p className='text-primary_font_color mb-2'>
                Seamless Event Management Hub
              </p>
            </div>
          </div>

          <div
            className='flex items-center jusitfy-center'
            onClick={() => createSubscriptionWithTrial()}
          >
            <div className='w-full  border-solid border-2 border-[#8645ff] bg-[#8645ff] hover:bg-[#752dfb] hover:text-white cursor-pointer mt-4 mb-5'>
              <div className='flex items-center justify-center'>
                {trialLoading && <Spinner className='h-4 w-4 mr-2 ' />}
                <p className='text-[#fff] text-[18px] text-center px-4 py-2 hover:text-white'>
                  Start Free Trial
                </p>
              </div>
            </div>
          </div>

          <div
            className='flex items-center jusitfy-center'
            onClick={() => createSubscription()}
          >
            <div className='w-full  border-solid border-2 border-[#8645ff]  hover:bg-[#752dfb] hover:text-white cursor-pointer mt-4 mb-10'>
              <div className='flex items-center justify-center'>
                {loading && <Spinner className='h-4 w-4 mr-2 ' />}
                <p className='text-[#8645ff] text-[18px] text-center px-4 py-2 hover:text-white'>
                  Subscribe Now
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPlanCard;

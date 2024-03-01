import { Spinner } from '@material-tailwind/react';
import { FC, useEffect, useState } from 'react';
import { useGetCurrentUser } from '../../../app/hooks/useUser';
import { StripeSubscription } from '../../../types';
import api from '../../../utils/api';

interface CurrentPlanProps {}

const CurrentPlan: FC<CurrentPlanProps> = () => {
  const [currentPlan, setCurrentPlan] = useState<StripeSubscription | null>(
    null
  );
  const [loading, setLoading] = useState(false);

  const user = useGetCurrentUser();

  useEffect(() => {
    const fetchPlan = async () => {
      setLoading(true);
      try {
        const { data } = await api.get(
          `/stripe/retrieve-subscription?subscriptionId=${user?.subscription.subscriptionId}`
        );
        return setCurrentPlan(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPlan();
  }, [user?.subscription.subscriptionId]);


  const handleCancelPlan = async () => {
    try {
      const { data } = await api.post('/stripe/portal', {
        customerId: user?.subscription.customerId,
      });
      window.location.href = data.url;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className='bg-[#fff] px-8 py-8 rounded-xl drop-shadow mb-6'>
      {loading ? (
        <div className='flex items-center justify-center h-full'>
          <Spinner />
        </div>
      ) : (
        <div className='grid grid-cols-2 gap-4'>
          <div className='border-r'>
            <div>
              <h2 className='text-[18px] font-semibold mb-3'>
                Current Plan ({/* @ts-ignore */}
                {currentPlan?.status === 'trialing' ? 'Free Trial' : 'Standard'}
                )
              </h2>

              <p className='text-14 text-[#353535]'>
                Full access to the AV Bids site and two company users are
                included.
              </p>
            </div>
          </div>

          <div>
            <div>
              <h2 className='text-purple_two text-[20px] mb-2'>
                {/* @ts-ignore */}
                ${currentPlan?.plan.amount_decimal / 100}
              </h2>
              <h2 className='text-[14px] text-[#000] mb-2'>
                {/* @ts-ignore */}
                {currentPlan?.plan.interval === 'month'
                  ? 'Monthly'
                  : 'Annual'}{' '}
                Plan
              </h2>
              {/* @ts-ignore */}
              {currentPlan?.canceled_at === null && (
                <p className='text-[#353535] mb-3'>
                  {/* @ts-ignore */}
                  {currentPlan?.status === 'trialing'
                    ? 'Your free 3 day trial ends on'
                    : 'Your subscription renews'}{' '}
                  {new Date(
                    // @ts-ignore
                    currentPlan?.current_period_end * 1000
                  ).toLocaleDateString()}
                </p>
              )}

              <p
                className='text-purple_two text-[14px] underline cursor-pointer'
                onClick={() => handleCancelPlan()}
              >
                Manage Payment Plan
              </p>
              {/* @ts-ignore */}
              {currentPlan?.cancel_at !== null && (
                <p>
                  Access will be restriced after{' '}
                  {new Date(
                    // @ts-ignore
                    currentPlan?.cancel_at * 1000
                  ).toLocaleDateString()}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CurrentPlan;

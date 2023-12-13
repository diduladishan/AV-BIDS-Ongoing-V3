import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../../app/hooks';
import { useGetCurrentUser } from '../../app/hooks/useUser';
import { RootState } from '../../app/store';
import api from '../../utils/api';
import BillingDetails from './components/billing-details';
import BillingNewUser from './components/billing-new-user';
import CardsOnFile from './components/cards-on-file';
import CurrentPlan from './components/current-plan';

function Index() {
  const user = useGetCurrentUser();

  const [stripePromise, setStripePromise] = useState(null);

  const clientSecret = useAppSelector(
    (state: RootState) => state.stripe.subscription?.clientSecret
  );

  useEffect(() => {
    api.get('stripe/config').then(async (r) => {
      // @ts-ignore
      setStripePromise(loadStripe(r.data.publishableKey));
    });
  }, []);
  return (
    <div className='container mx-auto'>
      <h2 className='text-[20px] font-semibold mb-4'>Billing & Membership</h2>

      {user?.subscription?.plan === 'PREMIUM' ? (
        <>
          <CurrentPlan />
          <Elements
            stripe={stripePromise}
            options={{ clientSecret: clientSecret }}
          >
            <BillingDetails />
          </Elements>
          {/* <CardsOnFile /> */}
        </>
      ) : (
        <BillingNewUser />
      )}
    </div>
  );
}

export default Index;

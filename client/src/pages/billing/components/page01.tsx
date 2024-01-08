import React, { useEffect, useState } from 'react';
import Monthly from '../../../assets/17_billing/month_img.png';
import Yearly from '../../../assets/17_billing/yearly_img.png';

import { setPrice } from '../../../app/features/stripe/stripeSlice';
import { useAppDispatch } from '../../../app/hooks';
import { StripePrice } from '../../../types';
import api from '../../../utils/api';
import PaymentPlanCard from './payment-plan-card';

interface Page01Props {
  onNext: () => void;
}

const Page01: React.FC<Page01Props> = ({ onNext }) => {
  const dispatch = useAppDispatch();
  const [prices, setPrices] = useState<StripePrice[]>([]);

  useEffect(() => {
    const fetchPrices = async () => {
      const { data } = await api.get('/stripe/config');
      setPrices(data.prices);
      dispatch(setPrice(data.prices));
    };
    fetchPrices();
  }, []);

  return (
    <div>
      <p className='text-[#195c87] font-medium text-[28px] mb-2 text-center mt-[100px]'>
        AV Bids - Powering Event Connections!
      </p>
      <p className='text-[#4d5768]  text-[16px] mb-2 text-center'>
        Yes, AV Bids offers paid services to help event planners plan and
        prepare their events for success.
      </p>

      <div className='grid lg:grid-cols-2 gap-1 justify-items-center '>
        {prices.map((price) => (
          <PaymentPlanCard
            key={price.id}
            src={price.recurring.interval === 'year' ? Yearly : Monthly}
            plan={price}
            price={price.unit_amount / 100}
            priceId={price.id}
            onNext={onNext}
          />
        ))}

        {/* <div className='text-primary_font_color px-8 pt-4'>
          <p className='font-medium mb-4 text-primary_font_color '>
            Each Package Includes
          </p>
          <div className='flex items-center gap-2'>
            <img
              src={Done_icon}
              alt='aad'
              className='object-scale-down w-[16px]'
            />
            <p className='mb-2'>Explore Opportunities</p>
          </div>

          <div className='flex items-center gap-2'>
            <img
              src={Done_icon}
              alt='aad'
              className='object-scale-down w-[16px]'
            />
            <p className='mb-2'>Build Your Team</p>
          </div>

          <div className='flex items-center gap-2'>
            <img
              src={Done_icon}
              alt='aad'
              className='object-scale-down w-[16px]'
            />
            <p className='mb-2'>Effortless Submissions</p>
          </div>

          <div className='flex items-center gap-2'>
            <img
              src={Done_icon}
              alt='aad'
              className='object-scale-down w-[16px]'
            />
            <p className='mb-2'>Direct Communication</p>
          </div>

          <div className='flex items-center gap-2'>
            <img
              src={Done_icon}
              alt='aad'
              className='object-scale-down w-[16px]'
            />
            <p className='mb-2'>Centralized Invoicing</p>
          </div>

          <div className='flex items-center gap-2'>
            <img
              src={Done_icon}
              alt='aad'
              className='object-scale-down w-[16px]'
            />
            <p>One-Stop Solution</p>
          </div>

          <div className='flex items-center mt-4 gap-4'>
            <img
              src={Discover}
              alt='aad'
              className='object-scale-down w-[40px]'
            />

            <img
              src={Master}
              alt='aad'
              className='object-scale-down w-[40px]'
            />

            <img src={Visa} alt='aad' className='object-scale-down w-[40px]' />
          </div>
        </div> */}
      </div>
      {/* <Button onClick={onNext} className="bg-primary normal-case mt-6">
        Next
      </Button> */}
    </div>
  );
};

export default Page01;

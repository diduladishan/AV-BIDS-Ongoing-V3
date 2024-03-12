import { Button, Dialog } from '@material-tailwind/react';
import { FC, useEffect, useState } from 'react';
import { MdDeleteOutline } from 'react-icons/md';

import axios from 'axios';
import { useGetCurrentUser } from '../../../app/hooks/useUser';
import PLUS_ICON from '../../../assets/11_dashboard/plus.png';
import DISCOVER from '../../../assets/17_billing/Discover.png';
import MASTER from '../../../assets/17_billing/Mastercard.png';
import VISA from '../../../assets/17_billing/Visa.png';
import api from '../../../utils/api';
import BILLING_ADD_CARD from './billing-add-card';

interface CardsOnFileProps {}

const CardsOnFile: FC<CardsOnFileProps> = () => {
  const [open, setOpen] = useState(false);
  const [cards, setCards] = useState([]);

  const user = useGetCurrentUser();
  const handleOpen = () => setOpen((cur) => !cur);

  const stripeSecretKey = process.env.REACT_APP_STRIPE_SECRET_KEY!;
  const customerID = user?.subscription.customerId!;
  useEffect(() => {
    const fetchCards = async () => {
      const apiUrl = `https://api.stripe.com/v1/customers/${customerID}/cards`;
      const limit = 3;

      try {
        const { data } = await axios.get(apiUrl, {
          headers: {
            Authorization: `Bearer ${stripeSecretKey}`,
          },
          params: {
            limit,
          },
        });
        console.log(data);

        return setCards(data.data);
      } catch (error: any) {
        console.error(error.response.data);
        // Handle errors here
      }
    };
    fetchCards();
  }, [customerID, stripeSecretKey]);

  const handleDeleteCard = async (id: string) => {
    try {
      await api.get(`/stripe/delete-card/${id}?customerId=${customerID}`);
      const updatedCards = cards.filter((card: any) => card.id !== id);
      setCards(updatedCards);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className='bg-[#fff] px-8 py-8 rounded-xl drop-shadow mb-6'>
      <div className='flex items-center justify-between mb-6'>
        <div className='w-72'>
          <h2 className='text-[18px] font-semibold text-left'>Card on File</h2>
        </div>

        <Button
          variant='outlined'
          size='sm'
          className='hidden lg:inline-block rounded-btn '
          onClick={handleOpen}
        >
          <div className='flex items-center gap-2 px-2'>
            <img
              src={PLUS_ICON}
              alt='aad'
              className='object-contain w-[20px]'
            />
            <span className='text-black normal-case text-center'>Add Card</span>
          </div>
        </Button>
      </div>

      <div>
        <>
          <Dialog
            size='xs'
            open={open}
            handler={handleOpen}
            className='bg-transparent shadow-none'
          >
            <BILLING_ADD_CARD setOpen={setOpen} setCards={setCards} />
          </Dialog>
        </>
      </div>

      <div className='justify-items-end'>
        {cards?.length > 0 &&
          cards?.map((card: any) => (
            <div key={card.id} className='flex gap-4 mb-4 justify-between'>
              <div className='justify-self-start'>
                <div className='flex items-center gap-6'>
                  <img
                    src={
                      card.brand === 'Visa'
                        ? VISA
                        : card.brand === 'MasterCard'
                        ? MASTER
                        : card.brand === 'Discover'
                        ? DISCOVER
                        : ''
                    }
                    alt='aad'
                    className='object-contain w-[49px]'
                  />
                  <p className='font-semibold'>
                    {card.brand} (**** {card.last4})
                  </p>
                </div>
              </div>
              <div>
                <p className='text-[15px]'>
                  Expiration Date {card.exp_month}/{card.exp_year}
                </p>
              </div>
              <div>
                <p className='text-[15px]'>
                  {card.funding === 'credit' ? 'Credit' : 'Debit'} Card
                </p>
              </div>
              {/* <div>
                <p className='text-[15px] text-[#888888]'>DEFAULT</p>
              </div> */}
              <div onClick={() => handleDeleteCard(card.id)}>
                <MdDeleteOutline size={24} className='text-[#DE5753]' />
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default CardsOnFile;

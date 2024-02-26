import { Button, Card, CardBody, Input } from '@material-tailwind/react';
import { FC, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useGetCurrentUser } from '../../../app/hooks/useUser';
import DISCOVER from '../../../assets/17_billing/discover.png';
import MASTER from '../../../assets/17_billing/mastercard.png';
import VISA from '../../../assets/17_billing/visa.png';
import api from '../../../utils/api';
import {
  CardFormSchema,
  CardFormValues,
} from '../../../utils/validations/card-form-validation';

interface BillingAddCardProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setCards: React.Dispatch<React.SetStateAction<never[]>>;
}

const Billingaddcard: FC<BillingAddCardProps> = ({ setOpen, setCards }) => {
  const [cardType, setCardType] = useState('');

  const user = useGetCurrentUser();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CardFormValues>({
    resolver: zodResolver(CardFormSchema),
    defaultValues: {
      name: '',
      number: '',
      // @ts-ignore
      expire: '',
      cvc: '',
      type: '',
    },
  });

  const onSubmit = async (values: CardFormValues) => {
    try {
      const { data } = await api.post(
        `/stripe/create-card/${user?.subscription.customerId}`,
        values
      );
      // @ts-ignore
      setCards((prevCards) => [...prevCards, data]);
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCardNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const cardNumber = event.target.value;
    const detectedType = detectCardType(cardNumber);
    setCardType(detectedType);
  };

  const detectCardType = (cardNumber: string) => {
    if (!cardNumber) return '';
    const prefix = cardNumber.substring(0, 2);
    switch (prefix) {
      case '4': {
        setValue('type', 'tok_visa');
        return 'Visa';
      }
      case '5': {
        setValue('type', 'tok_mastercard');
        return 'Mastercard';
      }
      case '6': {
        setValue('type', 'tok_discover');
        return 'Discover';
      }
      case '34':
      case '37': {
        setValue('type', 'tok_amex');
        return 'American Express';
      }
      default:
        return '';
    }
  };

  return (
    <div className=''>
      <Card className='mx-auto w-full max-w-[24rem]'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardBody>
            <p className='text-[#000000] text-[18px] font-bold mb-4'>
              Add Credit/Debit Cards
            </p>

            <div className='flex items-center gap-3 mb-4'>
              <img src={VISA} alt='aad' className='object-contain w-[40px]' />
              <img src={MASTER} alt='aad' className='object-contain w-[40px]' />
              <img
                src={DISCOVER}
                alt='aad'
                className='object-contain w-[40px]'
              />
            </div>

            <p className='mb-1 text-[#353535]'>Name on Card</p>
            <div className='w-full rounded-full bg-input_background mb-4'>
              <Input
                type='text'
                placeholder='Name on Card'
                className='!border !border-gray-300 !bg-input_background rounded-full text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10'
                labelProps={{
                  className: 'hidden',
                }}
                containerProps={{ className: 'min-w-[100px]' }}
                crossOrigin=''
                {...register('name')}
              />
            </div>

            <p className='mb-1 text-[#353535]'>Card Number</p>
            <div className='w-full rounded-full bg-input_background mb-4'>
              <Input
                placeholder='Card Number'
                className='!border !border-gray-300 !bg-input_background rounded-full text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10 relative'
                labelProps={{
                  className: 'hidden',
                }}
                containerProps={{ className: 'min-w-[100px]' }}
                crossOrigin=''
                {...register('number')}
                onChange={handleCardNumberChange}
              />
              <img
                src={
                  cardType === 'Visa'
                    ? VISA
                    : cardType === 'Mastercard'
                    ? MASTER
                    : cardType === 'Discover'
                    ? DISCOVER
                    : ''
                }
                alt={cardType}
                className='object-contain w-[40px] ml-4 absolute right-9 top-[236px]'
              />
            </div>

            <div className='flex items-center  justify-between'>
              <div>
                <p className='text-[#353535] mb-1'>MM/YY</p>
                <div className=' rounded-full bg-input_background !w-[9rem]'>
                  <Input
                    placeholder='MM/YY'
                    className='!border !border-gray-300 !w-[9rem] !bg-input_background rounded-full text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10'
                    labelProps={{
                      className: 'hidden',
                    }}
                    containerProps={{ className: 'min-w-[100px]' }}
                    crossOrigin=''
                    {...register('expire')}
                  />
                </div>
              </div>

              <div>
                <p className='text-[#353535] mb-1'>CVC</p>
                <div className=' rounded-full bg-input_background !w-[9rem]'>
                  <Input
                    placeholder='123'
                    className='!border !border-gray-300 !w-[9rem] !bg-input_background rounded-full text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10'
                    labelProps={{
                      className: 'hidden',
                    }}
                    containerProps={{ className: 'min-w-[100px]' }}
                    crossOrigin=''
                    {...register('cvc')}
                  />
                </div>
              </div>
            </div>
            <div className='mt-3'>
              {errors.name && (
                <p className='text-red-500'>{errors.name.message}</p>
              )}
              {errors.number && (
                <p className='text-red-500'>{errors.number.message}</p>
              )}
              {errors.expire && (
                <p className='text-red-500'>{errors.expire.message}</p>
              )}
              {errors.cvc && (
                <p className='text-red-500'>{errors.cvc.message}</p>
              )}
            </div>
          </CardBody>
          <div className='flex items-center justify-end p-4 mb-4'>
            <Button
              type='submit'
              className='w-36 rounded-full bg-primary normal-case'
            >
              Save Card
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default Billingaddcard;

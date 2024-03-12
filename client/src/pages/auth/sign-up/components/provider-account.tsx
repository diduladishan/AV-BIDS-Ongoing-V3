import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Checkbox, Input } from '@material-tailwind/react';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import api from '../../../../utils/api';
import {
  RegisterFormSchema,
  RegisterFormValues,
} from '../../../../utils/validations/register-form-validation';

import { Link } from 'react-router-dom';

interface ProviderAccountFormProps {
  userType: string;
  setErrorMessage: React.Dispatch<React.SetStateAction<string | null>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProviderAccountForm: FC<ProviderAccountFormProps> = ({
  userType,
  setErrorMessage,
  setOpen,
}) => {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: RegisterFormValues) => {
    try {
      await api.post('/auth/register', {
        ...values,
        userType,
      });
      navigate('/dashboard');
    } catch (error: any) {
      if (error.response) {
        const errorMessage = error.response.data.message;
        setErrorMessage(errorMessage);
        setOpen(true);

        // Set a timer to clear the error message after 5 seconds
        setTimeout(() => {
          setOpen(false);
          setErrorMessage(null);
        }, 5000);
      } else if (error.request) {
        console.log('No response received from the server.');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error while setting up the request:', error.message);
      }
    }
  };
  return (
    <form
      className='mt-6 flex flex-col gap-4'
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className='w-full !bg-input_background rounded-lg'>
        <Input
          type='text'
          placeholder='First Name'
          className='!border !border-gray-300 !bg-input_background text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900'
          labelProps={{
            className: 'hidden',
          }}
          containerProps={{ className: 'min-w-[100px]' }}
          crossOrigin='anonymous'
          {...register('firstName')}
        />
        {errors.firstName && (
          <span className='text-red-500'>First Name is required</span>
        )}
      </div>

      <div className='w-full !bg-input_background rounded-lg'>
        <Input
          type='text'
          placeholder='Last Name'
          className='!border !border-gray-300 !bg-input_background text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900'
          labelProps={{
            className: 'hidden',
          }}
          containerProps={{ className: 'min-w-[100px]' }}
          crossOrigin='anonymous'
          {...register('lastName')}
        />
        {errors.lastName && (
          <span className='text-red-500'>Last Name is required</span>
        )}
      </div>

      <div className='w-full !bg-input_background rounded-lg'>
        <Input
          type='email'
          placeholder='Email Address'
          className='!border !border-gray-300 !bg-input_background text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900'
          labelProps={{
            className: 'hidden',
          }}
          containerProps={{ className: 'min-w-[100px]' }}
          crossOrigin='anonymous'
          {...register('email')}
        />
        {errors.email && (
          <span className='text-red-500'>Email is required</span>
        )}
      </div>

      <div className='w-full !bg-input_background rounded-lg'>
        <Input
          type='password'
          placeholder='Password'
          className='!border !border-gray-300 !bg-input_background text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900'
          labelProps={{
            className: 'hidden',
          }}
          containerProps={{ className: 'min-w-[100px]' }}
          crossOrigin='anonymous'
          {...register('password')}
        />
        {errors.password && (
          <span className='text-red-500'>Password is required</span>
        )}
      </div>

      <div className='flex'>
        <div className='self-start p-0 m-0'>
          <Checkbox
            className='border-black items-start'
            crossOrigin=''
            onClick={() => setChecked((prev) => !prev)}
          />
        </div>

        <p color='blue-gray' className='text-[14px] text-black'>
          By hitting the "Create Account" button,<br></br> you agree to the
          <Link to='/terms-of-service'>
            <span className='text-purple_two underline mx-[5px]'>
              Terms of Service
            </span>
          </Link>
          &<br></br>
          <Link to='/privacy-policy'>
            <span className='text-purple_two underline'>Privacy Policy</span>
          </Link>
        </p>
      </div>

      <Button
        size='lg'
        className='rounded-full bg-primary normal-case text-[15px] mt-2'
        type='submit'
        disabled={checked === false}
      >
        Create Account
      </Button>
      <p className='mt-2 flex items-center justify-center gap-2 text-[14px] text-black'>
        Have an account?{' '}
        <span
          className='text-purple_two underline cursor-pointer'
          onClick={() => navigate('/sign-in')}
        >
          Sign In
        </span>
      </p>
    </form>
  );
};

export default ProviderAccountForm;

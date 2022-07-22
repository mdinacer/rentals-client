import { useEffect, useState } from 'react';
import { signInUser } from '../../slices/accountSlice';
import { FieldValues, useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';

import { loginValidationSchema } from './accountValidations';

import { useAppDispatch } from '../../store/configureStore';
import TextInput from '../../Components/Forms/TextInput';
import PasswordInput from '../../Components/Forms/PasswordInput';

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const { state }: any | null = useLocation();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const {
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = useForm({
    mode: 'all',
    resolver: yupResolver(loginValidationSchema),
  });

  async function submitForm(data: FieldValues) {
    try {
      await dispatch(signInUser(data));
      const from = state?.from?.pathname || '/';
      navigate(from);
    } catch (error: any) {
      setError('Email or password incorrect');
      console.log(error);
    }
  }

  useEffect(() => {
    const email = state?.email;
    if (email) {
      setValue('email', email);
    }
  }, [setValue, state?.email]);

  return (
    <div className='py-20 h-screen w-screen flex items-center justify-center  dark:bg-slate-800 '>
      <div className='h-auto lg:p-20 p-5 w-full  drop-shadow-md rounded-md flex items-center justify-center'>
        <div className='w-full lg:max-w-md '>
          <p className=' font-Primary text-7xl text-center pb-10 uppercase'>
            Sing In
          </p>

          <form
            onSubmit={handleSubmit(submitForm)}
            className='flex flex-col gap-y-2  w-full'
          >
            <TextInput
              autoComplete='email'
              type='email'
              control={control}
              label='Email'
              name='email'
              placeholder='Email'
            />

            <PasswordInput
              autoComplete='password'
              control={control}
              label='Password'
              name='password'
              placeholder='Password'
            />
            <p className=' text-red-500 text-sm text-center w-full'>{error}</p>
            <input
              disabled={!isValid}
              className={`${
                isValid
                  ? 'opacity-100  bg-yellow-500 dark:bg-indigo-500 cursor-pointer '
                  : 'opacity-70 bg-gray-400 '
              }   w-full py-2 my-10 px-5 uppercase font-Primary text-xl font-thin`}
              type='submit'
              value={isSubmitting ? 'Please wait' : 'Login'}
            />
          </form>

          <Link
            to={registerPath}
            className='underline underline-offset-4 text-center '
          >
            <p className=' font-Secondary text-lg '>Create a new account.</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

const registerPath = '/account/register';

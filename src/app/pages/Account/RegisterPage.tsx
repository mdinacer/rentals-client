import { FieldValues, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';

import TextInput from '../../Components/Forms/TextInput';
import PasswordInput from '../../Components/Forms/PasswordInput';
import { registerValidationSchema } from './accountValidations';
import agent from '../../api/agent';
import { useAppDispatch } from '../../store/configureStore';
import { signInUser } from '../../slices/accountSlice';

export default function RegisterPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = useForm({ mode: 'all', resolver: yupResolver(registerValidationSchema) });

  async function submitForm(data: FieldValues) {
    const { password2, ...user } = data;
    try {
      const result = await agent.Account.register(user);
      if (result) {
        await dispatch(signInUser(data));
        navigate('/profile');
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='py-20 h-screen w-screen flex items-center justify-center   '>
      <div className='h-auto lg:p-20 p-5 w-full  drop-shadow-md rounded-xl flex items-center justify-center'>
        <div className='w-full lg:max-w-md '>
          <p className=' font-Primary text-7xl text-center pb-10 uppercase'>
            Sing Up
          </p>

          <form
            autoComplete='off'
            onSubmit={handleSubmit(submitForm)}
            className='grid grid-flow-row gap-4  w-full'
          >
            <TextInput
              autoComplete='off'
              type='text'
              control={control}
              label='Name'
              name='username'
              placeholder='Username'
            />
            <TextInput
              autoComplete='off'
              type='email'
              control={control}
              label='Email'
              name='email'
              placeholder='Email'
            />

            <PasswordInput
              autoComplete='new-password'
              control={control}
              label='Password'
              name='password'
              placeholder='Password'
            />
            <PasswordInput
              autoComplete='repeat-password'
              control={control}
              label='Password'
              name='password2'
              placeholder='Confirm Password'
            />

            <input
              disabled={!isValid}
              className={`${
                isValid ? 'opacity-100  ' : 'opacity-70 '
              } cursor-pointer bg-gray-900 text-white w-full py-2 my-10 px-5 uppercase font-Primary text-xl font-thin`}
              type='submit'
              value={isSubmitting ? 'Please wait' : 'Register'}
            />
          </form>
          <Link
            to={loginPath}
            className='underline underline-offset-4 text-center'
          >
            <p className=' font-Secondary text-lg '>
              Already have an account!, Sign In
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}

const loginPath = '/account/login';

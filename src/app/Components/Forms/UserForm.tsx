import { useEffect } from 'react';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import agent from '../../api/agent';
import { UserProfile } from '../../models/profile';
import { User } from '../../models/user';
import { buildFormData } from '../../util/formData';
import MediaDropZone from './MediaDropZone';
import PropertyAddressForm from './PropertyAddressForm';
import AppTextInput from './TextInput';

interface Props {
  user: User;
  onClose: (profile?: UserProfile | null) => void;
}

export default function UserForm({ user, onClose }: Props) {
  const methods = useForm({
    mode: 'all',
    // resolver: yupResolver(loginValidationSchema),
  });
  const {
    control,
    reset,
    watch,
    handleSubmit,
    formState: { isValid, isSubmitting },
  } = methods;

  const watchFile = watch('image', null);

  useEffect(() => {
    if (user && user.profile) {
      const profile = user.profile;
      const item = {
        address: profile.address,
        firstName: profile.firstName,
        lastName: profile.lastName,
        mobile: profile.mobile,
        phone: profile.phone || '',
      };
      reset(item);
    }
  }, [reset, user]);

  async function handleSubmitData(data: FieldValues) {
    let result = null;
    try {
      let formData = new FormData();
      const { image, ...profile } = data;
      buildFormData(formData, profile);
      if (image) {
        formData.append('image', image);
      }
      if (user && user.profile) {
        result = await agent.Account.updateProfile(formData);
      } else {
        result = await agent.Account.createProfile(formData);
      }
    } catch (error) {
      console.log(error);
    } finally {
      onClose(result);
    }
  }

  return (
    <div className=' bg-white dark:bg-gray-700 lg:rounded-lg px-5 lg:px-10 py-5 lg:max-w-4xl w-full mx-auto'>
      <p className=' font-Primary text-4xl font-thin w-full border-b border-b-black mb-5'>
        Edit Profile
      </p>
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(handleSubmitData)}
          className=' grid grid-flow-row gap-y-5 '
        >
          <div className='flex flex-col lg:flex-row gap-x-4'>
            <div className='flex flex-col flex-initial border h-auto border-gray-400 lg:my-auto  lg:px-5 my-3'>
              <p className=' font-Primary text-xl font-thin px-5 py-2'>
                Profile image
              </p>
              <div className=' flex flex-col items-center'>
                {(watchFile || user?.profile) && (
                  <div className=''>
                    {watchFile ? (
                      <div className='h-[200px] w-[200px]  overflow-hidden'>
                        <img
                          className='  h-full object-cover object-center w-full rounded-md'
                          src={watchFile.preview}
                          alt='preview'
                        />
                      </div>
                    ) : (
                      <img
                        className=' object-cover object-center max-h-[200px] max-w-[200px] mx-auto w-full rounded-md'
                        src={user.profile.image}
                        alt={user.username}
                      />
                    )}
                  </div>
                )}
                <MediaDropZone control={control} name='image' />
              </div>
            </div>
            <div className=' flex-auto'>
              <div className='grid lg:grid-cols-2 gap-x-4 gap-y-3'>
                <AppTextInput
                  control={control}
                  label={'First Name'}
                  placeholder={'First Name'}
                  name={'firstName'}
                />
                <AppTextInput
                  control={control}
                  label={'Last Name'}
                  placeholder={'Last Name'}
                  name={'lastName'}
                />
                <AppTextInput
                  control={control}
                  label={'Phone'}
                  placeholder={'Phone number'}
                  name={'phone'}
                />
                <AppTextInput
                  control={control}
                  label={'Mobile'}
                  placeholder={'Mobile phone number'}
                  name={'mobile'}
                />
              </div>

              <PropertyAddressForm />
            </div>
          </div>

          <div className=' w-full grid grid-cols-2 gap-x-4'>
            <input
              onClick={() => onClose()}
              disabled={isSubmitting}
              type='button'
              value='Cancel'
              className={buttonStyle}
            />
            <input
              disabled={!isValid || isSubmitting}
              type='submit'
              value={isSubmitting ? 'Saving' : 'Save'}
              className={buttonStyle + 'bg-slate-800 text-white border-none'}
            />
          </div>
        </form>
      </FormProvider>
      <div></div>
    </div>
  );
}

const buttonStyle =
  ' border border-gray-400 py-1 px-4 font-Primary text-lg uppercase font-thin ';

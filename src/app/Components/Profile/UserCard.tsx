import {
  DeviceMobileIcon,
  LocationMarkerIcon,
  MailIcon,
  PencilAltIcon,
  PhoneIcon,
} from '@heroicons/react/solid';
import { UserProfile } from '../../models/profile';

interface Props {
  profile: UserProfile;
  onEdit: () => void;
}

export default function UserCard({ profile, onEdit }: Props) {
  return (
    <div className='relative flex items-center max-w-lg w-full  py-5 px-5 lg:px-5  mx-auto bg-gray-300 dark:bg-gray-800'>
      <div className='  h-32 w-32 rounded-full overflow-hidden  my-auto flex-initial'>
        <img
          src={profile.image}
          alt=''
          className='object-center  h-32 w-32 object-cover  rounded-full  '
        />
      </div>

      <div className='flex flex-col font-Secondary  text-base gap-y-3 px-5  flex-auto'>
        <p className=' font-Primary text-3xl font-thin w-full capitalize  mb-2 '>
          {profile.fullName}
        </p>
        {profile.address && (
          <div className=' flex flex-row gap-x-3 items-start '>
            <LocationMarkerIcon className='h-5 w-5 dark:text-gray-400' />
            <div>
              <p className=' '>
                {profile.address.wilaya} - {profile.address.daira} -{' '}
                {profile.address.commune}{' '}
              </p>
              <p className=' '>{profile.address.address1}</p>
              <p className=' '>{profile.address.address2}</p>
            </div>
          </div>
        )}

        <div className=' inline-flex items-center gap-x-3'>
          <MailIcon className='h-5 w-5 dark:text-gray-400' />
          <p className=''>{profile.email}</p>
        </div>

        {profile.phone && (
          <div className='inline-flex gap-x-3 items-center'>
            <PhoneIcon className='h-5 w-5 dark:text-gray-400' />

            <span>{profile.phone}</span>
          </div>
        )}
        {profile.mobile && (
          <div className='inline-flex gap-x-3 items-center'>
            <DeviceMobileIcon className='h-5 w-5 dark:text-gray-400' />
            <span>{profile.mobile}</span>
          </div>
        )}
      </div>
    </div>
  );
}

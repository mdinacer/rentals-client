import { PhoneIcon, MailIcon } from '@heroicons/react/solid';
import { UserProfile } from '../../models/profile';

interface Props {
  profile: UserProfile;
  title: string;
}

export default function PersonDetails({ profile, title }: Props) {
  return (
    <div>
      <p className='font-Primary text-2xl uppercase font-thin mb-2 border-b dark:border-b-white pb-1'>
        {title}
      </p>
      <div className=' flex flex-row gap-x-5'>
        <div className='h-full w-[120px] rounded-md overflow-hidden'>
          <img
            src={profile.image}
            alt={profile.fullName}
            className=' object-cover object-center h-full w-full'
          />
        </div>
        <div className='flex-auto flex flex-col gap-y-5 justify-center'>
          <div className=' flex-auto'>
            <p className=' font-Secondary text-xl font-medium'>
              {profile.fullName}
            </p>
            <p className=' font-Secondary text-base'>
              {profile.address?.wilaya}
              {', '}
              {profile.address?.daira}
              {', '}
              {profile.address?.commune}
            </p>
          </div>
          <div className=' flex flex-row gap-x-5 flex-initial'>
            {profile.mobile && (
              <a
                title='Call owner'
                href={`tel:${profile.mobile}`}
                className='inline-flex items-center gap-x-2 px-3 border border-gray-400 dark:border-slate-500 py-1 hover:bg-black hover:text-white transition-all duration-200'
              >
                <PhoneIcon className='h-6 w-6' />
                <span className=' font-Primary text-xl font-thin'>Call</span>
              </a>
            )}
            {profile.email && (
              <a
                title='Mail owner'
                href={`mailto:${profile.email}`}
                className='inline-flex items-center gap-x-2 px-3 border border-gray-400 dark:border-slate-500 py-1   hover:bg-black hover:text-white transition-all duration-200'
              >
                <MailIcon className='h-6 w-6' />
                <span className=' font-Primary text-xl font-thin'>Mail</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

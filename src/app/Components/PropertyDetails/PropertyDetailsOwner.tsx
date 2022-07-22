import { DeviceMobileIcon, MailIcon, PhoneIcon } from '@heroicons/react/solid';
import { Property } from '../../models/property';

export default function PropertyDetailsOwner({
  property,
}: {
  property: Property;
}) {
  return (
    <div className='flex flow-row items-center px-5 lg:px-10 py-5 lg:py-2 bg-gray-900 text-white dark:bg-slate-900 '>
      <div className='h-24 w-24 lg:h-16 lg:w-16 lg:rounded-full rounded-lg overflow-hidden '>
        <img
          src={property.owner.image}
          alt='property owner'
          className=' object-cover object-center h-24 w-24 lg:h-16 lg:w-16'
        />
      </div>

      <div className='pl-5 py-2 flex flex-col lg:flex-row justify-between lg:items-center w-full'>
        <p className=' font-Primary font-thin text-2xl mb-3 lg:mb-0'>
          {property.owner.fullName}
        </p>
        <div className=' flex flex-col lg:flex-row lg:items-center gap-x-5'>
          <a
            href={`tel:${property.owner.phone}`}
            className=' inline-flex items-center font-Primary font-thin text-lg   hover:text-yellow-500 dark:hover:text-indigo-500'
          >
            <PhoneIcon className='h-6 w-6 mr-2' />
            {property.owner.phone}
          </a>
          <a
            href={`tel:${property.owner.mobile}`}
            className=' inline-flex items-center font-Primary font-thin text-lg   hover:text-yellow-500 dark:hover:text-indigo-500'
          >
            <DeviceMobileIcon className='h-6 w-6 mr-2' />
            {property.owner.mobile}
          </a>
          <a
            href={`mailto:${property.owner.email}`}
            className='uppercase inline-flex items-center font-Primary font-thin text-lg   hover:text-yellow-500 dark:hover:text-indigo-500'
          >
            <MailIcon className='h-6 w-6 mr-2' />
            {property.owner.email}
          </a>
        </div>
      </div>
    </div>
  );
}

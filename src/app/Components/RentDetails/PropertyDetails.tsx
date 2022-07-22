import { Property } from '../../models/property';

interface Props {
  property: Property;
}

export default function PropertyDetails({ property }: Props) {
  return (
    <div>
      <p className='font-Primary text-2xl uppercase font-thin mb-2 border-b dark:border-b-white pb-1'>
        Property
      </p>
      <div className=' flex flex-row gap-x-5'>
        <div className='h-full w-[120px] rounded-md overflow-hidden '>
          <img
            src={property.cover.pictureUrl}
            alt={property.slug}
            className=' w-full h-[120px] object-cover object-center'
          />
        </div>
        <div className='flex-auto flex flex-col justify-center'>
          <p className=' font-Primary text-3xl font-thin'>{property.title}</p>
          <p className=' font-Secondary text-base'>
            {property.address?.wilaya}, {property.address?.daira}
            {', '}
            {property.address?.commune}
          </p>
        </div>
      </div>
    </div>
  );
}

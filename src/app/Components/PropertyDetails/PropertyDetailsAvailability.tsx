import { format } from 'date-fns';
import { Property } from '../../models/property';

interface Props {
  property: Property;
}

export default function PropertyDetailsAvailability({ property }: Props) {
  return (
    <div className=' overflow-hidden flex flex-row bg-black'>
      <div className=' bg-yellow-500 dark:bg-indigo-700 py-0 px-5'>
        <p className='font-Primary font-thin text-lg uppercase text-black dark:text-white'>
          {property.available ? 'Disponible' : 'Occupée'}
        </p>
      </div>

      {property.availableFrom && (
        <div className=' inline-flex items-center justify-center bg-black text-white w-full py-0'>
          <p className=' font-Secondary text-base'>
            <span className=' font-Primary text-xl font-thin'>
              {format(new Date(property.availableFrom), 'PP')}
            </span>
          </p>
        </div>
      )}
    </div>
  );
}

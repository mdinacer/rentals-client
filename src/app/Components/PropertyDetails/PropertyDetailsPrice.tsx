import { DurationType } from '../../models/durationType';
import { PropertyPrice } from '../../models/propertyPrice';

interface Props {
  price: PropertyPrice;
  isEdit: boolean;
  busy?: boolean;
  isOwner: boolean;
  onRequest: () => void;
}

export default function PropertyDetailsPrice({
  price,
  isOwner,
  isEdit = false,
  busy = false,
  onRequest,
}: Props) {
  return (
    <div className='bg-black text-white px-5 lg:px-10 w-full flex flex-col gap-y-3 lg:gap-y-0 lg:flex-row justify-between items-center py-1 lg:py-5'>
      <p>
        <span className=' font-Primary lg:text-4xl text-2xl font-thin'>
          {price.amount.toFixed(2)}
        </span>
        <span className=' font-Primary text-base font-thin'> DA</span>
        <span className=' font-Primary text-2xl font-thin'> / </span>
        <span className=' font-Secondary text-base font-medium uppercase'>
          {DurationType[price.duration as any]}
        </span>
      </p>

      {!isOwner && (
        <button
          disabled={busy}
          onClick={onRequest}
          className={
            'px-5 mb-3 font-Secondary uppercase font-medium text-base rounded-md border transition-all  duration-200 hover:shadow-lg hover:scale-105 hover:text-black dark:hover:text-white  border-yellow-400 dark:border-indigo-400 text-yellow-500 dark:text-indigo-500 hover:bg-yellow-400 dark:hover:bg-indigo-400 hover:shadow-yellow-600 dark:hover:shadow-indigo-600 '
          }
        >
          {isEdit ? 'Voir la requête' : 'Envoyer une requête'}
        </button>
      )}
    </div>
  );
}

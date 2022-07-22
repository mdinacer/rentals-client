import { XIcon } from '@heroicons/react/solid';
import { motion } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import agent from '../../api/agent';
import { Rent } from '../../models/rent';
import { useAppSelector } from '../../store/configureStore';
import { useOutsideClick } from '../../util/outsideClick';
import LoadingComponent from '../Common/LoadingComponent';
import PeriodDetails from './PeriodDetails';
import PersonDetails from './PersonDetails';
import PropertyDetails from './PropertyDetails';
import RentActionsButtons from './RentActionsButtons';

interface Props {
  rentId: string;
  onClose: () => void;
}

export default function RentDetails({ rentId, onClose }: Props) {
  const [rent, setRent] = useState<Rent | undefined>(undefined);
  const node = useRef(null);
  const { user } = useAppSelector((state) => state.account);
  const [loading, setLoading] = useState(false);
  const [rentType, setRentType] = useState('');

  const fetchOperation = useCallback(async (id: string) => {
    try {
      setLoading(true);
      const result = await agent.Rents.details(id);
      setRent(result);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (rentId) {
      fetchOperation(rentId);
    }

    return () => {
      setRent(undefined);
    };
  }, [fetchOperation, rentId]);

  useEffect(() => {
    if (user && rent) {
      const item = rent.sender.id === user.profile.id ? 'sent' : 'received';
      setRentType(item);
    }
    return () => {
      setRentType('');
    };
  }, [rent, user]);

  useOutsideClick(node, onClose);

  if (loading) return <LoadingComponent />;
  if (!rent) return <div>No Data</div>;

  return (
    <motion.div
      ref={node}
      layoutId={rent.id}
      className='relative bg-white dark:bg-gray-800 lg:rounded-lg overflow-hidden pt-10 lg:pt-0  mx-auto  w-full lg:w-auto flex flex-col '
    >
      <button
        title='Close'
        className='absolute top-0 right-0 m-3'
        onClick={onClose}
      >
        <XIcon className='h-6 w-6' />
      </button>
      <div>
        <div className='shadow-md lg:shadow-none'>
          <div className=' px-5 lg:pt-10 pt-5 grid gap-y-10 lg:min-w-[32rem] w-full'>
            <PropertyDetails property={rent.property} />
            <PersonDetails
              profile={rentType === 'sent' ? rent.receiver : rent.sender}
              title={rentType === 'sent' ? 'Owner' : 'Client'}
            />
            <PeriodDetails startDate={rent.startDate} endDate={rent.endDate} />
          </div>
        </div>

        <div className='w-full  flex flex-row gap-x-2 items-center justify-between px-10 py-5 bg-gray-500 dark:bg-gray-900 '>
          <RentActionsButtons rent={rent} />
          <button
            onClick={onClose}
            className={`${buttonStyle} bg-gray-600 hover:bg-gray-100 hover:shadow-gray-300`}
          >
            Close
          </button>
        </div>
      </div>
    </motion.div>
  );
}

const buttonStyle =
  ' px-5 py-1 font-Primary uppercase font-thin text-base text-white   bg-gray-900 rounded-md hover:text-black hover:-translate-y-1 transition-all duration-200 hover:shadow-lg hover:scale-105  ';

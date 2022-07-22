import { MenuAlt4Icon } from '@heroicons/react/solid';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import useRents from '../../hooks/useRents';
import { Rent } from '../../models/rent';
import { setRentParams } from '../../slices/rentsSlice';
import { useAppDispatch, useAppSelector } from '../../store/configureStore';
import RentDetails from '../RentDetails/RentDetails';
import OperationsFilters from './OperationsFilters';
import OperationsList from './OperationsList';

interface Props {
  type?: 'sent' | 'received';
}

export default function UserOperations({ type }: Props) {
  const [visible, setVisible] = useState(false);
  const { rents } = useRents();
  const [selectedItem, setSelectedItem] = useState<Rent | undefined>(undefined);
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.account);

  const handleSelect = (item: Rent) => {
    setSelectedItem(item);
  };

  useEffect(() => {
    let param = {};
    if (type) {
      switch (type) {
        case 'received':
          param = { receiver: user?.profile.id };
          break;
        case 'sent':
          param = { sender: user?.profile.id };
          break;
      }
    } else {
      param = { receiver: user?.profile.id };
    }
    dispatch(setRentParams(param));
  }, [dispatch, type, user?.profile.id]);

  return (
    <>
      <div className='w-full h-full'>
        <div className='container mx-auto px-5 flex flex-col'>
          <div className=' w-full inline-flex justify-between items-center'>
            <p className=' font-Primary text-4xl font-thin my-10'>Opérations</p>
            <button
              onClick={() => setVisible((prev) => !prev)}
              title='menuButton'
              type='button'
              className={
                'inline-flex items-center gap-x-1 font-Primary text-lg uppercase font-thin  py-1 px-3 rounded-md'
              }
            >
              <MenuAlt4Icon className='h-8 w-8' />
              <span className=''>Filtres</span>
            </button>
          </div>

          {visible && (
            <div className='mb-10'>
              <OperationsFilters />
            </div>
          )}

          <div>
            <OperationsList rents={rents} onSelect={handleSelect} />
          </div>
        </div>
      </div>
      <AnimatePresence exitBeforeEnter>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed  top-0 left-0 h-screen w-screen overscroll-none bg-black bg-opacity-75 flex items-start lg:items-center  overflow-auto z-30 '
          >
            <RentDetails
              rentId={selectedItem.id}
              onClose={() => setSelectedItem(undefined)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

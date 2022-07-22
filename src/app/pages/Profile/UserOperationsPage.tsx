import { MenuAlt4Icon } from '@heroicons/react/solid';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import OperationsFilters from '../../Components/Profile/OperationsFilters';
import OperationsList from '../../Components/Profile/OperationsList';
import RentDetails from '../../Components/RentDetails/RentDetails';
import useRents from '../../hooks/useRents';
import Layout from '../../layout/Layout';
import { Rent } from '../../models/rent';

export default function UserOperationsPage() {
  const [visible, setVisible] = useState(false);
  const { rents } = useRents();
  const [selectedItem, setSelectedItem] = useState<Rent | undefined>(undefined);

  const handleSelect = (item: Rent) => {
    setSelectedItem(item);
  };

  return (
    <>
      <Layout className='dark:bg-gray-900'>
        <div className='container mx-auto px-5 flex flex-col'>
          <div className=' w-full inline-flex justify-between items-center'>
            <p className=' font-Primary text-4xl font-thin my-10'>Operations</p>
            <button
              onClick={() => setVisible((prev) => !prev)}
              title='menuButton'
              type='button'
              className={
                'inline-flex items-center gap-x-1 font-Primary text-lg uppercase font-thin  py-1 px-3 rounded-md'
              }
            >
              <MenuAlt4Icon className='h-8 w-8' />
              <span className=''>Filters</span>
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
      </Layout>
      <AnimatePresence exitBeforeEnter>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed  top-0 left-0 h-screen w-screen overscroll-none bg-black bg-opacity-75 flex items-start lg:items-center  overflow-auto z-30 py-[100px]'
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

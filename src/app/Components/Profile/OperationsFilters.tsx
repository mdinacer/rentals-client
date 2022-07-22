import { useEffect } from 'react';
import { setRentParams } from '../../slices/rentsSlice';
import { useAppDispatch, useAppSelector } from '../../store/configureStore';
import AppDropDown from '../Common/AppDropDown';

export default function OperationsFilters() {
  const { user } = useAppSelector((state) => state.account);
  const dispatch = useAppDispatch();

  async function handleResetData() {
    const item = {
      orderBy: 'creationDate',
      status: '',
      receiver: user?.profile.id,
      sender: null,
    };

    dispatch(setRentParams(item));
  }

  useEffect(() => {
    dispatch(
      setRentParams({
        orderBy: 'creationDate',
        status: '',
        // receiver: user?.profile.id,
      })
    );
  }, [dispatch, user?.profile.id]);

  const handleTypeChange = (value: string) => {
    const receiver = value === 'received' ? user?.profile.id : '';
    const sender = value === 'sent' ? user?.profile.id : '';
    dispatch(setRentParams({ receiver, sender }));
  };

  const handleSortChange = (orderBy: string) => {
    dispatch(setRentParams({ orderBy }));
  };

  const handleStatusChange = (status: string) => {
    dispatch(setRentParams({ status }));
  };

  return (
    <div className='flex flex-col lg:flex-row lg:items-end lg:justify-between gap-y-5 gap-x-0 lg:gap-y-0 lg:gap-x-10'>
      <div className='flex flex-col lg:flex-row gap-5 w-full flex-auto '>
        <AppDropDown
          className='  w-full lg:max-w-[14rem]'
          label='Type'
          items={typeItems}
          onChange={handleTypeChange}
        />
        <AppDropDown
          className='  w-full lg:max-w-[14rem]'
          label='Ordre'
          items={sortItems}
          onChange={handleSortChange}
        />

        <AppDropDown
          className='  w-full lg:max-w-[14rem]'
          label='Status'
          items={statusItems}
          onChange={handleStatusChange}
        />
      </div>

      <div className=' inline-flex lg:items-center justify-evenly gap-x-5 flex-initial'>
        <button
          type='button'
          onClick={handleResetData}
          className='w-full lg:w-auto cursor-pointer  border font-Primary text-xl font-thin px-5 py-1'
        >
          Reset
        </button>
      </div>
    </div>
  );
}

const typeItems = [
  { title: 'Reçus', value: 'received' },
  { title: 'Envoyés', value: 'sent' },
];

const sortItems = [
  { title: 'Date', value: 'creationDate' },
  { title: 'Status', value: 'status' },
  { title: 'Date début', value: 'startDate' },
  { title: 'Date fin', value: 'endDate' },
];

const statusItems = [
  { title: 'All', value: '' },
  { title: 'En attente', value: 'request' },
  { title: 'Acceptée', value: 'operation' },
  { title: 'Annulée', value: 'cancelled' },
  { title: 'Rejetées', value: 'rejected' },
];

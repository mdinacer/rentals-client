import { HomeIcon, PencilAltIcon } from '@heroicons/react/outline';
import {
  ChevronLeftIcon,
  HeartIcon,
  SortAscendingIcon,
  SortDescendingIcon,
  TrashIcon,
} from '@heroicons/react/solid';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import UserForm from '../../Components/Forms/UserForm';
import UserCard from '../../Components/Profile/UserCard';
import UserOperations from '../../Components/Profile/UserOperations';
import Layout from '../../layout/Layout';
import { UserProfile } from '../../models/profile';
import { setUser } from '../../slices/accountSlice';
import { useAppDispatch, useAppSelector } from '../../store/configureStore';
import UserProperties from './UserProperties';

export default function ProfilePage() {
  const [selectedPage, setSelectedPage] = useState(0);
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.account);
  const [isEdit, setIsEdit] = useState(false);

  function handleOnFormClose(profile?: UserProfile | null) {
    if (profile) {
      dispatch(setUser({ ...user, profile }));
    }
    setIsEdit(false);
  }

  useEffect(() => {
    if (!user?.profile) {
      setIsEdit(true);
    }
  }, [user]);

  const handlePage = (index: number) => {
    switch (index) {
      case 1:
        return <UserOperations type='received' />;
      case 2:
        return <UserOperations type='sent' />;

      case 3:
        return <UserProperties />;

      default:
        return (
          <div className='w-full flex items-center justify-center py-5'>
            <div className='grid grid-cols-2 lg:grid-cols-3 gap-5 max-w-lg w-full'>
              {elements.map((element, index) => (
                <button
                  type='button'
                  onClick={() => element.onClick()}
                  key={index}
                  className='h-36 w-full bg-gray-300 dark:bg-gray-700 hover:drop-shadow-lg hover:bg-black hover:text-yellow-500 last:hover:text-red-600 dark:hover:text-indigo-500 transition-all duration-300 flex flex-col items-center justify-center'
                >
                  {element.icon}
                  <p className=' font-Primary text-base font-thin uppercase'>
                    {element.title}
                  </p>
                </button>
              ))}
            </div>
          </div>
        );
    }
  };

  const elements = [
    {
      title: 'Modifier le profil',
      icon: <PencilAltIcon className='h-20 w-20' />,
      path: '',
      onClick: () => {
        setIsEdit(true);
      },
    },
    {
      title: 'Requêtes reçus',
      icon: <SortDescendingIcon className='h-20 w-20' />,
      path: '',
      onClick: () => {
        setSelectedPage(1);
      },
    },
    {
      title: 'Requêtes émis',
      icon: <SortAscendingIcon className='h-20 w-20' />,
      path: '',
      onClick: () => {
        setSelectedPage(2);
      },
    },
    {
      title: 'Propriétés',
      icon: <HomeIcon className='h-20 w-20' />,
      path: '',
      onClick: () => {
        setSelectedPage(3);
      },
    },
    {
      title: 'Favoris',
      icon: <HeartIcon className='h-20 w-20' />,
      path: '',
      onClick: () => {
        setSelectedPage(4);
      },
    },
    {
      title: 'Suppression',
      icon: <TrashIcon className='h-20 w-20' />,
      path: '',
      onClick: () => {
        setIsEdit(true);
      },
    },
  ];

  if (!user) return <div>No Data</div>;

  return (
    <>
      {user && user.profile && (
        <Layout className='h-full flex-1 dark:bg-gray-900 w-full flex '>
          <div className='container mx-auto lg:px-5  flex flex-col py-10'>
            {selectedPage === 0 && (
              <UserCard
                profile={user!.profile}
                onEdit={() => setIsEdit(true)}
              />
            )}
            <AnimatePresence exitBeforeEnter>
              <motion.div
                key={selectedPage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {selectedPage > 0 && (
                  <button
                    className='inline-flex items-center bg-yellow-500 px-5 py-2 mx-auto my-4'
                    onClick={() => setSelectedPage(0)}
                  >
                    <ChevronLeftIcon className='h-6 w-6 mr-1' />
                    <span className=' font-Primary uppercase font-thin text-lg'>
                      Retour
                    </span>
                  </button>
                )}
                {handlePage(selectedPage)}
              </motion.div>
            </AnimatePresence>
          </div>
        </Layout>
      )}
      {(isEdit || !user.profile) && (
        <div className='fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-90 flex items-start lg:items-center overflow-y-auto py-20 lg:py-0'>
          <div className='container mx-auto lg:px-5'>
            <UserForm onClose={handleOnFormClose} user={user} />
          </div>
        </div>
      )}
    </>
  );
}

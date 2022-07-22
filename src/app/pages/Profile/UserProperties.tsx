import { ViewGridAddIcon } from '@heroicons/react/solid';
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import agent from '../../api/agent';
import UserPropertiesList from '../../Components/Profile/UserProperties';
import { Property } from '../../models/property';
import { useAppSelector } from '../../store/configureStore';

export default function UserProperties() {
  const { user } = useAppSelector((state) => state.account);
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  const loadProperties = useCallback(async (id: string) => {
    setLoading(true);
    try {
      const result = await agent.Properties.listByUser();
      setProperties(result);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user) {
      loadProperties(user.profile.id);
    }

    return () => {
      setProperties([]);
    };
  }, [loadProperties, user]);

  return (
    <div>
      <div className='container mx-auto px-5'>
        <div className='w-full flex flex-row justify-between items-center'>
          <p className=' font-Primary text-4xl font-thin my-10'>Properties</p>
          <Link
            to={'/properties/create'}
            className=' inline-flex items-center rounded-md bg-yellow-500 hover:bg-yellow-400 dark:bg-indigo-700 dark:hover:bg-indigo-500 px-5 py-1 font-Primary uppercase font-thin'
          >
            <ViewGridAddIcon className='w-6 h-6 mr-2' />
            Add a property
          </Link>
        </div>
        {loading ? (
          <div className=' w-full h-56 flex items-center justify-center'>
            <p className=' font-Primary text-4xl opacity-40 animate-pulse uppercase '>
              Loading properties, please wait
            </p>
          </div>
        ) : properties.length > 0 ? (
          <UserPropertiesList properties={properties} />
        ) : (
          <div className=' w-full h-56 flex items-center justify-center'>
            <p className=' font-Primary text-4xl opacity-40 animate-pulse uppercase '>
              No properties
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

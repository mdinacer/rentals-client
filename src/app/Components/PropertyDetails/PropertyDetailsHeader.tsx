import {
  ArrowLeftIcon,
  ArrowsExpandIcon,
  HeartIcon,
  StarIcon,
  ViewGridIcon,
} from '@heroicons/react/solid';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import agent from '../../api/agent';
import { Property } from '../../models/property';
import { useAppSelector } from '../../store/configureStore';

interface Props {
  property: Property;
}

export default function PropertyDetailsHeader({ property }: Props) {
  const { user } = useAppSelector((state) => state.account);
  const [isFavorite, setIsFavorite] = useState(false);

  const setFavorite = async () => {
    try {
      const result = await agent.Properties.setFav(property.id);

      setIsFavorite(result.isFavorite);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user && user.profile) {
      const isFav =
        (user && user.profile.favorites.includes(property.id)) || false;
      setIsFavorite(isFav);
    }
  }, [property.id, user]);
  return (
    <div className='relative h-[45vh] lg:h-[55vh] w-full bg-black text-white'>
      <img
        src={property.cover.pictureUrl}
        alt={property.slug}
        className='absolute top-0 left-0 right-0 bottom-0 h-full w-full object-cover'
      />

      <div className='absolute top-0 left-0 right-0 bottom-0 h-full w-full bg-gradient-to-b from-black via-transparent to-black' />

      <div className='relative h-full w-full flex flex-col justify-between px-5 py-5'>
        <div className='w-full flex flex-row justify-between items-center '>
          <Link to={'/properties'}>
            <ArrowLeftIcon className='h-6 w-6' />
          </Link>

          {user && !property.isOwner && (
            <button type='button' onClick={setFavorite}>
              <HeartIcon
                className={` h-6 w-6 transition-all duration-300  ${
                  isFavorite ? 'text-red-600' : 'text-white'
                }`}
              />
            </button>
          )}
        </div>

        <div className=' w-full '>
          <p className='text-3xl lg:text-5xl font-Primary font-thin first-letter:capitalize mb-2'>
            {property.title}
          </p>

          <p className=' inline-flex gap-x-1 capitalize items-center font-Secondary mb-3 '>
            {property.address.wilaya && <span>{property.address.wilaya},</span>}
            {property.address.daira && <span>{property.address.daira},</span>}
            {property.address.commune && (
              <span>{property.address.commune},</span>
            )}
          </p>

          <div className='w-full rounded-md flex flex-row justify-around bg-white bg-opacity-20 backdrop-blur-md py-1'>
            <div className='inline-flex items-center gap-x-2'>
              <ArrowsExpandIcon className='h-5 w-5' />
              <p>{property.details.area} m²</p>
            </div>
            <div className='inline-flex items-center gap-x-2'>
              <ViewGridIcon className='h-5 w-5' />
              <p>{property.details.rooms}</p>
            </div>
            <div className='inline-flex items-center gap-x-2'>
              <StarIcon className='h-5 w-5' />
              <p>{property.rating}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

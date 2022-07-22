import { StarIcon } from '@heroicons/react/solid';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Property } from '../../models/property';

interface Props {
  property: Property;
}

export default function PropertiesListItem({ property }: Props) {
  return (
    <AnimatePresence exitBeforeEnter>
      {property && (
        <motion.div
          variants={CardVariants}
          initial='initial'
          animate='animate'
          whileHover={'hover'}
          exit='exit'
          className=' drop-shadow-sm hover:drop-shadow-md transition-all duration-300 rounded-md overflow-hidden'
        >
          <Link
            to={`/properties/${property.slug}`}
            className='relative w-full h-full min-h-[30vh]  flex items-end'
          >
            <motion.img
              variants={CardImageVariants}
              src={property.cover.pictureUrl}
              alt={property.slug}
              className='absolute h-full w-full top-0 left-0 object-cover '
            />

            <div className='relative flex-auto bg-gray-200 dark:bg-gray-800 dark:bg-opacity-50 border border-gray-300 dark:border-gray-700 px-4 py-2 bg-opacity-60 backdrop-blur-sm flex flex-row justify-between items-center '>
              <div>
                <p className=' font-Primary text-2xl font-thin'>
                  {property.title}
                </p>
                <p className=' font-Secondary capitalize'>
                  {property.address.daira} - {property.address.commune}
                </p>
              </div>
            </div>

            {property.rating > 0 && (
              <div className='absolute bottom-1 lg:bottom-3 right-3 flex flex-row items-end lg:px-5'>
                <StarIcon className='h-7 w-7 mr-2 text-yellow-300 dark:text-indigo-300' />
                <p className=' font-Primary text-xl lg:text-3xl font-thin'>
                  {property.rating}
                </p>
              </div>
            )}
            <div className=' absolute top-1 right-1 rounded-md overflow-hidden'>
              <div className=' bg-yellow-500 dark:bg-indigo-700 py-0 px-5'>
                <p>
                  <span className='font-Primary font-thin text-xl'>
                    {property.price.amount.toFixed(2)}
                  </span>
                  <span className='font-Primary font-thin text-sm'> DA</span>
                </p>
              </div>

              <div className=' inline-flex items-center justify-center bg-black text-white w-full py-0'>
                <p className=' font-Secondary text-base'>
                  <span className=' font-Primary text-xl font-thin'>
                    {property.details.rooms}
                  </span>
                  {' Pièces'}
                </p>
              </div>
            </div>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const CardVariants = {
  initial: {},
  hover: {},
  animate: {
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
  exit: { opacity: 0, x: -200 },
};

const CardImageVariants = {
  initial: { scale: 1.2, transition: { duration: 1, ease: 'easeInOut' } },
  hover: {
    scale: 1,

    transition: { duration: 1, ease: 'easeInOut' },
  },
  animate: { scale: 1.2, transition: { duration: 1, ease: 'easeInOut' } },
  exit: {},
};

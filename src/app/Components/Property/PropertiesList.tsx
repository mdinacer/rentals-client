import { motion } from 'framer-motion';
import { Property } from '../../models/property';
import PropertiesListItem from './PropertiesListItem';

interface Props {
  properties: Property[];
}

export default function PropertiesList({ properties }: Props) {
  return (
    <motion.div
      variants={ContainerVariants}
      initial='initial'
      animate='animate'
      exit='exit'
      className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 py-5  gap-4 w-full  px-5'
    >
      {properties.map((property) => (
        <motion.div key={property.slug} variants={ItemVariants}>
          <PropertiesListItem key={property.id} property={property} />
        </motion.div>
      ))}
    </motion.div>
  );
}

const ContainerVariants = {
  initial: {},
  animate: {
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
  exit: {},
};

const ItemVariants = {
  initial: { y: -100, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { x: -100, opacity: 0 },
};

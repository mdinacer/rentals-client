import { ChevronDownIcon } from '@heroicons/react/solid';
import { motion } from 'framer-motion';
import { useState } from 'react';
interface Props {
  title: string;
  children: JSX.Element | JSX.Element[];
  className?: string;
}
export default function Collapsible({ title, children, className }: Props) {
  const [expanded, setExpanded] = useState(false);
  return (
    <>
      <button
        onClick={() => setExpanded((prev) => !prev)}
        className={
          className +
          ' w-full flex flex-row justify-between items-center py-2 px-5 lg:px-10 border-y dark:border-gray-700 border-y-gray-200'
        }
      >
        <p className=' font-Primary  text-2xl lg:text-2xl font-thin    uppercase'>
          {title}
        </p>
        <ChevronDownIcon
          className={`h-6 w-6 transition-all duration-200 ${
            expanded ? 'rotate-180' : 'rotate-0'
          }`}
        />
      </button>

      <motion.div
        className=' overflow-hidden'
        animate={{ height: expanded ? '100%' : '0px' }}
      >
        {children}
      </motion.div>
    </>
  );
}

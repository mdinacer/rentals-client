import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/solid';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useOutsideClick } from '../../util/outsideClick';

type ListItem = { title: string; value: any };

interface Props {
  label: string;
  items: ListItem[];
  className?: string;
  onChange: (value: string) => void;
}

export default function AppDropDown(props: Props) {
  const node = useRef(null);
  const [expanded, setExpanded] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ListItem | null>(null);

  const handleSelectionChange = (item: ListItem) => {
    props.onChange(item.value);
    setSelectedItem(item);
    setExpanded(false);
  };

  useEffect(() => {
    if (props.items.length > 0) {
      setSelectedItem(props.items[0]);
    }
  }, []);

  const handleCloseMenu = () => {
    setExpanded(false);
  };

  useOutsideClick(node, handleCloseMenu);

  return (
    <div ref={node} className={'relative select-none' + props.className}>
      <div className='py-1'>
        <p className='text-sm font-Secondary font-medium  dark:text-gray-100 uppercase'>
          {props.label}
        </p>
      </div>
      <button
        type='button'
        className=' inline-flex items-center w-full border border-gray-400'
        onClick={() => setExpanded((prev) => !prev)}
      >
        <div className='text-left flex-auto w-full font-Secondary py-2 px-5 uppercase'>
          {selectedItem?.title}
        </div>
        <div className=' flex-initial px-2 py-1 border-l border-l-gray-400'>
          <div
            className={`${
              expanded ? 'rotate-180' : 'rotate-0'
            } transition-all duration-300`}
          >
            <ChevronDownIcon className='h-8 w-8' />
          </div>
        </div>
      </button>

      <AnimatePresence exitBeforeEnter>
        {expanded && (
          <motion.div
            variants={containerVariants}
            initial='hidden'
            animate='open'
            exit='exit'
            style={{ transformOrigin: 'top' }}
            className='absolute mt-1 w-full z-10 shadow-md'
          >
            <motion.ul className='bg-gray-200 dark:bg-slate-700 flex flex-col border border-gray-400 dark:border-y-gray-800 z-40'>
              {props.items.map((item, index) => (
                <li key={index} className='w-full'>
                  <button
                    className='relative w-full  px-5 py-2 hover:bg-sky-500 dark:hover:bg-indigo-500 cursor-pointer inline-flex items-center gap-x-3'
                    onClick={() => handleSelectionChange(item)}
                  >
                    {selectedItem && selectedItem.value === item.value && (
                      <ChevronRightIcon className='h-6 w-6 ' />
                    )}
                    <p className='text-left font-Secondary text-base first-letter:uppercase'>
                      {item.title}
                    </p>
                  </button>
                </li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const containerVariants = {
  hidden: { scaleY: 0 },
  open: { scaleY: 1 },
  exit: { scaleY: 0 },
};

import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/solid';
import { AnimatePresence, motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { useController, UseControllerProps } from 'react-hook-form';
import { useOutsideClick } from '../../util/outsideClick';

interface Props extends UseControllerProps {
  label: string;
  type?: string;
  autoComplete?: string | undefined;
  items: { title: string; value: any }[];
  initial?: string;
  className?: string;
}

export default function AppDropDownInput(props: Props) {
  const node = useRef(null);
  const [expanded, setExpanded] = useState(false);
  const { fieldState, field } = useController({
    ...props,
    defaultValue: props.initial || '',
  });

  const getItem = (value: string) => {
    const item = props.items.find((i) => i.value === value);
    return item ? item.title : '';
  };

  const handleCloseMenu = () => {
    setExpanded(false);
  };

  useOutsideClick(node, handleCloseMenu);

  return (
    <div ref={node} className={'relative select-none'}>
      <button
        type='button'
        className={
          ' inline-flex items-center  border border-gray-400 ' + props.className
        }
        onClick={() => setExpanded((prev) => !prev)}
      >
        <div className='inline-flex items-center gap-x-4 text-left flex-auto w-full font-Secondary py-0 px-5 capitalize'>
          <p className='text-sm text-gray-500 dark:text-gray-100 uppercase'>
            {props.label}
          </p>
          <p>{getItem(field.value)}</p>
        </div>
        <div className=' flex-initial px-2 py-0 border-l border-l-gray-400'>
          <div
            className={`${
              expanded ? 'rotate-180' : 'rotate-0'
            } transition-all duration-300`}
          >
            <ChevronDownIcon className='h-8 w-8' />
          </div>
        </div>
      </button>
      {fieldState.error && (fieldState.isDirty || fieldState.isTouched) && (
        <div className='py-1 w-full'>
          <p className={`w-full text-sm text-red-500 first-letter:uppercase `}>
            {fieldState.error.message}
          </p>
        </div>
      )}

      <AnimatePresence exitBeforeEnter>
        {expanded && (
          <motion.div
            variants={containerVariants}
            initial='hidden'
            animate='open'
            exit='exit'
            style={{ transformOrigin: 'top' }}
            className='absolute mt-1 w-full z-10 max-w-lg '
          >
            <motion.ul className='bg-gray-200 dark:bg-black flex flex-col border border-gray-400 dark:border-y-gray-800 z-40'>
              {props.items.map((item, index) => (
                <li
                  key={index}
                  className='px-5 py-2 hover:bg-yellow-500 dark:hover:bg-indigo-500 cursor-pointer inline-flex items-center gap-x-3'
                  onClick={() => {
                    field.onChange(item.value);
                    setExpanded(false);
                  }}
                >
                  <div className='h-6 w-6'>
                    {field.value === item.value && (
                      <ChevronRightIcon className='h-6 w-6' />
                    )}
                  </div>
                  <p className='text-left font-Secondary text-base first-letter:uppercase'>
                    {item.title}
                  </p>
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

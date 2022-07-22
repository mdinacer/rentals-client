import { Fragment, useState } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';

type ListItemType = { title: string; value: any };

interface Props {
  items: ListItemType[];
  label?: string;
  selected: ListItemType | null;
  setSelected: (value: any) => void;
  onChange: (value: any) => void;
}

export default function AutocompleteDropDown({
  items = [],
  label,
  selected,
  setSelected,
  onChange,
}: Props) {
  //const [selected, setSelected] = useState(items[0]);
  const [query, setQuery] = useState('');

  const filteredItems =
    query === ''
      ? items
      : items.filter((item) =>
          item.title
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, ''))
        );

  const handleChange = (value: any) => {
    setSelected(value);
    onChange(value);
  };

  return (
    <div className=''>
      {label && (
        <div className='py-1'>
          <p className='text-sm text-slate-600 dark:text-gray-100 capitalize'>
            {label}
          </p>
        </div>
      )}
      <Combobox value={selected} onChange={handleChange}>
        <div className='relative mt-1'>
          <div className='relative w-full cursor-default overflow-hidden  text-left  border  border-gray-400 focus:border-gray-400  focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-yellow-300 dark:focus-visible:ring-offset-indigo-300 sm:text-sm'>
            <Combobox.Input
              className='w-full capitalize border-none py-2 pl-3 pr-10 text-sm leading-5 bg-transparent focus:ring-0'
              displayValue={(item: any) => item?.title || ''}
              onChange={(event) => setQuery(event.target.value)}
            />
            <Combobox.Button className='absolute inset-y-0 right-0 flex items-center pr-2'>
              <SelectorIcon
                className='h-5 w-5 text-gray-400'
                aria-hidden='true'
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
            afterLeave={() => setQuery('')}
          >
            <Combobox.Options className='absolute  z-20 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-gray-800 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
              {filteredItems.length === 0 && query !== '' ? (
                <div className='relative cursor-default select-none py-2 px-4 text-gray-700'>
                  Nothing found.
                </div>
              ) : (
                filteredItems.map((item, index) => (
                  <Combobox.Option
                    key={index}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active
                          ? 'bg-yellow-400 dark:bg-indigo-600'
                          : 'text-inherit'
                      }`
                    }
                    value={item}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate capitalize ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          {item.title}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active
                                ? 'text-white'
                                : 'text-yellow-500 dark:text-indigo-500'
                            }`}
                          >
                            <CheckIcon className='h-5 w-5' aria-hidden='true' />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
}

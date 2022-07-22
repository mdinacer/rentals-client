import DatePicker from 'react-datepicker';
import { forwardRef } from 'react';
import { Controller, useController, UseControllerProps } from 'react-hook-form';
import { format } from 'date-fns';
import {
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/solid';

interface Props extends UseControllerProps {
  label: string;
  selectsStart?: boolean;
  selectsEnd?: boolean;
  startDate?: Date | null;
  endDate?: Date | null;
  minDate?: Date | null;
  secondaryAction?: (value: Date | null) => void;
}

export default function AppDatePicker(props: Props) {
  const { fieldState, field } = useController({
    ...props,
    defaultValue: new Date(),
  });

  return (
    <div className={`w-full overflow-hidden flex flex-col`}>
      <div className='py-1'>
        <p className='text-lg font-Primary font-thin text-gray-600 dark:text-gray-100 uppercase'>
          {props.label}
        </p>
      </div>
      <Controller
        {...props}
        {...field}
        render={({ field }) => (
          <DatePicker
            todayButton={
              <div className=' my-2 px-5'>
                <button className='w-full bg-yellow-500 dark:bg-indigo-500 font-Primary text-base py-1 px-2 rounded-md font-thin text-white'>
                  Today
                </button>
              </div>
            }
            locale='fr'
            className='w-full'
            placeholderText='Select date'
            onChange={(date) => {
              field.onChange(date);
              if (props.secondaryAction) {
                props.secondaryAction(date);
              }
            }}
            selected={field.value}
            ref={null}
            selectsStart={props.selectsStart}
            selectsEnd={props.selectsEnd}
            minDate={props.minDate}
            startDate={props.startDate}
            endDate={props.endDate}
            customInput={<ButtonInput />}
            renderCustomHeader={({
              date,
              decreaseMonth,
              increaseMonth,
              prevMonthButtonDisabled,
              nextMonthButtonDisabled,
            }) => (
              <div className='flex items-center justify-between px-2 py-2'>
                <span className='text-lg text-gray-700'>
                  {format(date, 'PP')}
                </span>

                <div className='space-x-2'>
                  <button
                    onClick={decreaseMonth}
                    disabled={prevMonthButtonDisabled}
                    type='button'
                    className={`
                                  ${
                                    prevMonthButtonDisabled &&
                                    'cursor-not-allowed opacity-50'
                                  }
                                  inline-flex p-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-blue-500
                              `}
                  >
                    <ChevronLeftIcon className='w-5 h-5 text-gray-600' />
                  </button>

                  <button
                    onClick={increaseMonth}
                    disabled={nextMonthButtonDisabled}
                    type='button'
                    className={`
                                  ${
                                    nextMonthButtonDisabled &&
                                    'cursor-not-allowed opacity-50'
                                  }
                                  inline-flex p-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-blue-500
                              `}
                  >
                    <ChevronRightIcon className='w-5 h-5 text-gray-600' />
                  </button>
                </div>
              </div>
            )}
          />
        )}
      />
      {fieldState.error && (fieldState.isDirty || fieldState.isTouched) && (
        <div className='py-1 w-full'>
          <p className={`w-full text-sm text-red-500 first-letter:uppercase `}>
            {fieldState.error.message}
          </p>
        </div>
      )}
    </div>
  );
}

const ButtonInput = forwardRef<HTMLButtonElement, any>((props, ref) => (
  <button
    ref={ref}
    onClick={props.onClick}
    type='button'
    className='inline-flex w-full border border-gray-400 focus:border-gray-400 focus:outline-none  focus:border  py-2 px-5 font-Secondary  placeholder:text-gray-400'
  >
    <div className='flex-auto'>
      <p className='font-Secondary text-xl'>
        {props.value ? format(new Date(props.value), 'PP') : ''}
      </p>
    </div>
    <CalendarIcon className='h-6 w-6 flex-initial text-gray-500' />
  </button>
));

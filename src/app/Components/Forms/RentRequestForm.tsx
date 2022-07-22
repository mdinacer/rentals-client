import {
  addDays,
  addWeeks,
  addMonths,
  addYears,
  formatDuration,
  intervalToDuration,
  format,
} from 'date-fns';
import { useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import AppDatePicker from './AppDatePicker';
import { ar, fr, enUS } from 'date-fns/locale';
import { registerLocale } from 'react-datepicker';
import { PlusIcon, RefreshIcon, XIcon } from '@heroicons/react/solid';
import { Property } from '../../models/property';
import { RentRequestValidationSchema } from '../../validation/requestValidation';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import agent from '../../api/agent';
import { Rent } from '../../models/rent';
import { RentStatus } from '../../models/RentStatus';

registerLocale('ar', ar);
registerLocale('fr', fr);
registerLocale('en', enUS);

const durations = [
  { title: 'Jour', value: 'day' },
  { title: 'Semaine', value: 'week' },
  { title: 'Mois', value: 'month' },
  { title: 'Année', value: 'year' },
];

interface Props {
  property: Property;
  request?: Rent;
  onClose: (value: Rent | null) => void;
}

const styles = {
  title: 'uppercase font-Primary font-thin  text-lg ',
  paragraph: 'capitalize font-Secondary  text-xl ',
  detailsContainer: 'w-full flex flex-row gap-x-5 ',
};

export default function RentRequestForm({ property, request, onClose }: Props) {
  const isEdit = !!request;
  const [startDate, setStartDate] = useState<Date | null>(
    request ? new Date(request.startDate) : new Date()
  );
  const [endDate, setEndDate] = useState<Date | null>(
    request ? new Date(request.startDate) : new Date()
  );

  const {
    control,
    setValue,
    reset,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = useForm({
    mode: 'all',
    resolver: yupResolver(RentRequestValidationSchema),
  });

  const addDuration = (duration: string) => {
    if (startDate && !endDate) {
      setEndDate(startDate);
    }
    if (duration && endDate) {
      let futureDate = new Date();
      switch (duration) {
        case 'day':
          futureDate = addDays(endDate, 1);
          setValue('endDate', futureDate);

          break;
        case 'week':
          futureDate = addWeeks(endDate, 1);
          setValue('endDate', futureDate);
          break;
        case 'month':
          futureDate = addMonths(endDate, 1);
          setValue('endDate', futureDate);
          break;
        case 'year':
          futureDate = addYears(endDate, 1);
          setValue('endDate', futureDate);
          break;
      }
      setEndDate(futureDate);
    }
  };

  async function handleSubmitData(data: FieldValues) {
    let result = null;
    try {
      if (isEdit) {
        result = await agent.Rents.update(request.id, data);
      } else {
        result = await agent.Rents.create(property.id, data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      reset({ startDate: new Date(), endDate: new Date() });
      onClose(result);
    }
  }

  useEffect(() => {
    if (request) {
      const start = request.startDate
        ? new Date(request.startDate)
        : new Date();
      const end = request.endDate ? new Date(request.endDate) : new Date();
      reset({
        startDate: start,
        endDate: end,
      });
      setStartDate(start);
      setEndDate(end);
    }
  }, [request, reset]);

  useEffect(() => {
    if (!property.available && property.availableFrom) {
      setStartDate(new Date(property.availableFrom));
    }
  }, [property.available, property.availableFrom]);

  return (
    <div className='relative bg-gray-100 dark:bg-slate-800 lg:rounded-md w-full lg:w-full lg:max-w-xl'>
      <button
        type='button'
        title='close'
        className='absolute top-0 right-0 p-2 opacity-50 hover:opacity-100 text-white'
        onClick={() => onClose(null)}
      >
        <XIcon className='w-6 h-6' />
      </button>
      <div className='grid grid-flow-row gap-2  bg-gray-900 text-white px-10 py-5 lg:rounded-t-md'>
        <div className={'w-full'}>
          <p className={' font-Primary text-4xl font-thin'}>{property.title}</p>
          <p className={'font-Secondary text-base'}>
            {property.address.commune} - {property.address.daira},{' '}
            {property.address.wilaya}
          </p>
        </div>

        {isEdit && (
          <>
            <div className={styles.detailsContainer}>
              <p className={styles.title}>Date</p>
              <p className={styles.paragraph}>
                {format(new Date(request.creationDate), 'dd/MM/yyyy')}
              </p>
            </div>
            <div className={styles.detailsContainer}>
              <p className={styles.title}>Status</p>
              <p className={styles.paragraph}>
                {RentStatus[request.status as any]}
              </p>
            </div>
          </>
        )}
        {startDate && endDate && startDate < endDate && (
          <p className={styles.paragraph}>
            {formatDuration(
              intervalToDuration({
                start: startDate,
                end: endDate,
              }),
              {
                format: ['years', 'months', 'days'],
                zero: false,
                delimiter: ' - ',
              }
            )}
          </p>
        )}
      </div>
      <form
        onSubmit={handleSubmit(handleSubmitData)}
        className='px-5 lg:px-10 py-5'
      >
        <div className='grid gap-5'>
          <div className=' grid grid-cols-1 lg:grid-cols-2 gap-x-5'>
            <AppDatePicker
              label={'Date début'}
              control={control}
              name='startDate'
              selectsStart
              startDate={startDate}
              endDate={endDate}
              minDate={
                property.availableFrom
                  ? new Date(property.availableFrom)
                  : addDays(new Date(), -1)
              }
              secondaryAction={(date) => {
                if (date) {
                  setStartDate(date);
                  if (endDate && endDate < date) {
                    setValue('endDate', date, { shouldTouch: true });
                    setEndDate(date);
                  }
                }
              }}
            />
            <AppDatePicker
              // defaultValue={request ? new Date(request.endDate) : new Date()}
              label={'Date fin'}
              control={control}
              name='endDate'
              
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              secondaryAction={(date) => setEndDate(date)}
            />
          </div>
          <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 '>
            {durations.map((duration, index) => (
              <button
                key={index}
                onClick={() => addDuration(duration.value)}
                className=' inline-flex items-center justify-center gap-x-1  border border-gray-400 py-1 px-5'
                type='button'
              >
                <PlusIcon className='h-5 w-5' />
                <p className=' font-Primary text-lg font-thin uppercase'>
                  {duration.title}
                </p>
              </button>
            ))}
          </div>
          <button
            onClick={() => {
              setValue('startDate', new Date(), {
                shouldTouch: true,
              });
              setStartDate(new Date());
              setValue('endDate', startDate || new Date(), {
                shouldTouch: true,
              });
              setEndDate(startDate || new Date());
            }}
            className='w-full inline-flex items-center justify-center border border-red-600 text-red-500  px-5 py-1 font-Secondary text-base uppercase'
            type='button'
          >
            <RefreshIcon className='h-5 w-5 mr-2' />
            Reset
          </button>
        </div>

        <div className='flex justify-between items-center mt-7 '>
          <input
            className={`border-gray-800 border cursor-pointer  font-Secondary text-base  px-5 py-1 uppercase `}
            type='button'
            value={'Sortir'}
            onClick={() => onClose(null)}
          />
          <input
            className={`${
              isValid ? 'opacity-100  ' : 'opacity-50 '
            }  bg-gray-900 text-white font-Secondary text-base  px-5 py-1 uppercase `}
            disabled={!isValid}
            type='submit'
            value={isSubmitting ? 'Attendez SVP' : 'Envoyer'}
          />
        </div>
      </form>
    </div>
  );
}

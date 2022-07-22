import { StarIcon } from '@heroicons/react/solid';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import agent from '../../api/agent';
import { Property } from '../../models/property';
import { PropertyReview } from '../../models/propertyReview';
import { reviewValidationSchema } from '../../validation/reviewValidation';
import AppTextArea from './TextArea';

interface Props {
  property: Property;
  handleAddReview: (review: PropertyReview) => void;
}

export default function PropertyReviewForm({
  property,
  handleAddReview,
}: Props) {
  const [selectedRating, setSelectedRating] = useState(0);
  const {
    control,
    setValue,
    reset,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = useForm({
    // defaultValues: { rating: 0, body: '' },
    mode: 'all',
    resolver: yupResolver(reviewValidationSchema),
  });

  function handleRatingChange(value: number) {
    setSelectedRating(value);
    setValue('rating', value, {
      shouldTouch: true,
      shouldDirty: true,
      shouldValidate: true,
    });
  }

  async function handleSubmitData(data: FieldValues) {
    try {
      const result = await agent.Reviews.create(property.id, data);
      handleAddReview(result);
    } catch (error) {
      console.log(error);
    } finally {
      setSelectedRating(0);
      reset({ body: '', rating: 0 });
    }
  }

  return (
    <form
      onSubmit={handleSubmit(handleSubmitData)}
      className='pb-4 border-b border-b-gray-400'
    >
      <div className=' inline-flex gap-x-5 items-end py-5 w-full justify-between lg:justify-start px-5'>
        <div className='grid grid-flow-col'>
          {[0, 1, 2, 3, 4, 5].map((item, index) => (
            <button
              type='button'
              onClick={() => handleRatingChange(item)}
              className={`w-6 h-6 ${
                selectedRating >= item
                  ? 'text-yellow-500 dark:text-indigo-500'
                  : 'text-slate-500'
              }  transition-all duration-300 `}
              key={index}
            >
              <StarIcon className={`h-full w-full `} />
            </button>
          ))}
        </div>
        <p className=' font-Primary text-4xl font-thin'>
          {selectedRating >= 0 ? selectedRating : 'no rating'}
        </p>
      </div>
      <div className='flex flex-col lg:flex-row rounded-md overflow-hidden'>
        <div className='relative flex-auto '>
          <AppTextArea
            name='body'
            placeholder='Post a review'
            label=''
            control={control}
            rows={5}
          />
          <input
            className={`absolute bottom-1 right-1 ${
              isValid ? 'opacity-100 ' : 'opacity-50 '
            } text-white bg-gray-900 rounded-lg font-Primary flex-initial text-lg uppercase font-thin px-5 py-1`}
            disabled={!isValid}
            type='submit'
            value={isSubmitting ? 'Please wait' : 'Post'}
          />
        </div>
      </div>
    </form>
  );
}

import { StarIcon } from '@heroicons/react/solid';
import { Property } from '../../models/property';
import { PropertyReview } from '../../models/propertyReview';
import { useAppSelector } from '../../store/configureStore';
import PropertyReviewForm from '../Forms/PropertyReviewForm';

interface Props {
  property: Property;
  onAddReview: (review: PropertyReview) => void;
}

export default function PropertyDetailsReviews({
  property,
  onAddReview,
}: Props) {
  const { user } = useAppSelector((state) => state.account);
  const reviewed =
    user && property.reviews.some((review) => review.host === user.profile.id);

  return (
    <div className='w-full'>
      {user && !(property.isOwner || reviewed) && (
        <PropertyReviewForm property={property} handleAddReview={onAddReview} />
      )}

      {property.reviews.length > 0 ? (
        <div className='grid gap-y-5'>
          {property.reviews.map((review: PropertyReview, index) => (
            <div key={index} className='w-full py-3 '>
              <div className='w-full flex flow-row justify-between'>
                <p className=' font-Primary text-2xl font-thin'>
                  {review.hostName}
                </p>

                <div className=' inline-flex gap-x-1 items-center'>
                  <StarIcon className='h-5 w-5' />
                  <p className=' font-Primary text-lg font-thin'>
                    {review.rating}
                  </p>
                </div>
              </div>
              <p className=' font-Secondary'>{review.body}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className='px-5 lg:px-10 p-5'>
          <p className=' font-Primary text-lg opacity-50 font-thin uppercase text-center'>
            No reviews
          </p>
        </div>
      )}
    </div>
  );
}

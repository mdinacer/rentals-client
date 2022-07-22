import { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import agent from '../../api/agent';
import LoadingComponent from '../../Components/Common/LoadingComponent';
import { Property } from '../../models/property';
import { useAppDispatch, useAppSelector } from '../../store/configureStore';
import { PropertyReview } from '../../models/propertyReview';
import { Rent } from '../../models/rent';
import { Image } from '../../models/image';
import { PencilAltIcon, XIcon } from '@heroicons/react/solid';
import Layout from '../../layout/Layout';
import RentRequestForm from '../../Components/Forms/RentRequestForm';
import ImageSlider from '../../Components/Common/ImageSlider';
import PropertyDetailsHeader from '../../Components/PropertyDetails/PropertyDetailsHeader';
import PropertyDetailsPrice from '../../Components/PropertyDetails/PropertyDetailsPrice';
import PropertyServicesList from '../../Components/PropertyDetails/PropertyServicesList';
import PropertyDetailsSection from '../../Components/PropertyDetails/PropertyDetailsSection';
import PropertyDetailsReviews from '../../Components/PropertyDetails/PropertyDetailsReviews';
import PropertyDetailsList from '../../Components/PropertyDetails/PropertyDetailsList';
import PropertyDetailsOwner from '../../Components/PropertyDetails/PropertyDetailsOwner';
import PropertyDetailsAvailability from '../../Components/PropertyDetails/PropertyDetailsAvailability';
import { updateProperty } from '../../slices/propertiesSlice';
import PropertyAvailabilityForm from '../../Components/Forms/PropertyAvailabilityForm';

export default function PropertyDetails() {
  //const [socket, setSocket] = useState<Socket | null>(null);
  const { user } = useAppSelector((state) => state.account);
  const dispatch = useAppDispatch();
  const { slug } = useParams<{ slug: string }>();
  const [property, setProperty] = useState<Property | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [openRequest, setOpenRequest] = useState(false);
  const [activeRequest, setActiveRequest] = useState<Rent | undefined>(
    undefined
  );
  const [loadingRequest, setLoadingRequest] = useState(false);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [updateStatus, setUpdateStatus] = useState(false);
  const fetchProperty = useCallback(
    async (slug: string) => {
      try {
        setLoading(true);
        const result = await agent.Properties.details(slug);
        const isOwner = result.owner.id === user?.profile.id;
        setProperty({ ...result, isOwner });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    },
    [user?.profile.id]
  );

  const setAvailability = (values: any) => {
    if (property && values) {
      setProperty((prev) => ({ ...prev, ...values }));
      dispatch(updateProperty({ id: property.id, changes: { ...values } }));
    }
  };

  const fetchActiveRequest = useCallback(
    async (propertyId: string) => {
      if (user) {
        try {
          setLoadingRequest(true);
          const result = await agent.Rents.getActiveRequest(propertyId);

          setActiveRequest(result);
        } catch (error) {
          console.log(error);
        } finally {
          setLoadingRequest(false);
        }
      }
    },
    [user]
  );

  useEffect(() => {
    if (slug) {
      fetchProperty(slug);
    }
    return () => {
      setProperty(undefined);
    };
  }, [fetchProperty, slug]);

  useEffect(() => {
    if (property && !property.isOwner) {
    }

    return () => {
      setActiveRequest(undefined);
    };
  }, [fetchActiveRequest, property]);

  function handleAddReview(review: PropertyReview) {
    if (property) {
      const reviews = [review, ...property.reviews];
      setProperty({ ...property, reviews });
    }
  }

  if (loading)
    return (
      <LoadingComponent message='Loading Property details, please wait...' />
    );
  if (!property)
    return (
      <div className='py-20 w-screen h-screen bg-slate-300 flex items-center justify-center'>
        <p className=' font-Secondary text-xl'>Property not found</p>
      </div>
    );
  return (
    <>
      <Layout className='bg-black flex pt-[44px] overflow-hidden'>
        <div className='flex-1 container mx-auto lg:bg-black dark:bg-black bg-gray-200 lg:p-5  flex flex-col  overflow-hidden'>
          <div className='w-full mt-2 border-b border-b-yellow-600 dark:border-b-indigo-500'>
            <PropertyDetailsAvailability property={property} />
          </div>
          <PropertyDetailsHeader property={property} />

          {property.services && (
            <div className='lg:px-5  bg-black'>
              <PropertyServicesList services={property.services} />
            </div>
          )}

          {!property.isOwner && <PropertyDetailsOwner property={property} />}
          {property.isOwner && (
            <div className=' w-full bg-gray-600 py-3 px-10'>
              <div className=' flex flex-row gap-x-10 items-center'>
                <Link
                  to={`/properties/edit/${property.slug}`}
                  className=' inline-flex items-center bg-orange-600 py-1 px-3 rounded-md'
                >
                  <PencilAltIcon className='h-6 w-6 mr-2' />
                  <span className=' font-Primary text-lg uppercase font-thin'>
                    Modifier
                  </span>
                </Link>

                <button
                  onClick={() => setUpdateStatus(true)}
                  type='button'
                  className={`py-1 px-3 rounded-md ${
                    property.available ? 'bg-red-600 ' : 'bg-green-600'
                  }`}
                >
                  <span
                    className={' font-Primary text-lg uppercase font-thin  '}
                  >
                    {property.available
                      ? 'Rendre occupée'
                      : 'Rendre disponible'}
                  </span>
                </button>
              </div>
            </div>
          )}

          <PropertyDetailsPrice
            busy={loadingRequest}
            isEdit={!!activeRequest}
            price={property.price}
            isOwner={property.isOwner}
            onRequest={() => setOpenRequest(true)}
          />

          <div className=' bg-gray-200 dark:bg-black  py-5 px-5 lg:px-10 flex flex-col justify-between'>
            <PropertyDetailsSection title='Description' className='mt-5'>
              <p className='font-Secondary'>{property.description}</p>
            </PropertyDetailsSection>

            <PropertyDetailsSection title='Galerie' className='my-5'>
              <div className='h-40 overflow-x-auto scrollbar-hide rounded-lg snap-mandatory snap-x my-5 overscroll-x-none flex justify-start'>
                <ImageSlider
                  property={property}
                  setSelectedImage={setSelectedImage}
                />
              </div>
            </PropertyDetailsSection>

            <PropertyDetailsSection title='Détails' className='my-5'>
              <PropertyDetailsList details={property.details} />
            </PropertyDetailsSection>

            <PropertyDetailsSection title='Revues'>
              <PropertyDetailsReviews
                property={property}
                onAddReview={handleAddReview}
              />
            </PropertyDetailsSection>
          </div>
        </div>
      </Layout>

      {updateStatus && (
        <div
          className=' fixed top-0 left-0 right-0 bottom-0 h-screen w-full px-5 lg:px-10 z-20  overflow-auto py-10  bg-black bg-opacity-90 overscroll-none flex items-center justify-center'
          onClick={() => setSelectedImage(null)}
        >
          <div className='bg-white dark:bg-gray-800 rounded-lg py-5 px-10 max-w-lg w-full'>
            <PropertyAvailabilityForm
              property={property}
              onExit={(values) => {
                if (values) {
                  setAvailability(values);
                }
                setUpdateStatus(false);
              }}
            />
          </div>
        </div>
      )}
      {selectedImage && (
        <div
          className=' fixed top-0 left-0 right-0 bottom-0 h-screen w-full px-5 lg:px-10 z-20  overflow-auto py-10  bg-black bg-opacity-90 overscroll-none'
          onClick={() => setSelectedImage(null)}
        >
          <div className='relative  h-full w-full  overflow-auto scrollbar-hide overscroll-none rounded-lg '>
            <img
              src={selectedImage.pictureUrl}
              alt={selectedImage.publicId}
              className='absolute object-none max-w-[1920px] h-auto lg:max-w-screen-lg top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
            />
            <button
              className='fixed text-white z-10 top-0 right-0 m-2 bg-black bg-opacity-70 rounded-full'
              onClick={() => setSelectedImage(null)}
            >
              <XIcon className='lg:h-8 h-6 lg:w-8 w-6' />
            </button>
          </div>
        </div>
      )}

      {openRequest && (
        <div
          className=' fixed top-0 left-0 right-0 bottom-0 h-screen w-full  z-20 bg-black bg-opacity-90  flex items-center justify-center'
          onClick={() => setSelectedImage(null)}
        >
          {user ? (
            <div className='w-full md:max-w-md lg:max-w-lg'>
              <RentRequestForm
                property={property}
                request={activeRequest}
                onClose={(value) => {
                  if (value) {
                    setActiveRequest(value);
                  }
                  setOpenRequest(false);
                }}
              />
            </div>
          ) : (
            <div className='rounded-lg bg-white py-5 px-10'>
              <p className='font-Secondary text-base mb-5'>
                You must be a member in order to send a request
              </p>
              <div className='w-full flex flex-row gap-x-3 justify-end'>
                <Link to={'/account/register'} className={buttonStyle + ''}>
                  Register
                </Link>
                <Link
                  to={'/account/login'}
                  className={buttonStyle + ' bg-gray-800 text-white'}
                >
                  Login
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

const buttonStyle =
  'font-Secondary uppercase py-0 px-5 border border-black rounded-full';

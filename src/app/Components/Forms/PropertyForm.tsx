import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { useEffect, useState } from 'react';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import agent from '../../api/agent';
import { Property } from '../../models/property';
import { setProperty, updateProperty } from '../../slices/propertiesSlice';
import { useAppDispatch } from '../../store/configureStore';
import { buildFormData } from '../../util/formData';
import {
  PropertyEditValidationSchema,
  PropertyValidationSchema,
} from '../../validation/propertyValidation';
import MediaDropZone from './MediaDropZone';
import PropertyAddressForm from './PropertyAddressForm';
import PropertyDetailsForm from './PropertyDetailsForm';
import PropertyInfoForm from './PropertyInfoForm';
import PropertyMediaForm from './PropertyMediaForm';
import PropertyPriceForm from './PropertyPriceForm';
import PropertyServicesForm from './PropertyServicesForm';

interface Props {
  property?: Property;
}

export default function PropertyForm({ property }: Props) {
  const isEdit = !!property;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const validationSchema = isEdit
    ? PropertyEditValidationSchema
    : PropertyValidationSchema;

  const [deletedImages, setDeletedImages] = useState<Array<string>>([]);
  const methods = useForm({
    mode: 'all',
    resolver: yupResolver(validationSchema),
  });

  const watchFile = methods.watch('cover', null);
  const watchFiles: any[] = methods.watch('images', null);

  useEffect(() => {
    if (property && !watchFile && !methods.formState.isDirty) {
      const item = {
        title: property.title,
        type: property.type,
        description: property.description,
        price: property.price,
        details: property.details,
        services: property.services,
        address: property.address,
      };
      methods.reset(item);
    }

    return () => {
      if (watchFile) URL.revokeObjectURL(watchFile.preview);
      if (watchFiles) {
        watchFiles.forEach((file: any) => {
          URL.revokeObjectURL(file.preview);
        });
      }
    };
  }, [watchFile, property, watchFiles, methods]);

  function imagesToFormData(
    images: any[],
    property: string,
    formData: FormData
  ) {
    if (Array.isArray(images) && images.length > 0) {
      images.forEach((file) => {
        formData.append(property, file);
      });
    }
  }

  async function handleSubmitData(data: FieldValues) {
    let from = '/properties';

    try {
      const { images, cover, ...rest } = data;
      let formData = new FormData();
      buildFormData(formData, rest);
      if (cover) {
        formData.append('cover', cover);
      }
      if (images) {
        imagesToFormData(images, 'images', formData);
      }

      let result = null;

      if (isEdit) {
        result = await agent.Properties.update(property.id, formData);
        dispatch(updateProperty({ id: result.id, changes: result }));

        from = `/properties/${result.slug}`;
      } else {
        result = await agent.Properties.create(formData);
        dispatch(setProperty(result));

        from = `/properties/${result.slug}`;
      }
    } catch (error: any) {
      console.log(error);
    } finally {
      navigate(from);
    }

    await DeleteImages(deletedImages);
  }

  const handleRemoveImage = (id: string) => {
    const index = deletedImages.indexOf(id);
    if (index > -1) {
      setDeletedImages((prev) => [...prev.filter((x) => x !== id)]);
    } else {
      setDeletedImages((prev) => [...prev, id]);
    }
  };

  async function DeleteImages(images: Array<string>) {
    if (property && Array.isArray(images) && images.length > 0) {
      try {
        await agent.Properties.deleteImages(property.id, images);
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(handleSubmitData)}
        className='flex flex-col  max-w-4xl mx-auto  gap-y-5 bg-white dark:bg-gray-700 pt-10 pb-20'
      >
        <PropertyFormSection
          title='Generale'
          className='lg:border-r lg:border-r-gray-200 lg:dark:border-r-gray-600 p-5'
        >
          <PropertyInfos />
        </PropertyFormSection>

        <PropertyFormSection title='Couverture' className='p-5'>
          <div className='flex flex-col lg:flex-row  bg-gray-100 border border-gray-200 my-auto  rounded-md overflow-hidden p-1'>
            <MediaDropZone
              control={methods.control}
              name='cover'
              className=''
            />
            <div className='flex items-center h-auto w-full '>
              {watchFile ? (
                <img
                  className='object-fill object-center h-[140px] lg:h-[200px] w-full rounded-md'
                  src={watchFile.preview}
                  alt='preview'
                />
              ) : (
                <img
                  className='object-fill object-center h-[140px] lg:h-[200px] w-full rounded-md'
                  src={property?.cover.pictureUrl}
                  alt={property?.cover.pictureUrl}
                />
              )}
            </div>
          </div>
        </PropertyFormSection>

        <PropertyFormSection
          title='Adresse'
          className='p-5 border-t border-t-gray-200 lg:dark:border-t-gray-600'
        >
          <PropertyAddress />
        </PropertyFormSection>

        <div className='grid lg:grid-cols-2 gap-5 bg-gray-100 dark:bg-gray-800 border-b dark:border-gray-800 border-b-gray-200  p-5 shadow-inner shadow-gray-300 dark:shadow-gray-900'>
          <PropertyFormSection
            title='Détails'
            className='lg:border-r lg:border-r-gray-200 lg:dark:border-r-gray-600'
          >
            <PropertyDetails />
          </PropertyFormSection>

          <PropertyFormSection title='Services' className=''>
            <PropertyServices />
          </PropertyFormSection>
        </div>

        <PropertyFormSection title='Prix' className='p-5'>
          <PropertyPrice />
        </PropertyFormSection>

        <PropertyFormSection
          title='Galerie'
          className='p-5 bg-gray-100 dark:bg-gray-800 border-b border-b-gray-200 shadow-inner shadow-gray-300 dark:border-gray-800 dark:shadow-gray-900'
        >
          <PropertyMediaForm
            images={watchFiles}
            property={property}
            onImageRemove={handleRemoveImage}
          />
        </PropertyFormSection>

        <div className='flex flex-row items-center justify-center gap-x-5'>
          <input
            type='button'
            value='Cancel'
            className={buttonStyle + ' border border-gray-900'}
          />
          <input
            disabled={
              !methods.formState.isValid || methods.formState.isSubmitting
            }
            type='submit'
            value={methods.formState.isSubmitting ? 'Saving' : 'Save'}
            className={buttonStyle + 'bg-gray-900 text-white'}
          />
        </div>
      </form>
    </FormProvider>
  );
}

const buttonStyle =
  ' py-1 px-5 font-Primary text-base font-thin uppercase cursor-pointer ';

function PropertyInfos() {
  return (
    <div className=' w-full grid gap-y-2'>
      <PropertyInfoForm />
    </div>
  );
}

function PropertyDetails() {
  return (
    <div className='max-w-sm w-full grid grid-cols-2 gap-2 '>
      <PropertyDetailsForm />
    </div>
  );
}

function PropertyServices() {
  return (
    <div className='max-w-sm w-full grid grid-cols-2 gap-2'>
      <PropertyServicesForm />
    </div>
  );
}

function PropertyPrice() {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-3 gap-x-5 gap-y-2'>
      <PropertyPriceForm />
    </div>
  );
}

function PropertyAddress() {
  return (
    <div className=' w-full grid mt-5 lg:max-w-2xl mx-auto '>
      <PropertyAddressForm />
    </div>
  );
}

interface SectionPops {
  title: string;
  children: JSX.Element;
  className?: string;
}

function PropertyFormSection({ title, children, className }: SectionPops) {
  return (
    <div className={className}>
      <p className=' font-Primary text-xl font-thin uppercase mb-5 '>{title}</p>
      {children}
    </div>
  );
}

import { RefreshIcon, TrashIcon } from '@heroicons/react/outline';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Property } from '../../models/property';
import MediaDropZone from './MediaDropZone';

export interface PropertyMediaProps {
  property?: Property;
  images: any[];
  onImageRemove: (id: string) => void;
}

export default function PropertyMediaForm({
  property,
  images,
  onImageRemove,
}: PropertyMediaProps) {
  const [deletedImages, setDeletedImages] = useState<Array<string>>([]);
  const { control } = useFormContext();

  const handleRemoveImage = (id: string) => {
    const index = deletedImages.indexOf(id);
    if (index > -1) {
      setDeletedImages((prev) => [...prev.filter((x) => x !== id)]);
    } else {
      setDeletedImages((prev) => [...prev, id]);
    }
    onImageRemove(id);
  };

  const isDeleted = (id: string) => {
    return deletedImages.indexOf(id) > -1;
  };

  return (
    <div className=' grid gap-y-5'>
      <div className='grid grid-cols-2 lg:grid-cols-4 gap-5'>
        {property &&
          property.images.map((image, index) => (
            <div
              key={index}
              className='relative bg-white dark:bg-gray-700 rounded-lg overflow-hidden'
            >
              <img
                src={image.pictureUrl}
                alt={image.publicId}
                className={`w-[200px] h-[100px] transition-all duration-200  ${
                  isDeleted(image.publicId) ? 'opacity-50' : 'opacity-100'
                }`}
              />
              <div className=' w-full flex flex-row justify-center items-center py-1 px-2 font-Primary font-thin'>
                <button
                  type='button'
                  className=' inline-flex items-center'
                  onClick={() => handleRemoveImage(image.publicId)}
                >
                  {isDeleted(image.publicId) ? (
                    <RefreshIcon className='h-5 w-5 mr-1 text-green-600' />
                  ) : (
                    <TrashIcon className='h-5 w-5 mr-1 text-red-600' />
                  )}
                  {isDeleted(image.publicId) ? 'Récupérer' : 'Supprimer'}
                </button>
              </div>
            </div>
          ))}
      </div>

      <div>
        <p className=' font-Secondary text-sm'>Charger de nouvelles photos</p>
        <div className='grid grid-cols-2 lg:grid-cols-4 gap-5 py-5'>
          {images &&
            images.map((image, index) => (
              <div
                key={index}
                className='relative bg-gray-200 rounded-lg overflow-hidden'
              >
                <img
                  src={image.preview}
                  alt={image.path}
                  className='w-[200px] h-[200px] '
                />
              </div>
            ))}

          <MediaDropZone
            className=' bg-white rounded-md drop-shadow-md'
            control={control}
            name={'images'}
            maxFiles={10}
            multiFiles
          />
        </div>
      </div>
    </div>
  );
}

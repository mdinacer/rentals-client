import { Property } from '../../models/property';
import { Image } from '../../models/image';
import ImageSliderItem from './ImageSliderItem';

interface Props {
  property: Property;
  setSelectedImage: (image: Image) => void;
}

export default function ImageSlider({ property, setSelectedImage }: Props) {
  return (
    <div className='relative grid grid-flow-col snap-start h-full'>
      {property.images.map((image) => (
        <ImageSliderItem
          key={image.publicId}
          image={image}
          handleOnClick={(image) => setSelectedImage(image)}
        />
      ))}
    </div>
  );
}

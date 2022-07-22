import { Property } from '../../models/property';
import UserPropertyCard from './UserPropertyCard';

interface Props {
  properties: Property[];
}
export default function UserPropertiesList({ properties = [] }: Props) {
  return (
    <div className='grid lg:grid-cols-2  xl:grid-cols-3 w-full gap-5 lg:px-5 '>
      {properties.map((property, index) => (
        <UserPropertyCard key={index} property={property} />
      ))}
    </div>
  );
}

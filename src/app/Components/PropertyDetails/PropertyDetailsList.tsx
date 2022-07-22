import { PropertyDetails } from '../../models/propertyDetails';
import {
  BathIcon,
  BedIcon,
  FloorIcon,
  GardenIcon,
  KitchenIcon,
  ParkingIcon,
  PoolIcon,
  RoomIcon,
} from '../Common/Icons';

interface Props {
  details: PropertyDetails;
}
export default function PropertyDetailsList({ details }: Props) {
  return (
    <div className='grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-y-3 flex-row flex-wrap gap-x-4'>
      {details.floors > 0 && (
        <ListItem icon={<FloorIcon />} title='étages' value={details.floors} />
      )}
      {details.rooms > 0 && (
        <ListItem icon={<RoomIcon />} title='pièces' value={details.rooms} />
      )}
      {details.beds > 0 && (
        <ListItem icon={<BedIcon />} title='lits' value={details.beds} />
      )}
      {details.baths > 0 && (
        <ListItem
          icon={<BathIcon />}
          title='salle de bains'
          value={details.baths}
        />
      )}
      {details.kitchens > 0 && (
        <ListItem
          icon={<KitchenIcon />}
          title='cuisines'
          value={details.kitchens}
        />
      )}
      {details.gardens > 0 && (
        <ListItem
          icon={<GardenIcon />}
          title='jardins'
          value={details.gardens}
        />
      )}
      {details.parkings > 0 && (
        <ListItem
          icon={<ParkingIcon />}
          title='Parkings'
          value={details.parkings}
        />
      )}
      {details.pools > 0 && (
        <ListItem icon={<PoolIcon />} title='piscines' value={details.pools} />
      )}
    </div>
  );
}

interface ItemProps {
  icon: JSX.Element;
  title: string;
  value: any;
}
function ListItem({ icon, title, value }: ItemProps) {
  return (
    <div className='flex flex-row items-center snap-center bg-gray-00 border-2 border-yellow-400 dark:border-indigo-400  drop-shadow-m bg-yellow-400  dark:bg-gray-900 rounded-md lg:rounded-full dark:text-white w-auto  py-0 pl-3 pr-5'>
      <div className='flex-initial py-1  fill-black dark:fill-white px-2'>
        {icon}
      </div>
      <p className='flex-auto font-Secondary text-base font-medium capitalize py-1 min-w-[5rem] '>
        {title}
      </p>
      <p className='flex-initial font-Primary text-xl font-thin uppercase  py-1 '>
        {value}
      </p>
    </div>
  );
}

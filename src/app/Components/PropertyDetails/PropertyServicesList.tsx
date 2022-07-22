import {
  AccessibilityIcon,
  AirConditionerIcon,
  ChairIcon,
  ElevatorIcon,
  GasTank,
  HeaterIcon,
  HotWaterIcon,
  PetIcon,
  SmokeFreeIcon,
  WifiIcon,
} from '../Common/Icons';
import { PropertyServices } from '../../models/propertyServices';

interface Props {
  services: PropertyServices;
}

export default function PropertyServicesList({ services }: Props) {
  return (
    <div className='overflow-x-auto scrollbar-hide snap-mandatory snap-x overscroll-x-none w-screen bg-black '>
      <div className='flex flex-row py-3 gap-x-3 snap-center w-auto px-10 lg:justify-center'>
        {services.accessibility && (
          <ListItem icon={<AccessibilityIcon />} value='Accessibilité' />
        )}
        {services.airConditioner && (
          <ListItem icon={<AirConditionerIcon />} value='Climatisation' />
        )}
        {services.elevator && (
          <ListItem icon={<ElevatorIcon />} value='Ascenseur' />
        )}
        {services.furniture && (
          <ListItem icon={<ChairIcon />} value='équipée' />
        )}
        {services.heater && (
          <ListItem icon={<HeaterIcon />} value='Chauffage' />
        )}
        {services.heater && (
          <ListItem icon={<GasTank />} value='Gaz de ville' />
        )}
        {services.hotWater && (
          <ListItem icon={<HotWaterIcon />} value='Eau chaude' />
        )}
        {services.internet && <ListItem icon={<WifiIcon />} value='Internet' />}
        {services.petsAllowed && (
          <ListItem icon={<PetIcon />} value='Animaux domestique' />
        )}
        {services.smokeFree && (
          <ListItem icon={<SmokeFreeIcon />} value='Non fumeurs' />
        )}
      </div>
    </div>
  );
}

interface ItemProps {
  icon: JSX.Element;
  value: any;
}
function ListItem({ icon, value }: ItemProps) {
  return (
    <div className='flex flex-col lg:flex-row lg:gap-x-3 justify-center items-center snap-start bg-black text-white w-auto min-w-[8rem]  lg:min-w-[10rem]'>
      <div className='py-1 fill-yellow-500 dark:fill-indigo-500'>{icon}</div>
      <p className=' font-Primary text-base lg:text-lg font-thin  uppercase py-1 '>
        {value}
      </p>
    </div>
  );
}

import { useFormContext } from 'react-hook-form';
import AppNumberInput from './NumberInput';

export default function PropertyDetailsForm() {
  const { control } = useFormContext();
  return (
    <>
      <AppNumberInput
        control={control}
        name='details.area'
        label='superficie'
      />
      <AppNumberInput control={control} name='details.floors' label='étages' />
      <AppNumberInput control={control} name='details.rooms' label='pièces' />
      <AppNumberInput control={control} name='details.beds' label='lits' />
      <AppNumberInput
        control={control}
        name='details.baths'
        label='sanitaires'
      />
      <AppNumberInput
        control={control}
        name='details.kitchens'
        label='cuisines'
      />
      <AppNumberInput
        control={control}
        name='details.gardens'
        label='jardins'
      />
      <AppNumberInput
        control={control}
        name='details.parkings'
        label='parkings'
      />
      <AppNumberInput control={control} name='details.pools' label='piscines' />
    </>
  );
}

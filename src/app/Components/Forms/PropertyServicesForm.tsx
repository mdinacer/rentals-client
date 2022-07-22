import { useFormContext } from 'react-hook-form';
import AppCheckbox from './CheckBox';

export default function PropertyServicesForm() {
  const { control } = useFormContext();
  return (
    <>
      <AppCheckbox
        control={control}
        name='services.accessibility'
        label='Accessibilités'
      />

      <AppCheckbox
        control={control}
        name='services.airConditioner'
        label='Climatisation'
      />

      <AppCheckbox
        control={control}
        name='services.elevator'
        label='Ascenseur'
      />

      <AppCheckbox
        control={control}
        name='services.furniture'
        label='équipée'
      />

      <AppCheckbox
        control={control}
        name='services.cityGas'
        label='gas de ville'
      />

      <AppCheckbox control={control} name='services.heater' label='chauffage' />
      <AppCheckbox
        control={control}
        name='services.hotWater'
        label='eau chaude'
      />

      <AppCheckbox
        control={control}
        name='services.internet'
        label='internet'
      />

      <AppCheckbox
        control={control}
        name='services.petsAllowed'
        label='animaux'
      />

      <AppCheckbox
        control={control}
        name='services.smokeFree'
        label='sans fumée'
      />
    </>
  );
}

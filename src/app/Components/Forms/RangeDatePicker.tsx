import { useFormContext } from 'react-hook-form';
import AppDatePicker from './AppDatePicker';

export default function AppRangeDatePicker() {
  const { control, setValue } = useFormContext();
  return (
    <div>
      <AppDatePicker label='Start date' control={control} name='startDate' />
      <AppDatePicker label='End date' control={control} name='endDate' />
    </div>
  );
}

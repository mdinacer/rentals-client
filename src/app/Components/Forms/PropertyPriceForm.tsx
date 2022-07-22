import { useFormContext } from 'react-hook-form';
import AppCheckbox from './CheckBox';
import AppDropDownInput from './DropDownInput';
import AppNumberInput from './NumberInput';

export default function PropertyPriceForm() {
  const { control } = useFormContext();

  const durations = [
    { title: 'Journée', value: 'day' },
    { title: 'Semaine', value: 'week' },
    { title: 'Mois', value: 'month' },
    { title: 'Année', value: 'year' },
  ];

  return (
    <>
      <AppDropDownInput
        items={durations}
        control={control}
        label={'Durée'}
        name={`price.duration`}
        initial={'day'}
        className='w-full'
      />
      <AppNumberInput
        autoComplete='price'
        min={0}
        control={control}
        label={'Prix'}
        name={`price.amount`}
        prefix='DA'
      />
      <AppCheckbox name={`price.installment`} label={'Paiement par tranches'} />
    </>
  );
}

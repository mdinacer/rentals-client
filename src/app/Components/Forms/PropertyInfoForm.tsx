import { useFormContext } from 'react-hook-form';
import AppDropDownInput from './DropDownInput';
import AppTextArea from './TextArea';
import TextInput from './TextInput';

export default function PropertyInfoForm() {
  const { control } = useFormContext();
  return (
    <>
      <div className='grid lg:grid-cols-5 gap-5 '>
        <div className='lg:col-span-2'>
          <AppDropDownInput
            label={'Type du bien'}
            items={[
              { title: 'Maison', value: 'house' },
              { title: 'Appartement', value: 'apartment' },
            ]}
            name={'type'}
            className={'w-full '}
            control={control}
          />
        </div>

        <TextInput
          control={control}
          name='title'
          placeholder='Titre'
          classes='lg:col-span-3'
        />
      </div>
      <AppTextArea
        control={control}
        name='description'
        placeholder='Description'
        rows={6}
      />
    </>
  );
}

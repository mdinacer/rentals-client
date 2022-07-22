import { XIcon } from '@heroicons/react/solid';
import { useCallback, useEffect, useState } from 'react';
import { useForm, FieldValues } from 'react-hook-form';
import agent from '../../api/agent';
import useProperties from '../../hooks/useProperties';
import { Commune, Daira, Wilaya } from '../../models/address';
import { setPropertyParams } from '../../slices/propertiesSlice';
import { useAppDispatch } from '../../store/configureStore';
import AutocompleteInput from '../Forms/AutocompleteInput';
import AppCheckbox from '../Forms/CheckBox';
import AppDropDownInput from '../Forms/DropDownInput';
import AppNumberInput from '../Forms/NumberInput';

interface Props {
  onExit: () => void;
}
type ListItem = { title: string; value: any };
export default function PropertiesFilters({ onExit }: Props) {
  const [wilayas, setWilayas] = useState<ListItem[]>([]);
  const [dairas, setDairas] = useState<ListItem[]>([]);
  const [communes, setCommunes] = useState<ListItem[]>([]);
  const { propertyParams } = useProperties();
  const dispatch = useAppDispatch();

  const {
    control,
    reset,
    setValue,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = useForm({
    mode: 'all',
  });

  async function handleSubmitData(data: FieldValues) {
    dispatch(setPropertyParams(data));
    onExit();
  }

  async function handleResetData() {
    reset(initialData);
    dispatch(setPropertyParams(initialData));
    //onExit();
  }

  const fetchWilayas = useCallback(async () => {
    const result = await agent.Address.listWilayas();
    setWilayas(
      result.map((wilaya: Wilaya) => ({
        title: wilaya.name,
        value: wilaya.id,
      }))
    );
  }, []);

  const fetchDairas = useCallback(async (wilayaId: string) => {
    const result = await agent.Address.listDairas(wilayaId);
    setDairas(
      result.map((daria: Daira) => ({ title: daria.name, value: daria.id }))
    );
  }, []);

  const fetchCommunes = useCallback(async (dairaId: string) => {
    const result = await agent.Address.listCommunes(dairaId);
    setCommunes(
      result.map((communes: Commune) => ({
        title: communes.name,
        value: communes.id,
      }))
    );
  }, []);

  useEffect(() => {
    if (wilayas.length <= 0) {
      fetchWilayas();
    }
  }, [fetchWilayas, wilayas.length]);

  const handleSelectWilaya = (item: any) => {
    setValue('daira', '');
    fetchDairas(item.value);
  };

  const handleSelectDaira = (item: any) => {
    setValue('commune', '');
    fetchCommunes(item.value);
  };

  useEffect(() => {
    if (propertyParams) {
      reset(propertyParams);
    }
  }, [propertyParams, reset]);

  return (
    <form
      onSubmit={handleSubmit(handleSubmitData)}
      className='w-full max-h-screen flex-auto flex flex-col gap-2 overflow-auto bg-gradient-to-br from-gray-300 to-gray-50 dark:from-slate-800 dark:to-slate-900 py-5'
    >
      <div className='relative w-full inline-flex justify-between items-center flex-initial px-5'>
        <p className='font-Primary text-3xl font-thin uppercase'>Filtres</p>
        <button
          className=' inline-flex gap-x-1 items-center py-1 px-2 rounded-md'
          onClick={onExit}
        >
          <XIcon className='h-6 w-6' />
        </button>
      </div>

      <div className='overflow-y-auto flex-auto'>
        <div className='grid gap-y-3  h-auto'>
          <div className=' px-5 grid gap-y-5'>
            <AppDropDownInput
              autoComplete='type'
              type='text'
              control={control}
              label='Type du bien'
              initial={propertyParams.type || ''}
              name='type'
              className='w-full'
              items={[
                { title: 'Afficher tout', value: '' },
                { title: 'Maison', value: 'house' },
                { title: 'Apartment', value: 'apartment' },
              ]}
            />

            <div className='grid gap-y-2'>
              <AutocompleteInput
                control={control}
                label='Wilaya'
                items={wilayas}
                handleSelect={handleSelectWilaya}
                name={'wilaya'}
                returnTitle
              />

              <AutocompleteInput
                control={control}
                returnTitle
                label='Daira'
                items={dairas}
                name='daira'
                handleSelect={handleSelectDaira}
              />

              <AutocompleteInput
                control={control}
                returnTitle
                label='Commune'
                items={communes}
                name='commune'
              />
            </div>

            <AppNumberInput
              autoComplete='rooms'
              control={control}
              initial={propertyParams.rooms || 0}
              label='Nombre de pièces'
              name='details.rooms'
            />

            <AppNumberInput
              autoComplete='minPrice'
              control={control}
              label='Prix MIN'
              initial={propertyParams.minPrice || 0}
              name='minPrice'
            />

            <AppNumberInput
              autoComplete='maxPrice'
              control={control}
              label='Prix MAX'
              name='maxPrice'
              initial={propertyParams.maxPrice || 0}
            />
          </div>
          <div className='grid grid-cols-1 gap-4 py-5 px-5'>
            <AppCheckbox
              control={control}
              name='services.accessibility'
              label='Accessibilité'
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
              label='Gaz de ville'
            />

            <AppCheckbox
              control={control}
              name='services.heater'
              label='Chauffage'
            />
            <AppCheckbox
              control={control}
              name='services.hotWater'
              label='Eau chaude'
            />

            <AppCheckbox
              control={control}
              name='services.internet'
              label='Internet'
            />

            <AppCheckbox
              control={control}
              name='services.petsAllowed'
              label='Animaux domestique'
            />

            <AppCheckbox
              control={control}
              name='services.smokeFree'
              label='Non fumeurs'
            />
          </div>

          {/* <Collapsible
            title='Services'
            className='bg-gradient-to- bg-yellow-500 to-yellow-600 dark:from-indigo-500 dark:to-indigo-700   mt-0'
          ></Collapsible> */}
        </div>
      </div>

      <div className=' w-full flex flex-row justify-around items-center gap-x-2  flex-initial px-5'>
        <input
          disabled={isSubmitting || !isValid}
          type='submit'
          value='Filter'
          className={buttonStyle}
        />
        <button
          disabled={isSubmitting}
          type='button'
          onClick={handleResetData}
          className={buttonStyle}
        >
          Reset
        </button>
      </div>
    </form>
  );
}

const buttonStyle =
  'py-1 bg-gray-900 text-white w-full font-Primary text-lg font-thin uppercase cursor-pointer';

const initialData = {
  type: '',
  wilaya: '',
  daira: '',
  commune: '',
  rooms: 0,
  minPrice: 0,
  maxPrice: 0,
  services: {
    accessibility: false,
    airConditioner: false,
    cityGas: false,
    elevator: false,
    furniture: false,
    heater: false,
    hotWater: false,
    internet: false,
    petsAllowed: false,
    smokeFree: false,
  },
};

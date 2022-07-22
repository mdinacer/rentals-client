import { FieldValues, useForm } from 'react-hook-form';
import agent from '../../api/agent';
import { Property } from '../../models/property';
import AppDatePicker from './AppDatePicker';

interface Props {
  property: Property;
  onExit: (value?: any) => void;
}
export default function PropertyAvailabilityForm({ property, onExit }: Props) {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    mode: 'all',
  });

  async function handleSubmitData(data: FieldValues) {
    console.log(data);
    try {
      if (property) {
        const result = await agent.Properties.availability(property.id, {
          available: !property.available,
          availableFrom: property.available ? data.availableFrom : null,
        });

        onExit(result);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <form onSubmit={handleSubmit(handleSubmitData)}>
      {property.available ? (
        <>
          <p className=' font-Secondary text-center text-sm mb-3 italic'>
            Veuillez préciser la date de disponibilité
          </p>
          <AppDatePicker
            control={control}
            label={'Date de disponibilité'}
            name={'availableFrom'}
          />
        </>
      ) : (
        <div>
          <p className=' font-Secondary text-center'>
            Cette action va changer le status de la propriété à{' '}
            <span className=' font-semibold uppercase'> "Disponible"</span>.
            Voulez vous continuer?
          </p>
        </div>
      )}

      <div className=' flex flex-row items-center justify-center gap-x-5 mt-7'>
        <input
          disabled={isSubmitting}
          type='submit'
          value='Valider'
          className={
            buttonStyle + ' bg-yellow-500 dark:bg-indigo-500 rounded-md'
          }
        />
        <input
          type='button'
          value='Annuler'
          onClick={onExit}
          className={buttonStyle + ' bg-gray-300 dark:bg-gray-900 rounded-md'}
        />
      </div>
    </form>
  );
}

const buttonStyle = 'py-1 px-5 font-Primary font-thin uppercase cursor-pointer';

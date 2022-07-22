import { useController, UseControllerProps } from 'react-hook-form';

interface Props extends UseControllerProps {
  label: string;
  autoComplete?: string | undefined;
  min?: number;
  horizontal?: boolean;
  prefix?: string;
  initial?: number;
}

export default function AppNumberInput(props: Props) {
  const { fieldState, field } = useController({
    ...props,
    defaultValue: props.initial || 0,
  });

  return (
    <div className={`overflow-hidden flex  flex-col  gap-x-3`}>
      <div
        className={`flex flex-row items-center border pl-5 border-gray-400 focus:border-gray-400 ${
          fieldState.error
            ? 'border-red-400 focus:border-red-400'
            : 'border-gray-400 focus:border-gray-400'
        } `}
      >
        <p className='text-sm text-slate-600 dark:text-gray-100 whitespace-nowrap first-letter:uppercase min-w-[4rem] flex-initial'>
          {props.label}
        </p>
        <input
          className={` focus:outline-none min-w-[6rem] appearance-none border-none text-center lg:text-right  border-gray-400 focus:border-none bg-transparent py-1 pr-3 flex-auto form-input font-Secondary placeholder:capitalize placeholder:text-gray-400 w-full `}
          aria-label={props.label}
          type={'number'}
          min={props.min || 0}
          {...props}
          {...field}
        />
        {props.prefix && (
          <p className='text-base flex-initial whitespace-nowrap lg:text-sm pl-2  dark:text-gray-300 px-5'>
            {props.prefix}
          </p>
        )}
      </div>
      {fieldState.error && (fieldState.isDirty || fieldState.isTouched) && (
        <div className='py-1 w-full'>
          <p className={`w-full text-sm text-red-500 first-letter:uppercase `}>
            {fieldState.error.message}
          </p>
        </div>
      )}
    </div>
  );
}

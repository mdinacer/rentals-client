import { useController, UseControllerProps } from 'react-hook-form';

interface Props extends UseControllerProps {
  label: string;
  placeholder: string;
  autoComplete?: string | undefined;
}

export default function AppPasswordInput(props: Props) {
  const { fieldState, field } = useController({ ...props, defaultValue: '' });

  return (
    <div className={`w-full overflow-hidden flex flex-col`}>
      <div className='py-1'>
        <p className='text-sm text-slate-600 dark:text-gray-100 capitalize'>
          {props.label}
        </p>
      </div>
      <input
        className={`form-input border border-gray-400 focus:border-gray-400 focus:outline-none  focus:border  bg-transparent py-2 px-5 font-Secondary placeholder:capitalize placeholder:text-gray-400 w-full ${
          fieldState.error
            ? 'border-red-400 focus:border-red-400'
            : 'border-gray-400 focus:border-gray-400'
        }`}
        aria-label={props.label}
        type={'password'}
        {...props}
        {...field}
      />
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

import { useController, UseControllerProps } from 'react-hook-form';

interface Props extends UseControllerProps {
  label?: string;
  type?: string;
  placeholder: string;
  autoComplete?: string | undefined;
  initial?: string;
  classes?: string;
}

export default function AppTextInput(props: Props) {
  const { fieldState, field } = useController({
    ...props,
    defaultValue: props.initial || '',
  });

  return (
    <div
      className={`${props.classes} overflow-hidden flex flex-col items-start `}
    >
      {props.label && (
        <div className='py-1'>
          <p className='text-sm text-slate-600 dark:text-gray-100 capitalize'>
            {props.label}
          </p>
        </div>
      )}
      <input
        className={`form-input autofill:text-white autofill:bg-red-500 dark:autofill:text-white border border-gray-400 focus:border-gray-400 focus:outline-none  focus:border  bg-transparent py-1 px-5 font-Secondary placeholder:first-letter:uppercase placeholder:text-gray-400 w-full  ${
          fieldState.error
            ? 'border-red-400 focus:border-red-400'
            : 'border-gray-400 focus:border-gray-400'
        }`}
        aria-label={props.label}
        type={props.type}
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

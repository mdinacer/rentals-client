import { useController, UseControllerProps } from 'react-hook-form';

interface Props extends UseControllerProps {
  label?: string;
  type?: string;
  placeholder: string;
  autoComplete?: string | undefined;
  initial?: string;
  rows?: number;
}

export default function AppTextArea(props: Props) {
  const { fieldState, field } = useController({
    ...props,
    defaultValue: props.initial || '',
  });

  return (
    <div className={`w-full overflow-hidden flex flex-col`}>
      {props.label && (
        <div className='py-1'>
          <p className='text-sm text-slate-600 dark:text-gray-100 capitalize'>
            {props.label}
          </p>
        </div>
      )}
      <textarea
        rows={props.rows || 3}
        className={`resize-none focus:outline-none border bg-transparent py-2 px-5 flex-auto form-input font-Secondary placeholder:capitalize placeholder:text-gray-400 w-full  ${
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

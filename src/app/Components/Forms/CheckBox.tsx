import { CheckIcon } from '@heroicons/react/solid';
import { UseControllerProps, useController } from 'react-hook-form';

interface Props extends UseControllerProps {
  label: string;
  isChecked?: boolean;
  className?: string;
}

export default function AppCheckbox(props: Props) {
  const { field } = useController({
    ...props,
    defaultValue: false,
  });
  return (
    <label
      className={
        'pl-5 inline-flex items-center justify-start gap-x-2  cursor-pointer border border-gray-400 focus:border-gray-400 ' +
        props.className +
        `${field.value === true ? ' opacity-100' : ' opacity-60'}`
      }
    >
      <p className='flex-auto font-Secondary text-sm first-letter:uppercase text-inherit dark:text-gray-300'>
        {props.label}
      </p>
      <input
        className={`form-checkbox hidden appearance-none`}
        aria-label={props.label}
        type={'checkbox'}
        {...props}
        {...field}
      />
      <div
        className={` flex items-center justify-center transition-all duration-300 px-2 py-1`}
      >
        <CheckIcon
          className={`h-6 w-6   ${
            field.value === true ? ' opacity-100' : ' opacity-20'
          }`}
        />
      </div>
    </label>
  );
}

interface Props {
  title: string;
  children: JSX.Element | JSX.Element[];
  className?: string;
}

export default function PropertyDetailsSection({
  title,
  children,
  className,
}: Props) {
  return (
    <div className={`${className} w-full`}>
      <p className=' font-Secondary text-xl mb-2'>{title}</p>
      {children}
    </div>
  );
}

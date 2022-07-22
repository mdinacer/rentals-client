import { ReactElement } from 'react';

interface Props {
  children: React.ReactElement | ReactElement[];
  className?: string;
}

export default function Layout({ children, className }: Props) {
  return (
    <div className={`${className} min-h-screen w-screen pt-[44px]`}>
      {children}
    </div>
  );
}

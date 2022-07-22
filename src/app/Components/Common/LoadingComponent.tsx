interface Props {
  message?: string;
}

export default function LoadingComponent({ message = 'Loading' }: Props) {
  return (
    <div className='fixed top-0 z-30 left-0 right-0 bottom-0 bg-sky-500 dark:bg-indigo-500 w-screen h-screen flex items-center justify-center'>
      <div className='h-auto flex items-center flex-col'>
        <div className='relative h-20 w-20 mx-auto'>
          <div
            className={`${styles.baseStyle} ${styles.outer} animate-spin-slow`}
          ></div>
          <div
            className={`${styles.baseStyle} ${styles.middle} animate-spin-slow-reverse `}
          ></div>
          <div
            className={`${styles.baseStyle} ${styles.inner} animate-spin-normal`}
          ></div>
        </div>
        <p className=' font-Primary text-2xl font-thin text-center lg:text-5xl py-10 text-white uppercase'>
          {message}
        </p>
      </div>
    </div>
  );
}

const styles = {
  baseStyle: `border-[5px] border-transparent border-solid border-t-indigo-500 border-r-indigo-500 dark:border-t-indigo-500 dark:border-r-sky-500 rounded-[50%] absolute top-1/2 left-1/2`,
  outer: `w-[5.5rem] h-[5.5rem] ml-[-1.75em] mt-[-1.75em]`,
  middle: `w-[4.1rem] h-[4.1rem] ml-[-1.05em] mt-[-1.05em]`,
  inner: `w-[2.8rem] h-[2.8rem] ml-[-0.4em] mt-[-0.4em]`,
};

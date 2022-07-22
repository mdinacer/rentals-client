interface Props {
  price: number;
  paid: number;
}

export default function PricesDetails({ price, paid }: Props) {
  const styles = {
    title:
      'font-Primary text-2xl uppercase font-thin mb-3 border-b dark:border-b-white opacity-70',
    itemsContainer: 'flex-auto flex flex-col lg:flex-col gap-x-5 gap-y-2',
    itemWrapper:
      'flex lg:flex-row w-full justify-between items-end lg:items-center',
    itemTitle: 'font-Primary font-thin text-lg uppercase mr-3 min-w-[5rem]',
    itemContent: 'font-Secondary font-base text-xl',
  };
  return (
    <div className=' flex flex-col '>
      <p className={styles.title}>Price</p>
      <div className={styles.itemsContainer}>
        <div className={styles.itemWrapper}>
          <p className={styles.itemTitle}>Price</p>
          <p className={styles.itemContent}>
            <span>{price.toFixed(2)}</span>
            <span className=' text-sm'>{' DA'}</span>
          </p>
        </div>

        <div className={styles.itemWrapper}>
          <p className={styles.itemTitle}>Paid</p>
          <p className={styles.itemContent}>
            <span>{paid.toFixed(2)}</span>{' '}
            <span className=' text-sm'>{' DA'}</span>
          </p>
        </div>

        <div className={styles.itemWrapper}>
          <p className={styles.itemTitle}>Remain</p>
          <p className={styles.itemContent}>
            <span>{(price - paid).toFixed(2)}</span>
            <span className=' text-sm'>{' DA'}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

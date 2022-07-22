import { useEffect } from 'react';
import { rentSelectors, fetchRentsAsync } from '../slices/rentsSlice';
import { useAppSelector, useAppDispatch } from '../store/configureStore';

export default function useRents() {
  const rents = useAppSelector(rentSelectors.selectAll);
  const { rentsLoaded, metaData } = useAppSelector((state) => state.rents);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!rentsLoaded) {
      dispatch(fetchRentsAsync());
    }
  }, [dispatch, rentsLoaded]);
  return {
    rents,
    rentsLoaded,
    metaData,
  };
}

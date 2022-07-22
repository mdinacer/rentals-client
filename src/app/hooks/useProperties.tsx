import { useEffect } from 'react';
import {
  propertySelectors,
  fetchPropertiesAsync,
} from '../slices/propertiesSlice';
import { useAppSelector, useAppDispatch } from '../store/configureStore';

export default function useProperties() {
  const properties = useAppSelector(propertySelectors.selectAll);
  const { propertiesLoaded, metaData, propertyParams } = useAppSelector(
    (state) => state.properties
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!propertiesLoaded) {
      dispatch(fetchPropertiesAsync());
    }
  }, [dispatch, properties, propertiesLoaded]);
  return {
    properties,
    propertyParams,
    propertiesLoaded,
    metaData,
  };
}

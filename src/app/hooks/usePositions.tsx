import { useState } from 'react';
import agent from '../api/agent';
import { LocationAddress, LocationData } from '../models/locationAddress';

type coordsType = {
  long: number;
  lat: number;
};

export default function usePositions() {
  const [busy, setBusy] = useState(false);

  const [serviceState, setServiceState] = useState<{
    message: string;
    severity: 'warning' | 'info' | 'error' | 'success';
  } | null>(null);

  const queryLocationPermission = async () => {
    try {
      const result = await navigator.permissions.query({
        name: 'geolocation',
      });

      if (result) {
        switch (result.state) {
          case 'prompt':
            setServiceState({
              message:
                'A popup message will ask you to allow geolocation in your browser, ' +
                'click allow to add your actual position',
              severity: 'warning',
            });
            break;
          case 'denied':
            alert('Geolocation denied');
            setServiceState({
              message:
                'Geolocation is disabled, you need to enable it to add an address.',
              severity: 'error',
            });
            break;
          case 'granted':
            setServiceState(null);
            break;
        }
      } else {
        setServiceState({
          message: 'No Geolocation.',
          severity: 'error',
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  function getCoordinates() {
    return new Promise<coordsType>(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition((position) => {
        const data = {
          long: position.coords.longitude,
          lat: position.coords.latitude,
        };
        resolve(data);
      }, reject);
    });
  }

  const fetchReverseGeolocation = async (
    lon: number,
    lat: number,
    lang?: string
  ) => {
    try {
      const result: LocationData = await agent.Location.getLocation(
        lat,
        lon,
        lang
      );

      const data: LocationAddress = {
        ...result.address,
        longitude: result.lon,
        latitude: result.lat,
      };
      setServiceState({
        message:
          'If the position is not correct, try again until you get the correct result.',
        severity: 'info',
      });

      return data;
    } catch (error) {
      console.log(error);
    }
  };

  async function getCurrentLocation(lang?: string) {
    try {
      setBusy(true);
      setServiceState({
        message: 'Requesting Geolocation.',
        severity: 'info',
      });
      await queryLocationPermission();

      const coords: coordsType = await getCoordinates();

      const result = await fetchReverseGeolocation(
        coords.long,
        coords.lat,
        lang
      );
      return result;
    } catch (error) {
      console.log(error);
    } finally {
      setBusy(false);
    }
  }

  return {
    busy,
    serviceState,
    getCurrentLocation,
  };
}

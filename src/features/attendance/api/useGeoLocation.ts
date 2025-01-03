import { useState, useEffect } from 'react';
import { Geolocation } from '@capacitor/geolocation';

interface Coordinates {
  latitude: number | undefined;
  longitude: number | undefined;
}

interface ErrorData {
  code: number;
  message: string;
}

interface LocationData {
  loaded: boolean;
  coordinates?: Coordinates;
  error?: ErrorData;
}

export const useGeoLocation = (): LocationData => {
  const [location, setLocation] = useState<LocationData>({
    loaded: false,
    coordinates: { latitude: 0, longitude: 0 },
  });

  useEffect(() => {
    let watchId: string;

    const setWatchPosition = async () => {
      watchId = await Geolocation.watchPosition({}, (position, error) => {
        if (error) {
          setLocation({
            loaded: true,
            error: {
              code: error.code,
              message: error.message,
            },
          });
        } else if (position) {
          setLocation({
            loaded: true,
            coordinates: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            },
          });
        }
      });
    };

    setWatchPosition();

    // Cleanup function to stop watching position when the component unmounts
    return () => {
      if (watchId) {
        Geolocation.clearWatch({ id: watchId });
      }
    };
  }, []);

  return location;
};

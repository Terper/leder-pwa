import React, { ReactElement, useEffect } from 'react';
import { GoogleMap, useLoadScript, Polyline } from '@react-google-maps/api';
import './Map.css';
import Spinner from '../Spinner/Spinner';

interface point {
  lat: number;
  lng: number;
}

interface Props {
  points: point[];
}

const polylineOptions = {
  strokeColor: '#FF7F00',
  strokeOpacity: 0.8,
  strokeWeight: 4,
  fillColor: '#FF7F00',
  fillOpacity: 0.35,
  clickable: false,
  draggable: false,
  editable: false,
  visible: true,
  radius: 30000,
  zIndex: 1
};

function Map({ points }: Props): ReactElement {
  const { isLoaded, loadError } = useLoadScript({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyDrrVxT_wh6VnfVcl2FeSDOke7LAHAFzn4',
    preventGoogleFontsLoading: false
  });

  useEffect(() => {}, []);

  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>;
  }
  // coordinated need to be numbers like -34.397
  return isLoaded ? (
    <GoogleMap
      mapContainerClassName='mapContainer'
      zoom={16}
      center={points[0]}
    >
      <Polyline path={points} options={polylineOptions} />
    </GoogleMap>
  ) : (
    <Spinner />
  );
}

export default Map;

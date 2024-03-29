import React, { ReactElement, useState, useEffect } from 'react';
import './SpecificRoute.css';
import { Link, useParams } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';
import Map from '../Map/Map';

export default function SpecificRoute(): ReactElement {
  const [item, setItem] = useState<any>();
  const [isLoaded, setIsLoaded] = useState(false);
  const [processError, setProcessError] = useState(false);
  const { routeId }: any = useParams();
  let hasPoints = false;
  useEffect(() => {
    fetch('https://leder-api.herokuapp.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        query: `{ route (id: "${routeId}") { id name author image imageAttribution points { lat lng } description} }`
      })
    })
      .then((r) => r.json())
      .then((data) => {
        setItem(data.data.route);
        setIsLoaded(true);
      })
      .catch((e) => {
        setProcessError(true);
      });
  }, [routeId]);

  if (processError) {
    return (
      <div className='error'>
        <h2>Något gick fel</h2>
        <Link to='/'>Tillbaka till start</Link>
      </div>
    );
  }

  if (!isLoaded) {
    return <Spinner />;
  }

  interface point {
    lat: number;
    lng: number;
  }
  let points: point[] = [];
  if (item.points) {
    item.points.forEach((point: any) => {
      points.push({ lat: Number(point.lat), lng: Number(point.lng) });
    });
    hasPoints = true;
  }

  return (
    <>
      <Link to='/' className='back'>
        <i className='gg-arrow-left' />
      </Link>
      <img src={item.image} alt='' />
      <p className='imageAttribution'>Bild av {item.imageAttribution}</p>
      <section>
        <h1>{item.name}</h1>
        Av {item.author}
        <div dangerouslySetInnerHTML={{ __html: item.description }}></div>
      </section>
      {hasPoints ? <Map points={points}></Map> : <></>}
    </>
  );
}

import React, { ReactElement, useState, useEffect } from 'react';
import './SpecificRoute.css';
import { Link, useParams } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';
import Map from '../Map/Map';

export default function SpecificRoute(): ReactElement {
  const [item, setItem] = useState<any>();
  const [isLoaded, setIsLoaded] = useState(false);
  const { routeId }: any = useParams();
  let hasPoints = false;
  useEffect(() => {
    fetch('http://localhost:4000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        query: `{ route (id: "${routeId}") { id name author image points { lat lng } description} }`
      })
    })
      .then((r) => r.json())
      .then((data) => {
        setItem(data.data.route);
        setIsLoaded(true);
      });
  }, [routeId]);
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
      <section>
        <h1>{item.name}</h1>
        Av {item.author}
        <div dangerouslySetInnerHTML={{ __html: item.description }}></div>
      </section>
      {hasPoints ? <Map points={points}></Map> : <></>}
    </>
  );
}

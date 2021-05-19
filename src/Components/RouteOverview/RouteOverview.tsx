import React, { ReactElement, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';
import RouteCard from '../RouteCard/RouteCard';

interface Data {
  author: string;
  description: string;
  id: string;
  name: string;
  image: string;
}

function RouteOverview(): ReactElement {
  const [items, setItems] = useState<any>();
  const [isLoaded, setIsLoaded] = useState(false);
  const [processError, setProcessError] = useState(false);

  useEffect(() => {
    fetch('https://leder-api.herokuapp.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        query: '{ routes { id name author image } }'
      })
    })
      .then((r) => r.json())
      .then((data) => {
        setItems(data.data.routes);
        setIsLoaded(true);
      })
      .catch((e) => {
        setProcessError(true);
      });
  }, []);

  if (processError) {
    return (
      <div className='error'>
        <h2>Något gick fel</h2>
        <Link to='/'>Gå tillbaka till start</Link>
        <p>
          eller kontakta{' '}
          <a href='mailto:jann.totterman@gmail.com'>jann.totterman@gmail.com</a>
        </p>
      </div>
    );
  }

  if (!isLoaded) {
    return <Spinner />;
  }

  return (
    <>
      {items.map((item: Data) => {
        return <RouteCard data={item} key={item.id} />;
      })}
    </>
  );
}

export default RouteOverview;

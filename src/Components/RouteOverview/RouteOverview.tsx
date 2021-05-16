import React, { ReactElement, useEffect, useState } from 'react';
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
  useEffect(() => {
    fetch('http://localhost:4000/graphql', {
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
      });
  }, []);

  return (
    <>
      {isLoaded ? (
        items.map((item: Data) => {
          return <RouteCard data={item} key={item.id} />;
        })
      ) : (
        <Spinner />
      )}
    </>
  );
}

export default RouteOverview;

import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import './RouteCard.css';

interface Data {
  id: string;
  name: string;
  image: string;
}

interface Props {
  data: Data;
}

function RouteCard({ data }: Props): ReactElement {
  return (
    <Link to={`/led/${data.id}`} className='RouteCard'>
      <img src={data.image} alt={`Bild på led ${data.name}`}></img>
      <h1>{data.name}</h1>
    </Link>
  );
}
export default RouteCard;

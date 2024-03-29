import React, { ReactElement } from 'react';
import './Spinner.css';

export default function Spinner(): ReactElement {
  return (
    <div className='spinner'>
      <i className='gg-spinner-two-alt'></i>
    </div>
  );
}

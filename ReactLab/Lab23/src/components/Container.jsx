import React from 'react';
import './css/Container.css';

function Container({ children }) {
  return <div className="container">{children}</div>;
}

export default Container;
import React from 'react';
import './css/Button.css';

function Button({ onClick, children }) {
  return (
    <button className="custom-button" onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
import React from 'react';

const Spinner = () => (
  <div className="text-center my-4">
    <div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
    <p className="mt-2">Загрузка данных...</p>
  </div>
);

export default Spinner;
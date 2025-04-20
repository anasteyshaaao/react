import React, { useState } from 'react';

const TestModeController = ({ testMode, onTestModeChange }) => {
  const handleToggle = () => {
    onTestModeChange({
      ...testMode,
      active: !testMode.active,
      isLoading: !testMode.active ? false : testMode.isLoading,
      isError: !testMode.active ? false : testMode.isError
    });
  };

  const handleStateChange = (key) => {
    onTestModeChange({
      ...testMode,
      [key]: !testMode[key]
    });
  };

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title">Тестовый режим</h5>
        <button 
          onClick={handleToggle}
          className={`btn btn-sm ${testMode.active ? 'btn-danger' : 'btn-outline-secondary'} mb-3`}
        >
          {testMode.active ? 'Выключить тестовый режим' : 'Включить тестовый режим'}
        </button>
        
        {testMode.active && (
          <div className="row g-2">
            <div className="col-md-4">
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={testMode.isLoading}
                  onChange={() => handleStateChange('isLoading')}
                  id="loadingSwitch"
                />
                <label className="form-check-label" htmlFor="loadingSwitch">
                  Имитировать загрузку
                </label>
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={testMode.isError}
                  onChange={() => handleStateChange('isError')}
                  id="errorSwitch"
                />
                <label className="form-check-label" htmlFor="errorSwitch">
                  Имитировать ошибку
                </label>
              </div>
            </div>
           
          </div>
        )}
      </div>
    </div>
  );
};

export default TestModeController;
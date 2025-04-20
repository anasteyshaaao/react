import React, { useState, useContext } from 'react';
import { ThemeContext } from './ThemeContext';
import { useGetFeedbacksQuery } from './adminApi';
import { useSelector } from 'react-redux';
import TestModeController from './TestModeController';

const FeedbackCard = ({ feedback, isDarkTheme }) => (
  <div className="col-md-4 mb-3">
    <div className={`card h-100 ${isDarkTheme ? 'bg-secondary text-white' : ''}`}>
      <div className="card-body">
        <h5 className="card-title">{feedback.name}</h5>
        <p className="card-text">{feedback.feedback}</p>
        <small className={isDarkTheme ? 'text-light' : 'text-muted'}>
          {new Date(feedback.date).toLocaleString()}
        </small>
      </div>
    </div>
  </div>
);

const Footer = () => {
  const [testMode, setTestMode] = useState({
    active: false,
    isLoading: false,
    isError: false,
    isEmpty: false
  });
  const { isDarkTheme } = useContext(ThemeContext);
  
  // Проверяем авторизацию и права администратора
  const { isLoggedIn, isAdmin } = useSelector(state => state.auth);

  // Реальные данные через RTK Query
  const { 
    data: feedbacks = [], 
    isLoading: isFeedbacksLoading,
    isFetching: isFeedbacksFetching,
    isError: isFeedbacksError,
    error: feedbacksError,
    refetch: refetchFeedbacks
  } = useGetFeedbacksQuery(undefined, {
    skip: !isLoggedIn // Пропускаем запрос если пользователь не авторизован
  });

  // Тестовые данные (теперь 3 элемента для демонстрации)
  const testFeedbacks = [
    { id: 1, name: "Тестовый пользователь 1", feedback: "Тестовый отзыв 1", date: new Date().toISOString() },
    { id: 2, name: "Тестовый пользователь 2", feedback: "Тестовый отзыв 2", date: new Date().toISOString() },
    { id: 3, name: "Тестовый пользователь 3", feedback: "Тестовый отзыв 3", date: new Date().toISOString() }
  ];

  const handleRetry = () => {
    refetchFeedbacks();
  };

  // Определение состояний в зависимости от режима
  const getState = () => {
    if (!testMode.active) {
      return {
        isLoading: isFeedbacksLoading,
        isFetching: isFeedbacksFetching,
        isError: isFeedbacksError,
        error: feedbacksError,
        feedbacks
      };
    }
    
    return {
      isLoading: testMode.isLoading,
      isFetching: false,
      isError: testMode.isError,
      error: { message: "Тестовая ошибка загрузки отзывов" },
      feedbacks: testMode.isEmpty ? [] : [...testFeedbacks] // Используем копию массива
    };
  };

  const {
    isLoading,
    isFetching,
    isError,
    error,
    feedbacks: displayFeedbacks
  } = getState();

  // Не отображаем футер если пользователь не авторизован
  if (!isLoggedIn) {
    return null;
  }

  return (
    <footer className={`py-4 ${isDarkTheme ? 'bg-dark text-light' : 'bg-light text-dark'}`}>
      <div className="container">
        <div className="feedback-section">
          <h3 className="mb-4 text-center">Отзывы пользователей</h3>

          {/* Тестовая панель управления (только в development и для админов) */}
          {process.env.NODE_ENV === 'development' && isAdmin && (
            <TestModeController 
              testMode={testMode}
              onTestModeChange={setTestMode}
            />
          )}

          {/* Индикатор загрузки */}
          {isLoading && (
            <div className="text-center my-4">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Загрузка...</span>
              </div>
              <p className="mt-2">Загрузка отзывов...</p>
            </div>
          )}

          {/* Сообщение об ошибке */}
          {isError && (
            <div className={`alert ${isDarkTheme ? 'alert-dark' : 'alert-danger'} d-flex justify-content-between align-items-center`}>
              <div>
                Ошибка: {error?.message || 'Неизвестная ошибка'}
              </div>
              <button 
                className="btn btn-sm btn-outline-danger"
                onClick={handleRetry}
              >
                Повторить
              </button>
            </div>
          )}

          {/* Отображение отзывов */}
          {!isLoading && !isError && (
            <div className="row">
              {displayFeedbacks.length > 0 ? (
                displayFeedbacks.map(feedback => (
                  <FeedbackCard 
                    key={feedback.id} 
                    feedback={feedback} 
                    isDarkTheme={isDarkTheme} 
                  />
                ))
              ) : (
                <div className="col-12">
                  <div className={`alert ${isDarkTheme ? 'alert-dark' : 'alert-info'}`}>
                    Нет отзывов для отображения
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Индикатор фонового обновления */}
          {isFetching && !isLoading && (
            <div className="text-center text-muted mt-2">
              <small>Обновление отзывов...</small>
            </div>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
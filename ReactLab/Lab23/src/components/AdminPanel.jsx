import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AdminUsersTable from './AdminUsersTable';
import AdminFeedbacksTable from './AdminFeedbacksTable';
import TestModeController from './TestModeController';
import { 
  useGetFeedbacksQuery, 
  useDeleteFeedbackMutation,
  useGetUsersQuery
} from './adminApi';

const Spinner = ({ message = 'Загрузка данных...' }) => (
  <div className="text-center my-4">
    <div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
    <p>{message}</p>
  </div>
);

const AdminPanel = () => {
  const navigate = useNavigate();
  const { userName, isAdmin } = useSelector(state => state.auth);
  const [testMode, setTestMode] = useState({
    active: false,
    isLoading: false,
    isError: false,
    isEmpty: false
  });
  
  // Реальные запросы
  const { 
    data: feedbacks = [], 
    isLoading: isFeedbacksLoading,
    isFetching: isFeedbacksFetching,
    isError: isFeedbacksError,
    error: feedbacksError,
    refetch: refetchFeedbacks
  } = useGetFeedbacksQuery();
  
  const { 
    data: users = [], 
    isLoading: isUsersLoading,
    isFetching: isUsersFetching,
    isError: isUsersError,
    error: usersError,
    refetch: refetchUsers
  } = useGetUsersQuery();
  
  // Тестовые данные
  const testFeedbacks = [
    { id: 1, name: "Тестовый пользователь", feedback: "Тестовый отзыв", date: new Date().toISOString() }
  ];
  
  const testUsers = [
    { id: 1, name: "Тестовый админ", email: "test@admin.com", isBlocked: false, isAdmin: true }
  ];

  React.useEffect(() => {
    if (!isAdmin) navigate('/');
  }, [isAdmin, navigate]);

  const handleRetry = () => {
    if (isFeedbacksError) refetchFeedbacks();
    if (isUsersError) refetchUsers();
  };

  // Определение состояний в зависимости от режима
  const getState = () => {
    if (!testMode.active) {
      return {
        isLoading: isFeedbacksLoading || isUsersLoading,
        isFetching: isFeedbacksFetching || isUsersFetching,
        isError: isFeedbacksError || isUsersError,
        error: feedbacksError || usersError,
        feedbacks,
        users
      };
    }
    
    return {
      isLoading: testMode.isLoading,
      isFetching: false,
      isError: testMode.isError,
      error: { message: "Тестовая ошибка: Сервер недоступен" },
      feedbacks: testMode.isEmpty ? [] : testFeedbacks,
      users: testMode.isEmpty ? [] : testUsers
    };
  };

  const {
    isLoading,
    isFetching,
    isError,
    error,
    feedbacks: displayFeedbacks,
    users: displayUsers
  } = getState();

  if (!isAdmin) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">
          У вас нет прав доступа к админ-панели
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Админ-панель</h1>
      
      {/* Тестовая панель управления */}
      {process.env.NODE_ENV === 'development' && (
        <TestModeController 
          testMode={testMode}
          onTestModeChange={setTestMode}
        />
      )}

      <div className="card mb-4">
        <div className="card-body">
          <h2 className="card-title">Добро пожаловать, {userName}!</h2>
          <p className="card-text">
            Вы вошли как администратор системы. Ниже представлены инструменты управления.
          </p>
          {isFetching && (
            <div className="text-end text-muted">
              <small>Обновление данных...</small>
            </div>
          )}
        </div>
      </div>

      {isLoading && <Spinner />}
      
      {isError && (
        <div className="alert alert-danger d-flex justify-content-between align-items-center">
          <div>
            Ошибка загрузки: {error?.message || 'Неизвестная ошибка'}
          </div>
          <button 
            className="btn btn-sm btn-outline-danger"
            onClick={handleRetry}
          >
            Повторить
          </button>
        </div>
      )}

      {!isLoading && !isError && (
        <>
          <div className="card mb-4">
            <div className="card-body">
              <h2 className="mb-4">Управление пользователями</h2>
              <AdminUsersTable 
                users={displayUsers}
                testMode={testMode.active}
                testStates={testMode}
              />
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <h2 className="mb-4">Управление отзывами</h2>
              <AdminFeedbacksTable 
                feedbacks={displayFeedbacks}
                testMode={testMode.active}
                testStates={testMode}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminPanel;
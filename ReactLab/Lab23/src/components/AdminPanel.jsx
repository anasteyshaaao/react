import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchFeedbacks, deleteFeedback } from '../redux/slices/feedbackSlice';
import { fetchUsers } from '../redux/slices/usersSlice';
import AdminUsersTable from './AdminUsersTable';
import AdminFeedbacksTable from './AdminFeedbacksTable';

const AdminPanel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userName, isAdmin } = useSelector(state => state.auth);
  const { 
    items: feedbacks, 
    loading: feedbacksLoading, 
    error: feedbacksError 
  } = useSelector(state => state.feedback);

  useEffect(() => {
    if (!isAdmin) {
      navigate('/');
    } else {
      dispatch(fetchFeedbacks());
      dispatch(fetchUsers());
    }
  }, [dispatch, isAdmin, navigate]);

  const handleDeleteFeedback = (id) => {
    if (window.confirm('Вы уверены, что хотите удалить этот отзыв?')) {
      dispatch(deleteFeedback(id));
    }
  };

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
      
      <div className="card mb-4">
        <div className="card-body">
          <h2 className="card-title">Добро пожаловать, {userName}!</h2>
          <p className="card-text">
            Вы вошли как администратор системы. Ниже представлены инструменты управления.
          </p>
        </div>
      </div>

      <div className="card mb-4">
        <div className="card-body">
          <h2 className="mb-4">Управление пользователями</h2>
          <AdminUsersTable />
        </div>
      </div>

      <div className="card">
        <div className="card-body">
          <h2 className="mb-4">Управление отзывами</h2>
          <AdminFeedbacksTable 
            feedbacks={feedbacks}
            onDelete={handleDeleteFeedback}
            loading={feedbacksLoading}
            error={feedbacksError}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
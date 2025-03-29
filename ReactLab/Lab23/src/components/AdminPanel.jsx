import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchFeedbacks, deleteFeedback } from '../redux/slices/feedbackSlice';

const AdminPanel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userName, isAdmin } = useSelector(state => state.auth);
  const { 
    items: feedbacks, 
    loading, 
    error 
  } = useSelector(state => state.feedback);

  useEffect(() => {
    if (!isAdmin) {
      navigate('/');
    } else {
      dispatch(fetchFeedbacks());
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

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('ru-RU', options);
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Админ-панель</h1>
      
      <div className="card mb-4">
        <div className="card-body">
          <h2 className="card-title">Добро пожаловать, {userName}!</h2>
          <p className="card-text">
            Вы вошли как администратор системы.
          </p>
        </div>
      </div>

      <div className="card">
        <div className="card-body">
          <h2 className="mb-4">Управление отзывами</h2>

          {loading && (
            <div className="text-center my-4">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Загрузка...</span>
              </div>
              <p className="mt-2">Загрузка отзывов...</p>
            </div>
          )}

          {error && (
            <div className="alert alert-danger my-4">
              Ошибка при загрузке отзывов: {error}
            </div>
          )}

          {!loading && !error && (
            <div className="table-responsive">
              <table className="table table-striped table-bordered table-hover mt-3">
                <thead className="table-dark">
                  <tr>
                    <th>ID</th>
                    <th>Имя</th>
                    <th>Текст отзыва</th>
                    <th>Дата</th>
                    <th>Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {feedbacks && feedbacks.length > 0 ? (
                    feedbacks.map(feedback => (
                      <tr key={feedback.id}>
                        <td>{feedback.id}</td>
                        <td>{feedback.name}</td>
                        <td>{feedback.feedback}</td>
                        <td>{formatDate(feedback.date)}</td>
                        <td>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDeleteFeedback(feedback.id)}
                            title="Удалить отзыв"
                          >
                            Удалить
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center py-4">
                        Нет отзывов для отображения
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
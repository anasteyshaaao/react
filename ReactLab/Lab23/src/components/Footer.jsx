import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFeedbacks, postFeedback } from '../redux/slices/feedbackSlice';
import { useForm } from 'react-hook-form';
import { ThemeContext } from './ThemeContext';

function Footer({ isLoggedIn }) {
  const dispatch = useDispatch();
  const { items: feedbacks, loading, error } = useSelector(state => state.feedback);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const { isDarkTheme } = useContext(ThemeContext);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchFeedbacks());
    }
  }, [isLoggedIn, dispatch]);

  const onSubmitFeedback = async (data) => {
    try {
      await dispatch(postFeedback({
        ...data,
        date: new Date().toISOString()
      })).unwrap();
      reset();
      setIsModalOpen(false);
      dispatch(fetchFeedbacks());
    } catch (err) {
      console.error('Ошибка при отправке:', err);
    }
  };

  return (
    <footer className={`py-4 ${isDarkTheme ? 'bg-dark text-light' : 'bg-light text-dark'}`}>
      <div className="container">
        {isLoggedIn && (
          <div className="feedback-section">
            <div className="d-flex justify-content-center align-items-center mb-4">
              <h3 className="mb-0">Отзывы пользователей</h3>
            </div>

            {loading && <div className="text-center">Загрузка...</div>}
            {error && <div className={`alert ${isDarkTheme ? 'alert-dark' : 'alert-danger'}`}>{error}</div>}

            <div className="row">
              {feedbacks.map(feedback => (
                <div key={feedback.id} className="col-md-4 mb-3">
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
              ))}
            </div>

           

            {isModalOpen && (
              <div className={`modal fade show d-block ${isDarkTheme ? 'dark-modal' : ''}`}>
                <div className="modal-dialog">
                  <div className={`modal-content ${isDarkTheme ? 'bg-dark text-light' : ''}`}>
                    <div className="modal-header">
                      <h5 className="modal-title">Оставить отзыв</h5>
                      <button 
                        type="button" 
                        className={`btn-close ${isDarkTheme ? 'btn-close-white' : ''}`}
                        onClick={() => setIsModalOpen(false)}
                      />
                    </div>
                    <div className="modal-body">
                      <form onSubmit={handleSubmit(onSubmitFeedback)}>
                        <div className="mb-3">
                          <label className="form-label">Ваше имя</label>
                          <input
                            {...register('name', { required: 'Обязательное поле' })}
                            className={`form-control ${errors.name ? 'is-invalid' : ''} ${isDarkTheme ? 'bg-dark text-light' : ''}`}
                          />
                          {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Отзыв</label>
                          <textarea
                            {...register('feedback', { required: 'Обязательное поле' })}
                            rows="3"
                            className={`form-control ${errors.feedback ? 'is-invalid' : ''} ${isDarkTheme ? 'bg-dark text-light' : ''}`}
                          />
                          {errors.feedback && <div className="invalid-feedback">{errors.feedback.message}</div>}
                        </div>
                        <button type="submit" className="btn btn-primary">
                          Отправить
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </footer>
  );
}

export default Footer;
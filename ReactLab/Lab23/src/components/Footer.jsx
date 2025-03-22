import React, { useState, useCallback, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { ThemeContext } from './ThemeContext'; // Импортируем контекст темы

function Footer({ isLoggedIn }) {
  const [feedbacks, setFeedbacks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // Состояние для модального окна
  const { register, handleSubmit, reset } = useForm();
  const { isDarkTheme } = useContext(ThemeContext); // Получаем текущую тему из контекста

  const onSubmit = useCallback((data) => {
    setFeedbacks((prev) => [...prev, data]);
    reset();
    setIsModalOpen(false); // Закрываем модальное окно после отправки
  }, [reset]);

  const openModal = () => setIsModalOpen(true); // Открыть модальное окно
  const closeModal = () => setIsModalOpen(false); // Закрыть модальное окно

  return (
    <footer className={`footer ${isDarkTheme ? 'bg-dark text-light' : 'bg-light text-dark'} py-4`}>
      <div className="container">
        <div className="text-center">
          {/* Форма обратной связи и отзывы */}
          {isLoggedIn && (
            <div className="feedback-section">
              {/* Кнопка для открытия модального окна */}
              <button onClick={openModal} className="btn btn-primary">
                Оставить отзыв
              </button>

              {/* Список отзывов (остается в футере) */}
              {feedbacks.length > 0 && ( // Проверка на наличие отзывов
                <div className="feedback-list mt-4">
                  <h4>Последние отзывы</h4>
                  {feedbacks.map((fb, index) => (
                    <div key={index} className={`feedback-item card mb-2 ${isDarkTheme ? 'bg-secondary text-light' : ''}`}>
                      <div className="card-body">
                        <strong>{fb.name}</strong>: {fb.feedback}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Модальное окно с формой */}
        {isModalOpen && (
          <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <div className="modal-dialog">
              <div className={`modal-content ${isDarkTheme ? 'bg-dark text-light' : ''}`}>
                <div className="modal-header">
                  <h5 className="modal-title">Оставьте отзыв</h5>
                  <button type="button" className="btn-close" onClick={closeModal} style={isDarkTheme ? { filter: 'invert(1)' } : {}}></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                      <input
                        {...register('name', { required: true })}
                        placeholder="Ваше имя"
                        className={`form-control ${isDarkTheme ? 'bg-secondary text-light' : ''}`}
                      />
                    </div>
                    <div className="mb-3">
                      <textarea
                        {...register('feedback', { required: true })}
                        placeholder="Ваш отзыв"
                        rows="3"
                        className={`form-control ${isDarkTheme ? 'bg-secondary text-light' : ''}`}
                      />
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
      <p className="text-center mt-4">© 2025 Мой сайт. Все права защищены.</p>
    </footer>
  );
}

export default Footer;
import React, { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import './css/Footer.css'; // Подключаем стили для футера

function Footer({ isLoggedIn }) { // Принимаем isLoggedIn через пропсы
  const [feedbacks, setFeedbacks] = useState([]);
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = useCallback((data) => {
    setFeedbacks((prev) => [...prev, data]);
    reset();
  }, [reset]);

  return (
    <footer className="footer">
      <div className="footer-content">
        <p>© 2025 Мой сайт. Все права защищены.</p>

        {/* Форма обратной связи и отзывы */}
        {isLoggedIn && (
          <div className="feedback-section">
            <div className="feedback-form">
              <h3>Оставьте отзыв</h3>
              <form onSubmit={handleSubmit(onSubmit)}>
                <input
                  {...register('name', { required: true })}
                  placeholder="Ваше имя"
                />
                <textarea
                  {...register('feedback', { required: true })}
                  placeholder="Ваш отзыв"
                  rows="3"
                />
                <button type="submit">Отправить</button>
              </form>
            </div>
            <div className="feedback-list">
              <h4>Последние отзывы</h4>
              {feedbacks.map((fb, index) => (
                <div key={index} className="feedback-item">
                  <strong>{fb.name}</strong>: {fb.feedback}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </footer>
  );
}

export default Footer;
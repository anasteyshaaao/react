import React, { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import './css/Feedback.css';

const Feedback = ({ isLoggedIn }) => { 
  const [feedbacks, setFeedbacks] = useState([]);
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = useCallback((data) => {
    setFeedbacks((prev) => [...prev, data]);
    reset();
  }, [reset]);

  if (!isLoggedIn) {
    return null; 
  }

  return (
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
  );
};

export default Feedback;
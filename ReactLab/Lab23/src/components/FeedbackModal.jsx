import React from 'react';
import { useForm } from 'react-hook-form';

const FeedbackModal = ({ 
  isDarkTheme, 
  userName, 
  showFeedbackModal, 
  setShowFeedbackModal, 
  onSubmitFeedback,
  serverError 
}) => {
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm({
    defaultValues: {
      name: userName
    }
  });

  return (
    showFeedbackModal && (
      <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className={`modal-content ${isDarkTheme ? 'bg-dark text-light' : ''}`}>
            <div className="modal-header">
              <h5 className="modal-title">Оставить отзыв</h5>
              <button 
                type="button" 
                className={`btn-close ${isDarkTheme ? 'btn-close-white' : ''}`}
                onClick={() => setShowFeedbackModal(false)}
                aria-label="Close"
              />
            </div>
            <div className="modal-body d-flex justify-content-center align-items-center mb-4">
              <form onSubmit={handleSubmit(onSubmitFeedback)} className="w-100">
                {serverError && (
                  <div className="alert alert-danger" role="alert">
                    {serverError}
                  </div>
                )}
                <div className="mb-3">
                  <label className="form-label">Ваше имя</label>
                  <input
                    {...register('name')}
                    className="form-control"
                    readOnly
                    disabled
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Текст отзыва</label>
                  <textarea
                    {...register('feedback', { 
                      required: 'Обязательное поле',
                      minLength: {
                        value: 10,
                        message: 'Минимум 10 символов'
                      },
                      maxLength: {
                        value: 500,
                        message: 'Максимум 500 символов'
                      }
                    })}
                    rows={5}
                    className={`form-control ${errors.feedback ? 'is-invalid' : ''}`}
                    placeholder="Поделитесь вашим мнением (10-500 символов)"
                  />
                  {errors.feedback && <div className="invalid-feedback">{errors.feedback.message}</div>}
                  <div className="form-text">Ваш отзыв поможет нам улучшить сервис</div>
                </div>
                <div className="d-flex justify-content-end gap-2">
                  <button 
                    type="button" 
                    className="btn btn-secondary" 
                    onClick={() => setShowFeedbackModal(false)}
                  >
                    Отмена
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Отправить отзыв
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default FeedbackModal;
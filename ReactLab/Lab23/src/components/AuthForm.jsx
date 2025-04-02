import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/slices/authSlice';
import { registerUser, loginUser, updateUserProfile } from '../redux/slices/apiSlice';
import './css/AuthForm.css';

const AuthForm = ({ isLogin, isProfileEdit = false }) => {
  const { 
    control, 
    handleSubmit, 
    reset,
    formState: { errors, isSubmitting } 
  } = useForm();
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userName, userId } = useSelector(state => state.auth);
  const apiError = useSelector(state => state.api.error);
  const [formError, setFormError] = React.useState('');

  React.useEffect(() => {
    if (isProfileEdit) {
      reset({ name: userName });
    }
  }, [isProfileEdit, userName, reset]);

  const onSubmit = async (data) => {
    try {
      setFormError('');
      
      if (isProfileEdit) {
        await dispatch(updateUserProfile({ 
          userId, 
          newName: data.name 
        })).unwrap();
        navigate('/');
        return;
      }
      
      if (isLogin) {
        const userData = await dispatch(loginUser(data)).unwrap();
        dispatch(login({ 
          name: userData.name, 
          id: userData.id,
          isAdmin: userData.isAdmin 
        }));
      } else {
        const response = await dispatch(registerUser(data)).unwrap();
        dispatch(login({ 
          name: response.name, 
          id: response.id,
          isAdmin: response.isAdmin || false
        }));
      }
      
      navigate('/');
    } catch (error) {
      setFormError(
        error.message || 
        'Произошла ошибка. Проверьте данные и попробуйте снова'
      );
    }
  };

  return (
    <div className="auth-form">
      <h2>{isProfileEdit ? 'Редактирование профиля' : isLogin ? 'Вход' : 'Регистрация'}</h2>
      
      {formError && <div className="alert alert-danger">{formError}</div>}
      {apiError && <div className="alert alert-danger">{apiError}</div>}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>Имя</label>
          <Controller
            name="name"
            control={control}
            rules={{ 
              required: 'Это поле обязательно',
              minLength: {
                value: 3,
                message: 'Минимум 3 символа'
              }
            }}
            defaultValue=""
            render={({ field }) => (
              <input 
                {...field} 
                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                disabled={isSubmitting}
              />
            )}
          />
          {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
        </div>

        {!isLogin && !isProfileEdit && (
          <div className="form-group">
            <label>Email</label>
            <Controller
              name="email"
              control={control}
              rules={{
                required: 'Это поле обязательно',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Введите корректный email',
                },
              }}
              defaultValue=""
              render={({ field }) => (
                <input 
                  {...field} 
                  type="email"
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  disabled={isSubmitting}
                />
              )}
            />
            {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
          </div>
        )}

        {!isProfileEdit && (
          <div className="form-group">
            <label>Пароль</label>
            <Controller
              name="password"
              control={control}
              rules={{
                required: 'Это поле обязательно',
                minLength: {
                  value: 6,
                  message: 'Пароль должен содержать минимум 6 символов',
                },
              }}
              defaultValue=""
              render={({ field }) => (
                <input 
                  {...field} 
                  type="password"
                  className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                  disabled={isSubmitting}
                />
              )}
            />
            {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
          </div>
        )}

        <button 
          type="submit" 
          className="btn btn-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              {' '}Загрузка...
            </>
          ) : (
            isProfileEdit ? 'Сохранить' : isLogin ? 'Войти' : 'Зарегистрироваться'
          )}
        </button>
      </form>
    </div>
  );
};

export default AuthForm;
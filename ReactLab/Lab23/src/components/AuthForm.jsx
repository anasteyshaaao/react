import React, { useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import NameInput from './NameInput'; // Импортируем компонент NameInput
import './css/AuthForm.css';

const AuthForm = ({ isLogin, onLogin }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = useCallback((data) => {
    console.log(data);
    onLogin(data.name); // Передаем имя пользователя в onLogin
    navigate('/');
  }, [onLogin, navigate]);

  return (
    <div className="auth-form">
      <h2>{isLogin ? 'Вход' : 'Регистрация'}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Поле "Имя" для входа и регистрации */}
        <div>
          <label>Имя</label>
          <Controller
            name="name"
            control={control}
            rules={{ required: 'Это поле обязательно' }}
            defaultValue=""
            render={({ field }) => <input {...field} />}
          />
          {errors.name && <span className="error">{errors.name.message}</span>}
        </div>

        {/* Поле "Email" только для регистрации */}
        {!isLogin && (
          <div>
            <label>Email</label>
            <Controller
              name="email"
              control={control}
              rules={{
                required: 'Это поле обязательно',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Email должен содержать символ @',
                },
              }}
              defaultValue=""
              render={({ field }) => <input {...field} />}
            />
            {errors.email && <span className="error">{errors.email.message}</span>}
          </div>
        )}

        {/* Поле "Пароль" для входа и регистрации */}
        <div>
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
            render={({ field }) => <input type="password" {...field} />}
          />
          {errors.password && <span className="error">{errors.password.message}</span>}
        </div>

        <button type="submit">{isLogin ? 'Войти' : 'Зарегистрироваться'}</button>
      </form>
    </div>
  );
};

export default AuthForm;
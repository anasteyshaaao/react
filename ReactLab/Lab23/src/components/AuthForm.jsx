import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import './css/AuthForm.css'; // Подключаем стили

const AuthForm = ({ isLogin, onLogin }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = useCallback((data) => {
    console.log(data); 
    onLogin(); // Вызываем onLogin после успешной авторизации
    navigate('/'); // Перенаправляем на главную страницу
  }, [onLogin, navigate]);

  return (
    <div className="auth-form">
      <h2>{isLogin ? 'Вход' : 'Регистрация'}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {!isLogin && (
          <div>
            <label>Имя</label>
            <input {...register('name', { required: true })} />
            {errors.name && <span className="error">Это поле обязательно</span>}
          </div>
        )}
        <div>
          <label>Email</label>
          <input {...register('email', { required: true, pattern: /^\S+@\S+$/i })} />
          {errors.email && <span className="error">Введите корректный email</span>}
        </div>
        <div>
          <label>Пароль</label>
          <input type="password" {...register('password', { required: true, minLength: 6 })} />
          {errors.password && <span className="error">Пароль должен содержать минимум 6 символов</span>}
        </div>
        <button type="submit">{isLogin ? 'Войти' : 'Зарегистрироваться'}</button>
      </form>
    </div>
  );
};

export default AuthForm;
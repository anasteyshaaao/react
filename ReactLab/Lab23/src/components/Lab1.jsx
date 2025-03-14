import React, { useState, useEffect } from 'react';
import './css/Lab1.css'; // Подключаем стили

function LabWork1() {
  // Состояние для счетчика
  const [count, setCount] = useState(0);

  // Состояния для формы аутентификации
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  // Эффект для автозаполнения формы из localStorage
  useEffect(() => {
    const storedLogin = localStorage.getItem('login');
    const storedPass = localStorage.getItem('pass');

    if (storedLogin && storedPass) {
      setLogin(storedLogin);
      setPassword(storedPass);
    }

    // Оповещение о загрузке страницы
    alert('Страница полностью загружена.');
  }, []);

  // Функции для счетчика
  const incrementCounter = () => {
    setCount(count + 1);
  };

  const decrementCounter = () => {
    setCount(count - 1);
  };

  // Обработчик отправки формы
  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = login === 'admin' && password === 'admin';
    setIsError(!isValid);
    setMessage(isValid ? 'Успешный вход!' : 'Неверный логин или пароль.');

    if (isValid) {
      localStorage.setItem('login', login);
      localStorage.setItem('pass', password);
    }
  };

  // Очистка формы
  const clearForm = () => {
    setLogin('');
    setPassword('');
    setMessage('');
    setIsError(false);
  };

  return (
    <div className="lab-work">
      <h1>Лабораторная работа № 1</h1>
      <p style={{ fontSize: '20px' }}>Задание 1</p>

      {/* Счетчик */}
      <button onClick={incrementCounter}>Увеличить счетчик</button>
      <button onClick={decrementCounter}>Уменьшить счетчик</button>
      <div className="counter">
        Счетчик: <span>{count}</span>
      </div>

      {/* Форма аутентификации */}
      <h1>Форма аутентификации</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="login">Логин:</label>
        <input
          type="text"
          id="login"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          placeholder="Логин"
          required
        />
        <label htmlFor="pass">Пароль:</label>
        <input
          type="password"
          id="pass"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Пароль"
          required
        />
        <div className="button-container">
          <button type="submit">Войти</button>
          <button type="button" onClick={clearForm}>
            Очистить
          </button>
        </div>
      </form>

      {/* Сообщение */}
      <div className={`message ${isError ? 'error' : ''}`}>{message}</div>
    </div>
  );
}

export default LabWork1;
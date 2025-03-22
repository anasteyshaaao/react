// useLoginState.js (или ваш файл с логикой авторизации)
import { useState } from 'react';

const useLoginState = () => {
  // Получаем состояние авторизации из localStorage
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('isLoggedIn') === 'true'
  );

  // Получаем имя пользователя из localStorage
  const [userName, setUserName] = useState(
    localStorage.getItem('userName') || ''
  );

  const login = (name) => {
    setIsLoggedIn(true);
    setUserName(name);
    // Сохраняем состояние в localStorage
    localStorage.setItem('isLoggedIn', true);
    localStorage.setItem('userName', name);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserName('');
    // Удаляем состояние из localStorage
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userName');
  };

  return { isLoggedIn, login, logout, userName };
};

export default useLoginState;
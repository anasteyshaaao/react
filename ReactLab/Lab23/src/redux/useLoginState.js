import { useState, useEffect } from 'react';

const useLoginState = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // При загрузке страницы проверяем localStorage
  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn');
    setIsLoggedIn(loggedIn === 'true'); // Проверяем, что значение не null и равно 'true'
  }, []);

  const login = () => {
    localStorage.setItem('isLoggedIn', 'true'); // Сохраняем статус авторизации
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.setItem('isLoggedIn', 'false'); // Удаляем статус авторизации
    setIsLoggedIn(false);
  };

  return { isLoggedIn, login, logout };
};

export default useLoginState;
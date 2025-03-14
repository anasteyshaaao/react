import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './css/Header.css';
import { ThemeContext } from './ThemeContext';

function Header({ isLoggedIn, logout }) { // Принимаем isLoggedIn и logout через пропсы
  const { isDarkTheme, toggleTheme } = useContext(ThemeContext);

  return (
    <header className={isDarkTheme ? 'dark-theme' : 'light-theme'}>
      <nav className="navbar">
        <Link to="/" className="nav-link">
          Главная
        </Link>

        {/* Выпадающий список "Лабораторные работы" */}
        <div className="dropdown">
          <button className="dropdown-toggle">Лабораторные работы</button>
          <ul className="dropdown-menu">
            <li>
              <Link to="/lab1" className="dropdown-item">
                Лабораторная работа 1
              </Link>
            </li>
            <li>
              <Link to="/lab2" className="dropdown-item">
                Лабораторная работа 2
              </Link>
            </li>
            <li>
              <Link to="/lab3" className="dropdown-item">
                Лабораторная работа 3
              </Link>
            </li>
            <li>
              <Link to="/lab4" className="dropdown-item">
                Лабораторная работа 4
              </Link>
            </li>
          </ul>
        </div>

        {/* Кнопка переключения темы */}
        <button onClick={toggleTheme}>
          {isDarkTheme ? 'Светлая тема' : 'Темная тема'}
        </button>

        {/* Кнопки авторизации/регистрации или выхода */}
        {isLoggedIn ? (
          <button onClick={logout} style={{ float: 'right', margin: '10px' }}>
            Выйти
          </button>
        ) : (
          <div style={{ float: 'right', margin: '10px' }}>
            <Link to="/auth" className="nav-link">
              Войти
            </Link>
            <Link to="/register" className="nav-link" style={{ marginLeft: '10px' }}>
              Зарегистрироваться
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header;
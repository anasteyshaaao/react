import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
//import './css/Header.css'; // Оставьте, если есть дополнительные стили
import { ThemeContext } from './ThemeContext';

function Header({ isLoggedIn, logout, userName }) {
  const { isDarkTheme, toggleTheme } = useContext(ThemeContext);

  return (
    <header className={`navbar navbar-expand-lg ${isDarkTheme ? 'navbar-dark bg-dark' : 'navbar-light bg-light'}`}>
      <div className="container-fluid">
        {/* Бренд или логотип */}
        <Link to="/" className="navbar-brand">
          Главная
        </Link>

        {/* Кнопка для мобильного меню */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Основное меню */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {/* Выпадающее меню для лабораторных работ */}
            <li className="nav-item dropdown">
              <button
                className="nav-link dropdown-toggle"
                id="navbarDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Лабораторные работы
              </button>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
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
            </li>
          </ul>

          {/* Правая часть навигации */}
          <div className="d-flex align-items-center">
            {/* Кнопка смены темы */}
            <button onClick={toggleTheme} className="btn btn-outline-secondary me-2">
              {isDarkTheme ? 'Светлая тема' : 'Темная тема'}
            </button>

            {/* Логин/логаут и приветствие */}
            {isLoggedIn ? (
              <div className="d-flex align-items-center">
                <span className="me-3">Привет, {userName}!</span>
                <button onClick={logout} className="btn btn-outline-danger">
                  Выйти
                </button>
              </div>
            ) : (
              <div className="d-flex align-items-center">
                <Link to="/auth" className="btn btn-outline-primary me-2">
                  Войти
                </Link>
                <Link to="/register" className="btn btn-outline-success">
                  Зарегистрироваться
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
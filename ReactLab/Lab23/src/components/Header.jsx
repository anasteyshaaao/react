import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from './ThemeContext';
import { useDispatch, useSelector } from 'react-redux';
import { postFeedback } from '../redux/slices/feedbackSlice';
import FeedbackModal from './FeedbackModal';

function Header({ isLoggedIn, logout }) {
  const { isDarkTheme, toggleTheme } = useContext(ThemeContext);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [serverError, setServerError] = useState(null);
  const { userName, isAdmin } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const onSubmitFeedback = async (data) => {
    try {
      setServerError(null);
      const result = await dispatch(postFeedback({
        ...data,
        date: new Date().toISOString()
      }));
      
      if (postFeedback.rejected.match(result)) {
        throw new Error(result.error.message || 'Ошибка сервера');
      }
      
      setShowFeedbackModal(false);
    } catch (error) {
      console.error('Ошибка при отправке отзыва:', error);
      setServerError('Сервер недоступен. Пожалуйста, попробуйте позже.');
    }
  };

  return (
    <header className={`navbar navbar-expand-lg navbar-${isDarkTheme ? 'dark bg-dark' : 'light bg-light'} py-2`}>
      <div className="container-fluid">
        <div className="d-flex align-items-center">
          <Link to="/" className="navbar-brand me-3">
            Главная
          </Link>

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

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto align-items-center">
              <li className="nav-item dropdown me-2">
                <button
                  className="nav-link dropdown-toggle btn btn-outline-secondary"
                  id="navbarDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Лабораторные работы
                </button>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li><Link to="/lab1" className="dropdown-item">Лабораторная работа 1</Link></li>
                  <li><Link to="/lab2" className="dropdown-item">Лабораторная работа 2</Link></li>
                  <li><Link to="/lab3" className="dropdown-item">Лабораторная работа 3</Link></li>
                  <li><Link to="/lab4" className="dropdown-item">Лабораторная работа 4</Link></li>
                  <li><Link to="/lab5" className="dropdown-item">Лабораторная работа 5</Link></li>
                </ul>
              </li>

              {isLoggedIn && isAdmin && (
                <li className="nav-item me-2">
                  <Link to="/admin" className="nav-link btn btn-outline-info">
                    Админ-панель
                  </Link>
                </li>
              )}

              {isLoggedIn && (
                <li className="nav-item">
                  <button
                    className="nav-link btn btn-outline-primary"
                    onClick={() => setShowFeedbackModal(true)}
                  >
                    Оставить отзыв
                  </button>
                </li>
              )}
            </ul>

            <div className="d-flex align-items-center ms-auto">
              <button 
                onClick={toggleTheme} 
                className={`btn ${isDarkTheme ? 'btn-light' : 'btn-dark'} me-3`}
              >
                {isDarkTheme ? 'Светлая тема' : 'Темная тема'}
              </button>

              {isLoggedIn ? (
                <div className="d-flex align-items-center">
                  <span className="me-3 d-none d-md-inline">Привет, {userName}!</span>
                  <Link to="/edit-profile" className="btn btn-outline-primary me-2">
                    Редактировать
                  </Link>
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

        <FeedbackModal
          isDarkTheme={isDarkTheme}
          userName={userName}
          showFeedbackModal={showFeedbackModal}
          setShowFeedbackModal={setShowFeedbackModal}
          onSubmitFeedback={onSubmitFeedback}
          serverError={serverError}
        />
      </div>
    </header>
  );
}

export default Header;
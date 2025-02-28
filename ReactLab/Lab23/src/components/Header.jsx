import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Подключаем стили

function Header() {
  return (
    <header className="header">
      <nav className="navbar">
        <Link to="/" className="nav-link">Главная</Link>

        {/* Выпадающий список "Лабораторные работы" */}
        <div className="dropdown">
          <button className="dropdown-toggle">Лабораторные работы</button>
          <ul className="dropdown-menu">
            <li>
              <Link to="/lab1" className="dropdown-item">Лабораторная работа 1</Link>
            </li>
            <li>
              <Link to="/lab2" className="dropdown-item">Лабораторная работа  2</Link>
            </li>
            <li>
              <Link to="/lab3" className="dropdown-item">Лабораторная работа 3</Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;
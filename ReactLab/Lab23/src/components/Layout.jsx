import React, { useContext } from 'react';
import Header from './Header';
import Footer from './Footer';
import Content from './Content';
import { ThemeContext } from './ThemeContext';
import './css/Layout.css'; // Оставьте, если есть дополнительные стили

function Layout({ children, isLoggedIn, logout, userName }) {
  const { isDarkTheme } = useContext(ThemeContext); // Получаем текущую тему из контекста

  return (
    <div className={`layout ${isDarkTheme ? 'bg-dark text-light' : 'bg-light text-dark'}`}>
      <Header isLoggedIn={isLoggedIn} logout={logout} userName={userName} /> {/* Передаём userName в Header */}
      <Content>
        {children}
      </Content>
      <Footer isLoggedIn={isLoggedIn} /> {/* Передаём isLoggedIn в Footer */}
    </div>
  );
}

export default Layout;
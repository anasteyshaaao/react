import React, { useContext } from 'react';
import Header from './Header';
import Footer from './Footer';
import Content from './Content';
import { ThemeContext } from './ThemeContext';
import './css/Layout.css';

function Layout({ children, isLoggedIn, logout }) { // Принимаем isLoggedIn и logout через пропсы
  const { isDarkTheme } = useContext(ThemeContext);

  return (
    <div className={`layout ${isDarkTheme ? 'dark-theme' : 'light-theme'}`}>
      <Header isLoggedIn={isLoggedIn} logout={logout} /> {/* Передаём isLoggedIn и logout в Header */}
      <Content>
        {children}
      </Content>
      <Footer isLoggedIn={isLoggedIn} /> {/* Передаём isLoggedIn в Footer */}
    </div>
  );
}

export default Layout;
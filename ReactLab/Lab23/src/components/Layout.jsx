import React from 'react';
import Header from './Header'; // Импортируем компонент Header
import Footer from './Footer'; // Импортируем компонент Footer
import Content from './Content'; // Импортируем компонент Content
import './Layout.css';

function Layout({ children }) {
  return (
    <div className="layout">
      <Header /> {/* Используем компонент Header */}
      <Content> {/* Используем компонент Content для оборачивания children */}
        {children}
      </Content>
      <Footer /> {/* Используем компонент Footer */}
    </div>
  );
}

export default Layout;
import React, { useContext } from 'react';
import Container from './Container'; // Импортируем ваш существующий компонент Container
import { ThemeContext } from './ThemeContext'; // Импортируем контекст темы

function Content({ children }) {
  const { isDarkTheme } = useContext(ThemeContext); // Получаем текущую тему из контекста

  return (
    <div className={`content ${isDarkTheme ? 'bg-dark text-light' : 'bg-light text-dark'}`}>
      <Container> {/* Оборачиваем children в Container */}
        {children}
      </Container>
    </div>
  );
}

export default Content;
import React from 'react';
import Container from './Container'; // Импортируем ваш существующий компонент Container
import './css/Content.css'; // Опционально: стили для Content

function Content({ children }) {
  return (
    <div className="content">
      <Container> {/* Оборачиваем children в Container */}
        {children}
      </Container>
    </div>
  );
}

export default Content;
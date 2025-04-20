import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button'; // путь к вашему компоненту

describe('Button component', () => {
  // 1. Тест на рендеринг
  it('renders button with correct classes and children', () => {
    const buttonText = 'Click me';
    render(<Button>{buttonText}</Button>);
    
    const button = screen.getByRole('button', { name: buttonText });
    
    // Проверяем наличие классов
    expect(button).toHaveClass('btn', 'btn-primary');
    // Проверяем текст кнопки
    expect(button).toHaveTextContent(buttonText);
  });

  // 2. Тест на обработчик клика
  it('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    const buttonText = 'Click me';
    
    render(<Button onClick={handleClick}>{buttonText}</Button>);
    
    const button = screen.getByRole('button', { name: buttonText });
    fireEvent.click(button);
    
    // Проверяем, что обработчик был вызван 1 раз
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  // 3. Дополнительный тест для проверки без обработчика (опционально)
  it('renders button without onClick', () => {
    const buttonText = 'Click me';
    render(<Button>{buttonText}</Button>);
    
    const button = screen.getByRole('button', { name: buttonText });
    // Просто проверяем, что кнопка рендерится без ошибок
    expect(button).toBeInTheDocument();
  });
});
import React, { useEffect } from 'react';

function UseEffectExample() {
  useEffect(() => {
    console.log('Компонент смонтирован');

    return () => {
      console.log('Компонент размонтирован');
    };
  }, []); // Пустой массив зависимостей означает, что эффект выполнится только при монтировании и размонтировании

  return (
    <div>
      <h2>useEffect Пример</h2>
      <p>Этот компонент демонстрирует useEffect на монтировании и размонтировании.</p>
    </div>
  );
}

export default UseEffectExample;
// ReduxCounter.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux'; // Импортируем хуки Redux
import { increment, decrement } from '../counterSlice.jsx'; // Импортируем actions

function ReduxCounter() {
  const count = useSelector((state) => state.counter.value); // Получаем состояние счетчика
  const dispatch = useDispatch(); // Получаем dispatch для вызова actions

  return (
    <div>
      <h2>Счетчик на Redux: {count}</h2>
      <button onClick={() => dispatch(increment())}>Увеличить (Redux)</button>
      <button onClick={() => dispatch(decrement())}>Уменьшить (Redux)</button>
    </div>
  );
}

export default ReduxCounter;
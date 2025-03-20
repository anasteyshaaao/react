import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './features/counter/counterSlice.jsx'; // Импортируем редюсер

// Создаем хранилище
export const store = configureStore({
  reducer: {
    counter: counterReducer, // вкл редюсер счетчика
  },
});
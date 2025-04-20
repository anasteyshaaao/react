import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import feedbackReducer from './slices/feedbackSlice';
import usersReducer from './slices/usersSlice';
import { adminApi } from '../components/adminApi'; // Импортируем наш API

export const store = configureStore({
  reducer: {
    auth: authReducer,
    feedback: feedbackReducer,
    users: usersReducer,
    [adminApi.reducerPath]: adminApi.reducer, // Добавляем редюсер API
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(adminApi.middleware), // Добавляем middleware API
});
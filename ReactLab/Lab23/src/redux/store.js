import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import feedbackReducer from './slices/feedbackSlice';
import apiReducer from './slices/apiSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    feedback: feedbackReducer,
    api: apiReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
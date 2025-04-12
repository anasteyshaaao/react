import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:3001/users';

export const updateUserProfile = createAsyncThunk(
  'auth/updateProfile',
  async ({ userId, newName }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`${API_URL}/${userId}`, { name: newName });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: localStorage.getItem('isLoggedIn') === 'true',
    userName: localStorage.getItem('userName') || '',
    userId: localStorage.getItem('userId') || '',
    isAdmin: localStorage.getItem('isAdmin') === 'true',
    isBlocked: localStorage.getItem('isBlocked') === 'true', // Добавляем новое поле
    status: 'idle',
    error: null
  },
  reducers: {
    login: (state, action) => {
      if (!action.payload) {
        console.error('Login action called without payload');
        return;
      }
      
      state.isLoggedIn = true;
      state.userName = action.payload.name || '';
      state.userId = action.payload.id || '';
      state.isAdmin = Boolean(action.payload.isAdmin);
      state.isBlocked = Boolean(action.payload.isBlocked); // Добавляем проверку блокировки
      
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userName', state.userName);
      localStorage.setItem('userId', state.userId);
      localStorage.setItem('isAdmin', state.isAdmin.toString());
      localStorage.setItem('isBlocked', state.isBlocked.toString()); // Сохраняем в localStorage
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.userName = '';
      state.userId = '';
      state.isAdmin = false;
      state.isBlocked = false; // Сбрасываем статус блокировки
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('userName');
      localStorage.removeItem('userId');
      localStorage.removeItem('isAdmin');
      localStorage.removeItem('isBlocked');
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.userName = action.payload.name;
        localStorage.setItem('userName', action.payload.name);
      });
  }
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
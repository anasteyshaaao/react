import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:3001';

export const fetchFeedbacks = createAsyncThunk(
  'api/fetchFeedbacks',
  async () => {
    const response = await axios.get(`${API_URL}/feedbacks`);
    return response.data;
  }
);

export const postFeedback = createAsyncThunk(
  'api/postFeedback',
  async (feedback) => {
    const response = await axios.post(`${API_URL}/feedbacks`, feedback);
    return response.data;
  }
);

export const registerUser = createAsyncThunk(
  'api/registerUser',
  async (userData) => {
    const response = await axios.post(`${API_URL}/users`, userData);
    return response.data;
  }
);

export const loginUser = createAsyncThunk(
  'api/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/users?name=${credentials.name}&password=${credentials.password}`
      );
      
      if (!response.data || response.data.length === 0) {
        throw new Error('Пользователь не найден');
      }
      
      const user = response.data[0];

      // Проверяем, заблокирован ли пользователь
      if (user.isBlocked) {
        throw new Error('Ваш аккаунт заблокирован. Обратитесь к администратору.');
      }
      
      return {
        id: user.id,
        name: user.name,
        isAdmin: Boolean(user.isAdmin)
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  'api/updateUserProfile',
  async ({ userId, newName }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`${API_URL}/users/${userId}`, { 
        name: newName 
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const apiSlice = createSlice({
  name: 'api',
  initialState: {
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchFeedbacks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFeedbacks.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(fetchFeedbacks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export default apiSlice.reducer;
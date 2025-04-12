import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:3001/users';

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (userId, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/${userId}`);
      return userId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const toggleBlockUser = createAsyncThunk(
  'users/toggleBlockUser',
  async (userId, { getState, rejectWithValue }) => {
    try {
      const user = getState().users.items.find(u => u.id === userId);
      const response = await axios.patch(`${API_URL}/${userId}`, {
        isBlocked: !user.isBlocked
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    items: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.items = state.items.filter(user => user.id !== action.payload);
      })
      .addCase(toggleBlockUser.fulfilled, (state, action) => {
        const user = state.items.find(u => u.id === action.payload.id);
        if (user) {
          user.isBlocked = action.payload.isBlocked;
        }
      });
  }
});

export default usersSlice.reducer;
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:3001/feedbacks';

export const fetchFeedbacks = createAsyncThunk(
  'feedback/fetchFeedbacks',
  async () => {
    const response = await axios.get(API_URL);
    return response.data;
  }
);

export const postFeedback = createAsyncThunk(
  'feedback/postFeedback',
  async (feedbackData) => {
    const response = await axios.post(API_URL, feedbackData);
    return response.data;
  }
);

export const deleteFeedback = createAsyncThunk(
  'feedback/deleteFeedback',
  async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
  }
);

const feedbackSlice = createSlice({
  name: 'feedback',
  initialState: {
    items: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeedbacks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeedbacks.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchFeedbacks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(postFeedback.pending, (state) => {
        state.loading = true;
      })
      .addCase(postFeedback.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(postFeedback.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteFeedback.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
      });
  }
});

export default feedbackSlice.reducer;
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const adminApi = createApi({
  reducerPath: 'adminApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'http://localhost:3001',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
      
    },
  }),
  tagTypes: ['Feedback', 'User'],
  endpoints: (builder) => ({
    // Отзывы
    getFeedbacks: builder.query({
      query: () => '/feedbacks',
      providesTags: ['Feedback'],
    }),
    deleteFeedback: builder.mutation({
      query: (id) => ({
        url: `/feedbacks/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Feedback'],
    }),

    // Пользователи
    getUsers: builder.query({
      query: () => '/users',
      providesTags: ['User'],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),
    toggleBlockUser: builder.mutation({
      query: ({ id, isBlocked }) => ({
        url: `/users/${id}/block`,
        method: 'PATCH',
        body: { isBlocked },
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useGetFeedbacksQuery,
  useDeleteFeedbackMutation,
  useGetUsersQuery,
  useDeleteUserMutation,
  useToggleBlockUserMutation,
} = adminApi;
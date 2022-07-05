import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '..';
import { BASE_URL } from '../../constants';
import { profile } from '../../interfaces/profile';
import { api } from '../../interfaces/api';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).profile.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      headers.set('content-type', 'application/json;charset=UTF-8');
      return headers;
    }
  }),
  endpoints: (build) => ({
    getUserInfo: build.query<Partial<api.response.auth.user>, string>({
      query: (param) => ({
        url: 'auth/user',
        method: 'GET',
        headers: {
          authorization: param ? `Bearer ${param}` : ''
        }
      })
    }),
    forgotPassword: build.mutation<api.response.auth.reset, Omit<api.request.auth.body, 'password' | 'name'>>({
      query: (body) => ({
        url: 'password-reset',
        method: 'POST',
        body: { ...body }
      })
    }),
    resetPassword: build.mutation<api.response.auth.reset, { token: string; password: string }>({
      query: (body) => ({
        url: 'password-reset/reset',
        method: 'POST',
        body: { ...body }
      })
    }),
    login: build.mutation<api.response.auth.user, api.request.auth.body>({
      query: (body) => ({
        url: 'auth/login',
        method: 'POST',
        body: { ...body }
      })
    }),
    register: build.mutation<api.response.auth.user, api.request.auth.body>({
      query: (body) => ({
        url: 'auth/register',
        method: 'POST',
        body: { ...body }
      })
    }),
    refreshToken: build.mutation<Omit<api.response.auth.user, 'user'>, { token: string }>({
      query: (body) => ({
        url: 'auth/token',
        method: 'POST',
        body: { ...body }
      })
    }),
    updateUserInfo: build.mutation<Partial<api.response.auth.user>, Partial<profile.user>>({
      query: (body) => ({
        url: 'auth/user',
        method: 'PATCH',
        body: { ...body }
      })
    })
  })
});

export const {
  useUpdateUserInfoMutation,
  useLoginMutation,
  useRegisterMutation,
  useRefreshTokenMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useGetUserInfoQuery
} = authApi;

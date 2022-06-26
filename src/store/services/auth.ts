import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '..';
import { BASE_URL } from '../../constants';
import { profile } from '../../interfaces/profile';
import { response } from '../../interfaces/response';

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
    forgotPassword: build.mutation<response.auth.reset, { email: string }>({
      query: (body) => {
        return {
          url: 'password-reset',
          method: 'POST',
          body: { ...body }
        };
      }
    }),
    resetPassword: build.mutation<response.auth.reset, { token: string; password: string }>({
      query: (body) => {
        return {
          url: 'password-reset/reset',
          method: 'POST',
          body: { ...body }
        };
      }
    }),
    login: build.mutation<response.auth.request, response.auth.body>({
      query: (body) => {
        return {
          url: 'auth/login',
          method: 'POST',
          body: { ...body }
        };
      }
    }),
    register: build.mutation<response.auth.request, response.auth.body>({
      query: (body) => {
        return {
          url: 'auth/register',
          method: 'POST',
          body: { ...body }
        };
      }
    }),
    refreshToken: build.mutation<Partial<response.auth.request>, { token: string }>({
      query: (body) => {
        return {
          url: 'auth/token',
          method: 'POST',
          body: { ...body }
        };
      }
    }),
    updateUserInfo: build.mutation<Partial<response.auth.request>, Partial<profile.user>>({
      query: (body) => {
        return {
          url: 'auth/user',
          method: 'PATCH',
          body: { ...body }
        };
      }
    })
  })
});

export const {
  useUpdateUserInfoMutation,
  useLoginMutation,
  useRegisterMutation,
  useRefreshTokenMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation
} = authApi;

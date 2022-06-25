import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '..';
import { BASE_URL } from '../../constants';
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
    })
  })
});

export const { useLoginMutation, useRegisterMutation, useRefreshTokenMutation } = authApi;

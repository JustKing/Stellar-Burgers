import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '..';
import { BASE_URL } from '../../constants';
import { api } from '../../interfaces/api';

export const ordersApi = createApi({
  reducerPath: 'orderDetailApi',
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
    createOrder: build.mutation<api.response.order, string[]>({
      query: (body) => ({
        url: 'orders',
        method: 'POST',
        body: { ingredients: body }
      })
    })
  })
});

export const { useCreateOrderMutation } = ordersApi;

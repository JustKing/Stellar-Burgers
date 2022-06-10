import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../constants';
import { response } from '../../interfaces/response';

export const ordersApi = createApi({
  reducerPath: 'orderDetailApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL
  }),
  endpoints: (build) => ({
    createOrder: build.mutation<response.order, string[]>({
      query: (body: string[]) => {
        return {
          url: 'orders',
          method: 'POST',
          body: { ingredients: body }
        };
      }
    })
  })
});

export const { useCreateOrderMutation } = ordersApi;

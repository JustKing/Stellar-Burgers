import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../constants';
import { order } from '../../interfaces/order';
import { response } from '../../interfaces/response';

export const ordersApi = createApi({
  reducerPath: 'orderDetail',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL
  }),
  endpoints: (build) => ({
    createOrder: build.mutation<order.order, string[]>({
      query: (body: string[]) => {
        console.log(JSON.stringify({ ingredients: body }));
        return {
          url: 'orders',
          method: 'POST',
          body: { ingredients: body }
        };
      },
      transformResponse: (response: response.response<order.order>) => response.data
    })
  })
});

export const { useCreateOrderMutation } = ordersApi;

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '..';
import { BASE_URL } from '../../constants';
import { ingredients } from '../../interfaces/ingredients';
import { response } from '../../interfaces/response';

export const ingredientsApi = createApi({
  reducerPath: 'ingredientsApi',
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
    fetchAllIngredients: build.query<ingredients.ingredient[], any>({
      query: () => `ingredients`,
      transformResponse: (response: response.response<ingredients.ingredient[]>) => response.data
    })
  })
});

export const { useFetchAllIngredientsQuery } = ingredientsApi;

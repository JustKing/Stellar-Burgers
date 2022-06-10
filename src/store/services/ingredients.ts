import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../constants';
import { ingredients } from '../../interfaces/ingredients';
import { response } from '../../interfaces/response';

export const ingredientsApi = createApi({
  reducerPath: 'ingredientsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL
  }),
  endpoints: (build) => ({
    fetchAllIngredients: build.query<ingredients.ingredient[], any>({
      query: () => `ingredients`,
      transformResponse: (response: response.response<ingredients.ingredient[]>) => response.data
    })
  })
});

export const { useFetchAllIngredientsQuery } = ingredientsApi;

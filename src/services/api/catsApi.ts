import { createApi } from '@reduxjs/toolkit/query/react';
import endpoints from './partials/endPoints';
import baseQuery from './partials/baseQuery';

export const catsApi = createApi({
  reducerPath: 'catsApi',
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getCat: builder.query({
      query: () => endpoints.facts,
    }),
  }),
});
export const { useGetCatQuery } = catsApi;

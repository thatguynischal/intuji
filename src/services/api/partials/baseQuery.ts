import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_URL,
  prepareHeaders: (headers) => {
    headers.set('Accept', 'application/json');
    return headers;
  },
});

const baseQueryWithReauth: typeof baseQuery = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error) {
    if (result.error.status === 401) {
      history.push('/'); // Adjust to your respective route
    } else if (result.error.status === 404) {
      history.push('/404'); // Adjust to your 404 route
    }
  }

  return result;
};

export default baseQueryWithReauth;

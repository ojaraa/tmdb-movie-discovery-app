import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const BASE_URL = import.meta.env.VITE_BASE_API_URL;
const apiToken = import.meta.env.VITE_BEARER_TOKEN;

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
      baseUrl: BASE_URL,
      prepareHeaders: (headers) => {
        headers.set('Authorization', `Bearer ${apiToken}` )
        headers.set('Content-Type', 'application/json');
        return headers;
      }
    }),
    endpoints: () => ({}),
    tagTypes: [
      "movies",
    ],
})
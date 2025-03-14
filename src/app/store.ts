import { apiSlice } from "@/services/api/apiSlice"
import { configureStore } from "@reduxjs/toolkit"

export const store = configureStore({
    reducer : {
      [  apiSlice.reducerPath] : apiSlice.reducer,

    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(apiSlice.middleware, );
      },
})
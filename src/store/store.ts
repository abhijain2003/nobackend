import { configureStore } from "@reduxjs/toolkit";
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from "@reduxjs/toolkit/query";
import { SchemaAPi } from "./schema";
import { UserApi } from "./user";
import { ApiData } from "./ApiData";

export const store = configureStore({
  reducer: {
    [SchemaAPi.reducerPath]: SchemaAPi.reducer,
    [UserApi.reducerPath]: UserApi.reducer,
    [ApiData.reducerPath]: ApiData.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      SchemaAPi.middleware,
      UserApi.middleware,
      ApiData.middleware
    ),
});

setupListeners(store.dispatch);

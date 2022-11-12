import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const UserApi = createApi({
  reducerPath: "MyUsers",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://backpressapibuilder.herokuapp.com/",
  }),
  endpoints: (builder) => ({
    getAllUser: builder.query<void, void>({
      query: () => ({
        url: `backbackuser`,
        method: "GET",
      }),
    }),
    getOneUser: builder.query<void, String>({
      query: (id) => ({
        url: `backbackuser/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetOneUserQuery, useGetAllUserQuery } = UserApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ApiData = createApi({
  reducerPath: "ApiData",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://backpressapibuilder.herokuapp.com/",
  }),
  endpoints: (builder) => ({
    getAllDataOfSingleSchema: builder.query<void, String>({
      query: (ownId) => ({
        url: `yourData/${ownId}`,
        method: "GET",
      }),
    }),
    getSingleDataOfSingleSchema: builder.query<void, any>({
      query: (Id) => ({
        url: `yourData/${Id}`,
        method: "GET",
      }),
    }),
    deleteAllDataOfSingleSchema: builder.mutation({
      query: (ownId) => ({
        url: `yourData/${ownId}`,
        method: "DELETE",
      }),
    }),
    deleteSingleDataOfSingleSchema: builder.mutation({
      query: (Id) => ({
        url: `yourData/${Id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllDataOfSingleSchemaQuery,
  useDeleteAllDataOfSingleSchemaMutation,
  useGetSingleDataOfSingleSchemaQuery,
  useDeleteSingleDataOfSingleSchemaMutation,
} = ApiData;

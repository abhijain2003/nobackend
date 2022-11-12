import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const SchemaAPi = createApi({
  reducerPath: "SchemaApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://backpressapibuilder.herokuapp.com/",
  }),
  endpoints: (builder) => ({
    getAllSchema: builder.query<void, void>({
      query: () => ({
        url: "myusercustomschema/backbackSchema",
        method: "GET",
      }),
    }),
    getSchemaById: builder.query<void, void>({
      query: (id) => {
        return {
          url: `myusercustomschema/${id}`,
          method: "GET",
        };
      },
    }),
    deleteSchema: builder.mutation({
      query: (id) => {
        return {
          url: `myusercustomschema/${id}`,
          method: "DELETE",
        };
      },
    }),
  }),
});

export const {
  useGetAllSchemaQuery,
  useGetSchemaByIdQuery,
  useDeleteSchemaMutation,
} = SchemaAPi;

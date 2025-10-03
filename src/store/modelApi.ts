import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const modelApi = createApi({
  reducerPath: "modelApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),

  tagTypes: ["Models"],

  endpoints: (build) => ({
    deleteModel: build.mutation<void, number>({
      query: (modelId) => ({
        url: `/models/${modelId}`,
        method: "DELETE",
      }),
      invalidatesTags: (_, __, id) => [{ type: "Models", id: id }],
    }),
  }),
});

export const { useDeleteModelMutation } = modelApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Material } from "@/types/material";

export const materialsApi = createApi({
  reducerPath: "materialsApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),

  tagTypes: ["Materials"],

  endpoints: (build) => ({
    getMaterials: build.query<Material[], void>({
      query: () => "/materials",
      providesTags: [{ type: "Materials", id: "LIST" }],
    }),
  }),
});

export const { useGetMaterialsQuery } = materialsApi;

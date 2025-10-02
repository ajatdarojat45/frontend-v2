import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { ModelDetail } from '@/types/model'

export const modelApi = createApi({
  reducerPath: 'modelApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),

  tagTypes: ['Models'],

  endpoints: (build) => ({

    getModel: build.query<ModelDetail, string>({
      query: (id) => `/models/${id}`,

      providesTags: (_, __, id) => [{ type: 'Models', id }],
    }),

  }),
})

export const {
  useGetModelQuery
} = modelApi
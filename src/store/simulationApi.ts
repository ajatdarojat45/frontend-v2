import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Simulation } from '@/types/simulation'

// Define a service using a base URL and expected endpoints
export const simulationApi = createApi({
  reducerPath: 'simulationApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),

  // Define tag types for cache invalidation
  tagTypes: ['Simulations'],

  endpoints: (build) => ({

    // Get all simulations
    getSimulationsByModelId: build.query<Simulation[], number>({
      query: (modelId) => `/simulations?modelId=${modelId}`,

      // Provides a list of Simulations-type tags for cache invalidation
      providesTags: (_, __, arg) => [{ type: 'Simulations', id: arg }],
    }),

  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetSimulationsByModelIdQuery } = simulationApi
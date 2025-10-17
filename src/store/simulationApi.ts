import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Simulation } from "@/types/simulation";

// Define a service using a base URL and expected endpoints
export const simulationApi = createApi({
  reducerPath: "simulationApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),

  // Define tag types for cache invalidation
  tagTypes: ["Simulations", "SimulationsByModel"],

  endpoints: (build) => ({
    // Get all simulations
    getSimulationsByModelId: build.query<Simulation[], number>({
      query: (modelId) => `/simulations?modelId=${modelId}`,

      // Provides a list of Simulations-type tags for cache invalidation
      providesTags: (_, __, arg) => [{ type: "SimulationsByModel", id: arg }],
    }),

    getSimulation: build.query<Simulation, number>({
      query: (simulationId) => `/simulations/${simulationId}`,

      // Provides a single Simulations-type tag for cache invalidation
      providesTags: (_, __, arg) => [{ type: "Simulations", id: arg }],
    }),

    createSimulation: build.mutation<Simulation, Partial<Simulation>>({
      query: (body) => ({
        url: "/simulations",
        method: "POST",
        body,
      }),

      // Invalidates Simulations-type tags to refetch relevant queries
      invalidatesTags: (_, __, arg) => [{ type: "SimulationsByModel", id: arg.modelId }],
    }),

    // Get simulation by ID
    getSimulationById: build.query<Simulation, number>({
      query: (simulationId) => `/simulations/${simulationId}`,

      // Provides specific simulation tag for cache invalidation
      providesTags: (_, __, arg) => [{ type: "Simulations", id: arg }],
    }),

    // Update simulation by ID
    updateSimulation: build.mutation<Simulation, { id: number; body: Partial<Simulation> }>({
      query: ({ id, body }) => ({
        url: `/simulations/${id}`,
        method: "PUT",
        body,
      }),

      // Invalidates specific simulation and list tags
      invalidatesTags: (_, __, arg) => [
        { type: "Simulations", id: arg.id },
        { type: "Simulations", id: arg.body.modelId },
      ],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetSimulationsByModelIdQuery,
  useLazyGetSimulationsByModelIdQuery,
  useGetSimulationQuery,
  useCreateSimulationMutation,
  useGetSimulationByIdQuery,
  useUpdateSimulationMutation,
} = simulationApi;

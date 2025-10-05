import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const auralizationApi = createApi({
  reducerPath: "auralizationApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),

  // Define tag types for cache invalidation
  tagTypes: ["Auralizations", "ImpulseResponses"],

  endpoints: (build) => ({
    // Get Impulse Response by simulation ID
    getImpulseResponseBySimulationId: build.query<string, number>({
      query: (simulationId) => ({
        url: `/auralizations/${simulationId}/impulse/wav`,
        responseHandler: (response) => response.arrayBuffer(),
      }),
      providesTags: (_, __, simulationId) => [{ type: "ImpulseResponses", id: simulationId }],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetImpulseResponseBySimulationIdQuery } = auralizationApi;

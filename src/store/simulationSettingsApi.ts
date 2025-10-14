import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { SimulationSettingsResponse } from "@/types/simulationSettings";

export const simulationSettingsApi = createApi({
  reducerPath: "simulationSettingsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),
  tagTypes: ["SimulationSettings"],
  endpoints: (builder) => ({
    getSimulationSettings: builder.query<SimulationSettingsResponse, string>({
      query: (simulationType) => `/simulation_settings/${simulationType}`,
      providesTags: ["SimulationSettings"],
    }),
  }),
});

export const { useGetSimulationSettingsQuery } = simulationSettingsApi;

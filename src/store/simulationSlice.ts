import type { Simulation } from "@/types/simulation";
import { createSlice } from "@reduxjs/toolkit";

type SimulationState = {
  activeSimulation: Simulation | null;
};

const simulationSlice = createSlice({
  name: "simulation",
  initialState: {
    activeSimulation: null,
  } as SimulationState,
  reducers: {
    setActiveSimulation: (state, action) => {
      state.activeSimulation = action.payload;
    },
  },
});

export const { setActiveSimulation } = simulationSlice.actions;

export const simulationReducer = simulationSlice.reducer;

import { createSelector } from "@reduxjs/toolkit/react";
import { simulationApi } from "./simulationApi";

import type { RootState } from "./index";
import { selectModelIdsByProjectId } from "./projectSelector";

// Selector to get the count of simulations for a given modelId
export const selectSimulationCountByModelId = (modelId: number) =>
  createSelector(
    (state: RootState) =>
      simulationApi.endpoints.getSimulationsByModelId.select(modelId)(state)?.data,
    (simulations) => (Array.isArray(simulations) ? simulations.length : 0),
  );

// Selector to get the total simulation count for a given projectId
export const selectSimulationCountByProjectId = createSelector(
  (projectId: number) => projectId,
  (projectId) => (state: RootState) => {
    const modelIds = selectModelIdsByProjectId(projectId)(state);
    let total = 0;
    for (const modelId of modelIds) {
      total += selectSimulationCountByModelId(modelId)(state);
    }
    return total;
  },
);

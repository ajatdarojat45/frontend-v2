import { createSelector } from "@reduxjs/toolkit/react";
import { projectApi } from "./projectApi";
import type { RootState } from "./index";

// Selector to get all model ids from a projectId
export const selectModelIdsByProjectId = createSelector(
  (projectId: number) => projectId,
  (projectId) => (state: RootState) => {
    const projects = projectApi.endpoints.getProjects.select()(state)?.data;
    const project = projects?.find((p) => p.id === projectId);
    return project?.models?.map((model) => model.id) || [];
  }
)


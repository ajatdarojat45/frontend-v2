import { createSelector } from "@reduxjs/toolkit/react";
import { projectApi } from "./projectApi";
import type { RootState } from "./index";

// Selector to get all model ids from a projectId
export const selectModelIdsByProjectId = createSelector(
  (projectId: number) => projectId,
  (projectId) => (state: RootState) => {
    // Try to get the project from the cache
    let project = projectApi.endpoints.getProject.select(projectId.toString())(state)?.data;
    if (!project) {
      // If not found, try to get it from the list of projects
      const projects = projectApi.endpoints.getProjects.select()(state)?.data;
      project = projects?.find((p) => p.id === projectId);
    }
    return project?.models?.map((model) => model.id) || [];
  },
);

// Selector to get unique groups from all projects
export const selectGroupsFromProjects = createSelector(
  (state: RootState) => projectApi.endpoints.getProjects.select()(state)?.data,
  (projects) => {
    if (!projects) return [];
    const groupsSet = new Set<string>();
    projects.forEach((project) => {
      if (project.group) {
        groupsSet.add(project.group);
      }
    });
    return Array.from(groupsSet);
  },
);

// Selector to get the active group from the state
export const selectActiveGroup = (state: RootState) => state.project.activeGroup;

// Selector to get projects filtered by the active group
export const selectProjectsByActiveGroup = createSelector(
  (state: RootState) => state.project.activeGroup,
  (state: RootState) => projectApi.endpoints.getProjects.select()(state)?.data,
  (activeGroup, projects) => {
    if (!projects) return [];
    if (activeGroup === "ALL") return projects;
    return projects.filter((project) => project.group === activeGroup);
  },
);

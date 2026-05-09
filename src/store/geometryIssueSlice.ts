import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type GeometryIssueCategory =
  | "degenerate_faces"
  | "t-junction"
  | "intersections"
  | "duplicate_vertices";
export type GeometryIssueType = "vertex" | "edge" | "face";
export type GeometryIssueSeverity = "high" | "medium" | "low";

export type GeometryIssue = {
  type: GeometryIssueType;
  points: number[][];
  severity: GeometryIssueSeverity;
  label?: string;
  message?: string;
};

export type GeometryIssues = Record<GeometryIssueCategory, GeometryIssue[]>;

type GeometryIssuesState = {
  selectedIssue: GeometryIssue | null;
  geometryIssues: GeometryIssues | null;
};

const initialState: GeometryIssuesState = {
  selectedIssue: null,
  geometryIssues: null,
};

const geometryIssueSlice = createSlice({
  name: "tab",
  initialState,
  reducers: {
    setSelectedIssue: (state, action: PayloadAction<GeometryIssue>) => {
      state.selectedIssue = action.payload;
    },
    setGeometryIssues: (state, action: PayloadAction<GeometryIssues>) => {
      state.geometryIssues = action.payload;
    },
  },
});

export const { setGeometryIssues, setSelectedIssue } = geometryIssueSlice.actions;
export const geometryIssueReducer = geometryIssueSlice.reducer;

export interface Simulation {
  completedAt: string;
  createdAt: string;
  description: string;
  hasBeenEdited: boolean;
  id: number;
  layerIdByMaterialId: Record<string, number>;
  modelId: number;
  name: string;
  receivers: Receiver[];
  settingsPreset: string;
  simulationRun: SimulationRun;
  simulationRunId: number;
  solverSettings: SolverSettings;
  sources: Source[];
  status: string;
  taskType: string;
  updatedAt: string;
}

export interface Receiver {
  id: string;
  isValid: boolean;
  label: string;
  orderNumber: number;
  x: number;
  y: number;
  z: number;
  validationError?: string;
}

export interface SimulationRun {
  completedAt: string;
  createdAt: string;
  id: number;
  layerIdByMaterialId: Record<string, number>;
  percentage: number;
  receivers: Receiver[];
  settingsPreset: string;
  simulation: Simulation;
  solverSettings: SolverSettings;
  sources: Source2[];
  status: string;
  taskType: string;
  updatedAt: string;
}

export interface Simulation {
  completedAt: string;
  createdAt: string;
  description: string;
  hasBeenEdited: boolean;
  id: number;
  layerIdByMaterialId: Record<string, number>;
  model: Model;
  modelId: number;
  name: string;
  receivers: Receiver[];
  settingsPreset: string;
  simulationRunId: number;
  solverSettings: SolverSettings;
  sources: Source[];
  status: string;
  taskType: string;
  updatedAt: string;
}

export interface Model {
  id: number;
  modelName: string;
  projectId: number;
  projectName: string;
  projectTag: string;
}

export interface SolverSettings {
  simulationSettings: object;
}

export interface Source {
  id: string;
  label: string;
  orderNumber: number;
  x: number;
  y: number;
  z: number;
  isValid?: boolean;
  validationError?: string;
}

export interface Source2 {
  label: string;
  orderNumber: number;
  percentage: number;
  sourcePointId: string;
  taskStatuses: TaskStatus[];
}

export interface TaskStatus {
  id: number;
  message: unknown;
  percentage: number;
  sourcePointId: string;
  status: string;
  taskType: string;
}

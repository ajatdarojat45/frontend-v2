export interface SimulationSettingOption {
  id: string;
  name: string;
  type: "string" | "integer" | "float";
  display: "text" | "radio";
  default: string | number;
  min?: number;
  max?: number;
  step?: number;
  startAdornment?: string;
  endAdornment?: string;
  options?: Record<string, string>;
}

export interface SimulationSettingsResponse {
  type: string;
  options: SimulationSettingOption[];
}

export interface SimulationSettingsState {
  options: SimulationSettingOption[];
  values: Record<string, string | number>;
  loading: boolean;
  error: string | null;
}

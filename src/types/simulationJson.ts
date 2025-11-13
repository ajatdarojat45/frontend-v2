export interface Material {
  id: number;
  name: string;
  absorptionCoefficients: number[];
  category: string;
  description: string;
}

export interface FormattedSimulationJson {
  simulation_method: string;
  sources: Array<{
    id: string;
    label: string;
    orderNumber: number;
    x: number;
    y: number;
    z: number;
    isValid: boolean;
  }>;
  receivers: Array<{
    id: string;
    label: string;
    orderNumber: number;
    x: number;
    y: number;
    z: number;
    isValid: boolean;
  }>;
  absorption_coefficients: Record<string, number[]>;
  simulationSettings: Record<string, unknown>;
}

import type { Material } from "@/types/material";

export const AVAILABLE_MATERIALS: Material[] = [
  {
    id: 1,
    name: "Acoustic Plaster 68 mm thick",
    description: "High-performance acoustic plaster for sound absorption",
    category: "Acoustic Materials",
    absorptionCoefficients: [0.15, 0.25, 0.6, 0.7, 0.75, 0.8],
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: 2,
    name: "Concrete Wall",
    description: "Standard concrete wall surface",
    category: "Building Materials",
    absorptionCoefficients: [0.01, 0.01, 0.02, 0.02, 0.02, 0.03],
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: 3,
    name: "Carpet - Medium Pile",
    description: "Medium pile carpet on concrete",
    category: "Floor Coverings",
    absorptionCoefficients: [0.08, 0.24, 0.57, 0.69, 0.71, 0.73],
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: 4,
    name: "Glass Window",
    description: "Standard glass window",
    category: "Glass",
    absorptionCoefficients: [0.35, 0.25, 0.18, 0.12, 0.07, 0.04],
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: 5,
    name: "Wood Paneling",
    description: "Wood panel on air space",
    category: "Wood",
    absorptionCoefficients: [0.42, 0.21, 0.1, 0.08, 0.06, 0.06],
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
];

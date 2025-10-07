import * as THREE from "three";

export interface Material {
  createdAt: string;
  name: string;
  absorptionCoefficients: number[];
  description: string;
  id: number;
  category: string;
  updatedAt: string;
}

export interface SurfaceInfo {
  id: string;
  name: string;
  meshId: number;
  materialId?: number;
  faceCount: number;
  area?: number;
  layerId?: string;
  mesh: THREE.Mesh;
}

export interface MaterialAssignment {
  surfaceId: string;
  materialId: number;
}

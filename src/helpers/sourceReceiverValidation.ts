import type { Source } from "@/types/simulation";
import type { SurfaceInfo } from "@/types/material";

export interface ModelBounds {
  min: { x: number; y: number; z: number };
  max: { x: number; y: number; z: number };
}

export interface Point3D {
  x: number;
  y: number;
  z: number;
}

export interface ValidationResult {
  isValid: boolean;
  validationError?: string;
}

const INVISIBLE_SPHERE_RADIUS = 0.2;

export function validateSourceOrReceiver(
  point: Point3D,
  modelBounds: ModelBounds,
  sources: Source[],
  surfaces: SurfaceInfo[],
  excludeSourceId?: string,
): ValidationResult {
  // Check if point is outside the model bounds (x <= 0 case)
  if (
    point.x <= modelBounds.min.x ||
    point.x >= modelBounds.max.x ||
    point.y <= modelBounds.min.y ||
    point.y >= modelBounds.max.y ||
    point.z <= modelBounds.min.z ||
    point.z >= modelBounds.max.z
  ) {
    return {
      isValid: false,
      validationError: "outside the model bounds",
    };
  }

  for (const surface of surfaces) {
    if (surface.boundingBox && isPointTooCloseToSurface(point, surface)) {
      return {
        isValid: false,
        validationError: "too close to the surface",
      };
    }
  }

  for (const source of sources) {
    if (excludeSourceId && source.id === excludeSourceId) {
      continue;
    }

    if (isPointTooCloseToPoint(point, source)) {
      return {
        isValid: false,
        validationError: "too close to a source",
      };
    }
  }

  return { isValid: true };
}

function isPointTooCloseToSurface(point: Point3D, surface: SurfaceInfo): boolean {
  if (!surface.boundingBox) return false;

  const { min, max } = surface.boundingBox;

  const withinXBounds =
    point.x > min.x - INVISIBLE_SPHERE_RADIUS && point.x < max.x + INVISIBLE_SPHERE_RADIUS;
  const withinYBounds =
    point.y > min.y - INVISIBLE_SPHERE_RADIUS && point.y < max.y + INVISIBLE_SPHERE_RADIUS;
  const withinZBounds =
    point.z > min.z - INVISIBLE_SPHERE_RADIUS && point.z < max.z + INVISIBLE_SPHERE_RADIUS;

  if (withinXBounds && withinYBounds && withinZBounds) {
    const distances = [
      Math.abs(point.x - min.x),
      Math.abs(point.x - max.x),
      Math.abs(point.y - min.y),
      Math.abs(point.y - max.y),
      Math.abs(point.z - min.z),
      Math.abs(point.z - max.z),
    ];

    const minDistance = Math.min(...distances);
    return minDistance <= INVISIBLE_SPHERE_RADIUS;
  }

  return false;
}

function isPointTooCloseToPoint(point1: Point3D, point2: Point3D): boolean {
  const distance = Math.sqrt(
    Math.pow(point1.x - point2.x, 2) +
      Math.pow(point1.y - point2.y, 2) +
      Math.pow(point1.z - point2.z, 2),
  );

  return distance <= INVISIBLE_SPHERE_RADIUS;
}

export function getModelBounds(surfaces: SurfaceInfo[]): ModelBounds {
  if (surfaces.length === 0) {
    return {
      min: { x: 0, y: 0, z: 0 },
      max: { x: 10, y: 10, z: 10 },
    };
  }

  let minX = Infinity;
  let minY = Infinity;
  let minZ = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  let maxZ = -Infinity;

  for (const surface of surfaces) {
    if (surface.boundingBox) {
      const { min, max } = surface.boundingBox;

      minX = Math.min(minX, min.x);
      minY = Math.min(minY, min.y);
      minZ = Math.min(minZ, min.z);

      maxX = Math.max(maxX, max.x);
      maxY = Math.max(maxY, max.y);
      maxZ = Math.max(maxZ, max.z);
    }
  }

  return {
    min: { x: minX, y: minY, z: minZ },
    max: { x: maxX, y: maxY, z: maxZ },
  };
}

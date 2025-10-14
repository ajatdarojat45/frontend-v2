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

const PROXIMITY_THRESHOLD = 0.5;

export function validateSourceOrReceiver(
  point: Point3D,
  modelBounds: ModelBounds,
  sources: Source[],
  surfaces: SurfaceInfo[],
  excludeSourceId?: string,
): ValidationResult {
  for (const surface of surfaces) {
    if (surface.boundingBox && isPointTooCloseToSurface(point, surface)) {
      return {
        isValid: false,
        validationError: "the receiver is too close to the surface",
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
        validationError: "the receiver is too close to a source",
      };
    }
  }

  if (
    point.x < modelBounds.min.x ||
    point.x > modelBounds.max.x ||
    point.y < modelBounds.min.y ||
    point.y > modelBounds.max.y ||
    point.z < modelBounds.min.z ||
    point.z > modelBounds.max.z
  ) {
    return {
      isValid: false,
      validationError: "the receiver is outside the model",
    };
  }

  return { isValid: true };
}

function isPointTooCloseToSurface(point: Point3D, surface: SurfaceInfo): boolean {
  if (!surface.boundingBox) return false;

  const { min, max } = surface.boundingBox;

  const withinXBounds =
    point.x >= min.x - PROXIMITY_THRESHOLD && point.x <= max.x + PROXIMITY_THRESHOLD;
  const withinYBounds =
    point.y >= min.y - PROXIMITY_THRESHOLD && point.y <= max.y + PROXIMITY_THRESHOLD;
  const withinZBounds =
    point.z >= min.z - PROXIMITY_THRESHOLD && point.z <= max.z + PROXIMITY_THRESHOLD;

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
    return minDistance <= PROXIMITY_THRESHOLD;
  }

  return false;
}

function isPointTooCloseToPoint(point1: Point3D, point2: Point3D): boolean {
  const distance = Math.sqrt(
    Math.pow(point1.x - point2.x, 2) +
      Math.pow(point1.y - point2.y, 2) +
      Math.pow(point1.z - point2.z, 2),
  );

  return distance <= PROXIMITY_THRESHOLD;
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

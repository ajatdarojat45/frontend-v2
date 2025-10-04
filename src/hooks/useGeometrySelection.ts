import { useState, useCallback } from "react";
import * as THREE from "three";

export interface SelectedGeometry {
  mesh: THREE.Mesh;
  faceIndex: number;
  point: THREE.Vector3;
  materialId?: string;
}

export function useGeometrySelection() {
  const [selectedGeometry, setSelectedGeometry] = useState<SelectedGeometry | null>(null);
  const [highlightedMeshes, setHighlightedMeshes] = useState<Set<THREE.Mesh>>(new Set());

  const selectGeometry = useCallback((geometry: SelectedGeometry | null) => {
    setSelectedGeometry(geometry);
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedGeometry(null);
  }, []);

  const addHighlightedMesh = useCallback((mesh: THREE.Mesh) => {
    setHighlightedMeshes((prev) => new Set(prev).add(mesh));
  }, []);

  const removeHighlightedMesh = useCallback((mesh: THREE.Mesh) => {
    setHighlightedMeshes((prev) => {
      const newSet = new Set(prev);
      newSet.delete(mesh);
      return newSet;
    });
  }, []);

  const clearHighlights = useCallback(() => {
    setHighlightedMeshes(new Set());
  }, []);

  return {
    selectedGeometry,
    highlightedMeshes,
    selectGeometry,
    clearSelection,
    addHighlightedMesh,
    removeHighlightedMesh,
    clearHighlights,
  };
}

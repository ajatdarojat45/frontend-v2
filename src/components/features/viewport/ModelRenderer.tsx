import { useRef, useState, useCallback, useMemo } from "react";
import { useThree } from "@react-three/fiber";
import { useDispatch, useSelector } from "react-redux";
import { useModelLoader } from "@/hooks/useModelLoader";
import { useGeometrySelection } from "@/hooks/useGeometrySelection";
import { createEdgeOutlineForObject3D } from "@/helpers/layerProcessor";
import { selectSource, selectReceiver } from "@/store/sourceReceiverSlice";
import type { RootState } from "@/store";
import * as THREE from "three";
import type { ModelRendererProps } from "@/types/modelViewport";

type MaterialWithUuid = THREE.Material & { uuid: string };

const HIGHLIGHT_COLOR = 0x006600;
const HOVER_COLOR = 0x888888;
const ORIGINAL_COLOR_CACHE = new WeakMap<THREE.Material, number | THREE.Color>();

export function ModelRenderer({ modelId }: ModelRendererProps) {
  const dispatch = useDispatch();
  const selectedSource = useSelector((state: RootState) => state.sourceReceiver.selectedSource);
  const selectedReceiver = useSelector((state: RootState) => state.sourceReceiver.selectedReceiver);
  const isTransforming = useSelector((state: RootState) => state.sourceReceiver.isTransforming);
  const { getCurrentModel, currentModelId } = useModelLoader();
  const {
    selectedGeometry,
    selectGeometry,
    clearSelection,
    highlightedMeshes,
    addHighlightedMesh,
    removeHighlightedMesh,
  } = useGeometrySelection();
  const { camera, raycaster, pointer, gl } = useThree();
  const groupRef = useRef<THREE.Group>(null);
  const [hoveredMesh, setHoveredMesh] = useState<THREE.Mesh | null>(null);

  const modelData = getCurrentModel();

  const edgeOutline = useMemo(() => {
    if (modelData?.object3D && currentModelId === modelId) {
      return createEdgeOutlineForObject3D(modelData.object3D, 40);
    }
    return null;
  }, [modelData?.object3D, currentModelId, modelId]);

  const highlightMesh = useCallback((mesh: THREE.Mesh, color: number) => {
    if (!mesh.material) return;

    const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];

    materials.forEach((material) => {
      if (!ORIGINAL_COLOR_CACHE.has(material)) {
        if (
          material instanceof THREE.MeshStandardMaterial ||
          material instanceof THREE.MeshBasicMaterial
        ) {
          ORIGINAL_COLOR_CACHE.set(material, material.color.getHex());
        }
      }

      if (
        material instanceof THREE.MeshStandardMaterial ||
        material instanceof THREE.MeshBasicMaterial
      ) {
        material.color.setHex(color);
      }
    });
  }, []);

  const restoreOriginalColor = useCallback((mesh: THREE.Mesh) => {
    if (!mesh.material) return;

    const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];

    materials.forEach((material) => {
      const originalColor = ORIGINAL_COLOR_CACHE.get(material);
      if (originalColor !== undefined) {
        if (
          material instanceof THREE.MeshStandardMaterial ||
          material instanceof THREE.MeshBasicMaterial
        ) {
          if (typeof originalColor === "number") {
            material.color.setHex(originalColor);
          } else {
            material.color.copy(originalColor);
          }
        }
      }
    });
  }, []);

  const handlePointerMove = useCallback(() => {
    if (!groupRef.current) return;

    const meshes: THREE.Mesh[] = [];
    groupRef.current.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        meshes.push(child);
      }
    });

    raycaster.setFromCamera(pointer, camera);
    const intersects = raycaster.intersectObjects(meshes);

    if (intersects.length > 0) {
      const newHoveredMesh = intersects[0].object as THREE.Mesh;
      if (newHoveredMesh !== hoveredMesh) {
        if (hoveredMesh && !highlightedMeshes.has(hoveredMesh)) {
          restoreOriginalColor(hoveredMesh);
        }

        if (!highlightedMeshes.has(newHoveredMesh)) {
          highlightMesh(newHoveredMesh, HOVER_COLOR);
        }

        setHoveredMesh(newHoveredMesh);
      }
    } else {
      if (hoveredMesh && !highlightedMeshes.has(hoveredMesh)) {
        restoreOriginalColor(hoveredMesh);
      }
      setHoveredMesh(null);
    }
  }, [
    hoveredMesh,
    highlightedMeshes,
    restoreOriginalColor,
    highlightMesh,
    camera,
    raycaster,
    pointer,
    gl,
  ]);

  const handleClick = useCallback(() => {
    if (!groupRef.current) return;

    if (!isTransforming && (selectedSource || selectedReceiver)) {
      dispatch(selectSource(null));
      dispatch(selectReceiver(null));
    }

    const meshes: THREE.Mesh[] = [];
    groupRef.current.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        meshes.push(child);
      }
    });

    raycaster.setFromCamera(pointer, camera);
    const intersects = raycaster.intersectObjects(meshes);

    if (intersects.length > 0) {
      const intersection = intersects[0];
      const mesh = intersection.object as THREE.Mesh;

      if (selectedGeometry?.mesh && selectedGeometry.mesh !== mesh) {
        removeHighlightedMesh(selectedGeometry.mesh);
        restoreOriginalColor(selectedGeometry.mesh);
      }

      highlightMesh(mesh, HIGHLIGHT_COLOR);
      addHighlightedMesh(mesh);

      selectGeometry({
        mesh,
        faceIndex: intersection.faceIndex || 0,
        point: intersection.point,
        materialId: mesh.material ? (mesh.material as MaterialWithUuid).uuid : undefined,
      });

      if (!mesh.userData.meshId) {
        let meshCount = 0;
        groupRef.current?.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            if (!child.userData.meshId) {
              child.userData.meshId = ++meshCount;
            }
          }
        });
      }
    } else {
      if (selectedGeometry?.mesh) {
        removeHighlightedMesh(selectedGeometry.mesh);
        restoreOriginalColor(selectedGeometry.mesh);
      }
      clearSelection();
    }
  }, [
    selectedGeometry,
    removeHighlightedMesh,
    restoreOriginalColor,
    highlightMesh,
    addHighlightedMesh,
    selectGeometry,
    clearSelection,
    dispatch,
    selectedSource,
    selectedReceiver,
    isTransforming,
    camera,
    raycaster,
    pointer,
  ]);

  if (currentModelId !== modelId || !modelData) {
    return null;
  }

  return (
    <group ref={groupRef} onPointerMove={handlePointerMove} onClick={handleClick}>
      <mesh position={[0, 0, -1000]} visible={false}>
        <planeGeometry args={[10000, 10000]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      <primitive object={modelData.object3D} />
      {edgeOutline && <primitive object={edgeOutline} />}
    </group>
  );
}

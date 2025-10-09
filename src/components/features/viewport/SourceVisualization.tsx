import { useSelector, useDispatch } from "react-redux";
import { useRef } from "react";
import { Text, TransformControls } from "@react-three/drei";
import { useThree, type ThreeEvent } from "@react-three/fiber";
import type { RootState } from "@/store";
import type { Source } from "@/types/simulation";
import { updateSource, selectSource } from "@/store/sourceReceiverSlice";
import * as THREE from "three";

function SourcePoint({
  source,
  isSelected,
  onSourceClick,
  onTransformEnd,
}: {
  source: Source;
  isSelected: boolean;
  onSourceClick: (sourceId: string, event: ThreeEvent<MouseEvent>) => void;
  onTransformEnd: (sourceId: string, position: THREE.Vector3) => void;
}) {
  const { gl } = useThree();
  const meshRef = useRef<THREE.Mesh>(null);
  const transformRef = useRef(null);

  const handleTransformEnd = () => {
    if (!transformRef.current || !meshRef.current) return;
    const position = meshRef.current.position;
    onTransformEnd(source.id, position);
  };

  return (
    <group>
      <group position={[source.x, source.y, source.z]}>
        {/* Source point sphere with cyan color matching the UI */}
        <mesh
          ref={meshRef}
          onClick={(e) => onSourceClick(source.id, e)}
          onPointerOver={(e: ThreeEvent<PointerEvent>) => {
            e.stopPropagation();
            gl.domElement.style.cursor = "pointer";
          }}
          onPointerOut={(e: ThreeEvent<PointerEvent>) => {
            e.stopPropagation();
            gl.domElement.style.cursor = "auto";
          }}
        >
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshBasicMaterial color={isSelected ? "#fbbf24" : "#22d3ee"} />
        </mesh>

        {/* Source label */}
        <Text
          position={[0, 0, 0.3]}
          fontSize={0.2}
          color={isSelected ? "#fbbf24" : "#06b6d4"}
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.02}
          outlineColor="#000000"
        >
          {`S_${source.orderNumber}`}
        </Text>
      </group>

      {/* Transform controls for selected source */}
      {isSelected && meshRef.current && (
        <TransformControls
          ref={transformRef}
          object={meshRef.current}
          mode="translate"
          size={0.8}
          showX={true}
          showY={true}
          showZ={true}
          space="world"
          onMouseUp={handleTransformEnd}
        />
      )}
    </group>
  );
}

export function SourceVisualization() {
  const dispatch = useDispatch();
  const sources = useSelector((state: RootState) => state.sourceReceiver.sources);
  const selectedSource = useSelector((state: RootState) => state.sourceReceiver.selectedSource);

  const handleSourceClick = (sourceId: string, event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    dispatch(selectSource(selectedSource === sourceId ? null : sourceId));
  };

  const handleTransformEnd = (sourceId: string, position: THREE.Vector3) => {
    dispatch(updateSource({ id: sourceId, field: "x", value: Number(position.x.toFixed(2)) }));
    dispatch(updateSource({ id: sourceId, field: "y", value: Number(position.y.toFixed(2)) }));
    dispatch(updateSource({ id: sourceId, field: "z", value: Number(position.z.toFixed(2)) }));
  };

  return (
    <>
      {sources.map((source: Source) => (
        <SourcePoint
          key={source.id}
          source={source}
          isSelected={selectedSource === source.id}
          onSourceClick={handleSourceClick}
          onTransformEnd={handleTransformEnd}
        />
      ))}
    </>
  );
}

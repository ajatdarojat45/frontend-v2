import { useSelector, useDispatch } from "react-redux";
import { useRef, useEffect } from "react";
import { Text, TransformControls } from "@react-three/drei";
import { useThree, type ThreeEvent } from "@react-three/fiber";
import type { RootState } from "@/store";
import type { Receiver } from "@/types/simulation";
import { updateReceiver, selectReceiver } from "@/store/sourceReceiverSlice";
import { useSourceReceiverApi } from "@/hooks/useSourceReceiverApi";
import {
  OrbitControls as OrbitControlsType,
  TransformControls as TransformControlsType,
} from "three-stdlib";
import * as THREE from "three";

function ReceiverPoint({
  receiver,
  isSelected,
  onReceiverClick,
  onTransformEnd,
  orbitControlsRef,
}: {
  receiver: Receiver;
  isSelected: boolean;
  onReceiverClick: (receiverId: string, event: ThreeEvent<MouseEvent>) => void;
  onTransformEnd: (receiverId: string, position: THREE.Vector3) => void;
  orbitControlsRef: React.RefObject<OrbitControlsType | null>;
}) {
  const { gl, scene } = useThree();
  const meshRef = useRef<THREE.Mesh>(null);
  const transformRef = useRef<TransformControlsType | null>(null);

  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.uuid = receiver.id;
    }
  }, [receiver.id]);

  return (
    <group>
      <mesh
        ref={meshRef}
        position={[receiver.x, receiver.y, receiver.z]}
        onClick={(e) => {
          if (!isSelected) {
            onReceiverClick(receiver.id, e);
          }
        }}
        onPointerOver={(e: ThreeEvent<PointerEvent>) => {
          e.stopPropagation();
          gl.domElement.style.cursor = isSelected ? "auto" : "pointer";
        }}
        onPointerOut={(e: ThreeEvent<PointerEvent>) => {
          e.stopPropagation();
          gl.domElement.style.cursor = "auto";
        }}
        onPointerDown={(e: ThreeEvent<PointerEvent>) => {
          if (isSelected) {
            e.stopPropagation();
          }
        }}
      >
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshBasicMaterial color={isSelected ? "#fbbf24" : "#eab308"} />
      </mesh>

      <Text
        position={[receiver.x, receiver.y, receiver.z + 0.3]}
        fontSize={0.2}
        color={isSelected ? "#fbbf24" : "#eab308"}
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#000000"
      >
        {`R_${receiver.orderNumber}`}
      </Text>

      {isSelected && (
        <TransformControls
          ref={transformRef}
          object={scene.getObjectByProperty("uuid", receiver.id) as THREE.Object3D}
          size={0.5}
          mode="translate"
          matrixAutoUpdate={false}
          onMouseDown={() => {
            if (orbitControlsRef?.current) {
              orbitControlsRef.current.enabled = false;
            }
          }}
          onMouseUp={() => {
            if (orbitControlsRef?.current) {
              orbitControlsRef.current.enabled = true;
            }

            const mesh = scene.getObjectByProperty("uuid", receiver.id) as THREE.Mesh;
            if (mesh) {
              const finalX = +mesh.position.x.toFixed(2);
              const finalY = +mesh.position.y.toFixed(2);
              const finalZ = +mesh.position.z.toFixed(2);

              onTransformEnd(receiver.id, new THREE.Vector3(finalX, finalY, finalZ));
            }
          }}
        />
      )}
    </group>
  );
}

interface ReceiverVisualizationProps {
  orbitControlsRef: React.RefObject<OrbitControlsType | null>;
}

export function ReceiverVisualization({ orbitControlsRef }: ReceiverVisualizationProps) {
  const dispatch = useDispatch();
  const receivers = useSelector((state: RootState) => state.sourceReceiver.receivers);
  const selectedReceiver = useSelector((state: RootState) => state.sourceReceiver.selectedReceiver);
  const { updateReceiversData } = useSourceReceiverApi();

  const handleReceiverClick = (receiverId: string, event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    dispatch(selectReceiver(selectedReceiver === receiverId ? null : receiverId));
  };

  const handleTransformEnd = (receiverId: string, position: THREE.Vector3) => {
    // Update Redux state
    dispatch(updateReceiver({ id: receiverId, field: "x", value: Number(position.x.toFixed(2)) }));
    dispatch(updateReceiver({ id: receiverId, field: "y", value: Number(position.y.toFixed(2)) }));
    dispatch(updateReceiver({ id: receiverId, field: "z", value: Number(position.z.toFixed(2)) }));

    const updatedReceivers = receivers.map((receiver) =>
      receiver.id === receiverId
        ? {
            ...receiver,
            x: Number(position.x.toFixed(2)),
            y: Number(position.y.toFixed(2)),
            z: Number(position.z.toFixed(2)),
          }
        : receiver,
    );
    updateReceiversData(updatedReceivers);
  };

  return (
    <>
      {receivers.map((receiver) => (
        <ReceiverPoint
          key={receiver.id}
          receiver={receiver}
          isSelected={selectedReceiver === receiver.id}
          onReceiverClick={handleReceiverClick}
          onTransformEnd={handleTransformEnd}
          orbitControlsRef={orbitControlsRef}
        />
      ))}
    </>
  );
}

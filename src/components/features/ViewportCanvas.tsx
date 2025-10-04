import { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Grid, GizmoHelper, GizmoViewport } from "@react-three/drei";
import { Button } from "@/components/ui/button";
import { useModelLoader } from "@/hooks/useModelLoader";
import { ModelRenderer } from "./ModelRenderer";
import { GeometrySelectionInfo } from "./GeometrySelectionInfo";
import type { ViewportCanvasProps } from "@/types/modelViewport";

export function ViewportCanvas({ modelUrl, modelId }: ViewportCanvasProps) {
  const [cameraType, setCameraType] = useState<"perspective" | "orthographic">("perspective");
  const { loadModelFromUrl, isModelLoaded, isLoading, error, setActiveModel } = useModelLoader();

  useEffect(() => {
    if (modelUrl && modelId) {
      if (!isModelLoaded(modelId)) {
        loadModelFromUrl(modelId, modelUrl).catch(console.error);
      } else {
        setActiveModel(modelId);
      }
    }
  }, [modelUrl, modelId, loadModelFromUrl, isModelLoaded, setActiveModel]);

  const toggleCameraType = () => {
    setCameraType((prev) => (prev === "perspective" ? "orthographic" : "perspective"));
  };

  return (
    <div
      className="w-full h-full relative min-h-[300px] overflow-hidden touch-none"
      style={{ height: "100%" }}
    >
      {isLoading(modelId) && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 bg-black bg-opacity-50 text-white px-4 py-2 rounded">
          Loading model...
        </div>
      )}

      {error && (
        <div className="absolute top-4 left-4 z-20 bg-red-500 text-white px-4 py-2 rounded">
          Error: {error}
        </div>
      )}

      <Button
        onClick={toggleCameraType}
        variant="outline"
        size="sm"
        className="absolute top-2 right-2 z-10 cursor-pointer hover:bg-accent"
      >
        <span className="hidden sm:inline">
          {cameraType === "perspective" ? "Perspective" : "Orthographic"}
        </span>
        <span className="sm:hidden">{cameraType === "perspective" ? "Persp" : "Ortho"}</span>
      </Button>
      <Canvas
        key={cameraType}
        camera={{
          position: [-10, -10, 10],
          fov: 75,
          up: [0, 0, 1],
          ...(cameraType === "orthographic" && {
            zoom: 1,
            left: -10,
            right: 10,
            top: 10,
            bottom: -10,
          }),
        }}
        orthographic={cameraType === "orthographic"}
        style={{ background: "#596B6B" }}
        gl={{ preserveDrawingBuffer: true }}
        onCreated={({ gl }) => {
          gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[1, 1, 1]} intensity={30} />
        <directionalLight position={[-1, -1, 1]} intensity={30} />
        <directionalLight position={[1, -1, 1]} intensity={30} />
        <directionalLight position={[-1, 1, 1]} intensity={30} />
        <directionalLight position={[1, 1, -1]} intensity={30} />
        <directionalLight position={[-1, 1, -1]} intensity={20} />
        <axesHelper args={[50 / 2]} />
        <Grid
          position={[0, 0, 0]}
          rotation={[Math.PI / 2, 0, 0]}
          args={[50, 50]}
          cellSize={1}
          cellThickness={0.7}
          cellColor="#5B6D6D"
          sectionSize={5}
          sectionThickness={1.2}
          sectionColor="#5B6D6D"
          infiniteGrid={false}
          fadeDistance={100}
          fadeStrength={1}
          side={2}
        />
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          enableDamping={false}
          dampingFactor={0}
          target={[0, 0, 0]}
          minDistance={1}
          maxDistance={1000}
          zoomSpeed={0.5}
        />
        <GizmoHelper alignment="top-right" margin={[60, 100]}>
          <GizmoViewport axisColors={["red", "green", "blue"]} labelColor="black" />
        </GizmoHelper>

        {modelId && <ModelRenderer modelId={modelId} />}
      </Canvas>

      {/* Selection Info Panel */}
      <div className="absolute bottom-4 left-4 z-10">
        <GeometrySelectionInfo />
      </div>
    </div>
  );
}

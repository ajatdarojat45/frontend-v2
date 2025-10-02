import { useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Grid, GizmoHelper, GizmoViewport } from '@react-three/drei'
import * as THREE from 'three'
import { Button } from '@/components/ui/button'

interface ViewportCanvasProps {
  modelUrl?: string
  modelId?: number
}

export function ViewportCanvas({ modelUrl, modelId }: ViewportCanvasProps) {
  const [cameraType, setCameraType] = useState<'perspective' | 'orthographic'>('perspective')

  const toggleCameraType = () => {
    setCameraType(prev => prev === 'perspective' ? 'orthographic' : 'perspective')
  }

  return (
    <div className="w-full h-full relative min-h-[300px] overflow-hidden">
      <Button
        onClick={toggleCameraType}
        variant="outline"
        size="sm"
        className="absolute top-2 right-2 z-10 bg-gray-800 text-white border-gray-600 hover:bg-gray-700 text-xs sm:text-sm"
      >
        <span className="hidden sm:inline">{cameraType === 'perspective' ? 'Perspective' : 'Orthographic'}</span>
        <span className="sm:hidden">{cameraType === 'perspective' ? 'Persp' : 'Ortho'}</span>
      </Button>
      <Canvas
        key={cameraType}
        camera={{
          position: [-10, -10, 10],
          fov: 75,
          zoom: cameraType === 'orthographic' ? 50 : 1.5,
          up: [0, 0, 1],
        }}
        orthographic={cameraType === 'orthographic'}
        style={{ background: '#596B6B' }}
        gl={{ preserveDrawingBuffer: true }}
        onCreated={({ gl }) => {
          gl.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <axesHelper args={[50 / 2]} />
        <Grid
          position={[0, 0, -0.00005]}
          rotation={[Math.PI / 2, 0, 0]}
          args={[50, 50]}
          cellSize={1}
          cellThickness={0.7}
          cellColor="#5B6D6D"
          sectionSize={5}
          sectionThickness={1}
          sectionColor="#5B6D6D"
        />
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          enableDamping={false}
          dampingFactor={0}
          target={[0, 0, 0]}
        />
        <GizmoHelper
            alignment="top-right"
            margin={[60, 100]}
            >
            <GizmoViewport axisColors={['red', 'green', 'blue']} labelColor="black" />
        </GizmoHelper>
      </Canvas>
    </div>
  )
}
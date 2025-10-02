import * as THREE from 'three'

export interface LayerInfo {
  id: string
  name: string
  visible: boolean
  meshes: THREE.Mesh[]
  material?: THREE.Material
  color?: string
  children?: LayerInfo[]
}

export interface RhinoFileData {
  modelId: number
  fileName: string
  rawData: ArrayBuffer // Raw 3dm file data
  object3D: THREE.Object3D // Parsed ThreeJS object
  layers: LayerInfo[] // Organized layer structure
  loadedAt: number
}

export interface LayerState {
  rhinoFiles: Record<number, RhinoFileData> // keyed by model ID
  currentModelId: number | null
  loading: boolean
  error: string | null
}
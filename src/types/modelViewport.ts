export interface ModelViewerProps {
  modelId: string;
  useClone?: boolean;
  isRepair?: boolean;
  showGeometrySelectionInfo?: boolean;
}

export interface ModelRendererProps {
  modelId: number;
  viewMode: "solid" | "ghosted" | "wireframe";
  useClone?: boolean;
}

export interface ViewportCanvasProps {
  modelUrl?: string;
  modelId?: number;
  useClone?: boolean;
  isRepair?: boolean;
  showGeometrySelectionInfo?: boolean;
}

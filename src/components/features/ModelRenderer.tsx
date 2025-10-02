import { useModelLoader } from "@/hooks/useModelLoader";

interface ModelRendererProps {
  modelId: number;
}

export function ModelRenderer({ modelId }: ModelRendererProps) {
  const { getCurrentModel, currentModelId } = useModelLoader();

  if (currentModelId !== modelId) {
    return null;
  }

  const modelData = getCurrentModel();
  if (!modelData) {
    return null;
  }

  return <primitive object={modelData.object3D} />;
}

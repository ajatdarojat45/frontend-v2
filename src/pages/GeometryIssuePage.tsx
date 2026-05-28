import GeometryIssueSidebar from "@/components/features/GeometryIssueSidebar";
import { ModelViewer } from "@/components/features/viewport/ModelViewer";
import { AppLayout } from "@/components/ui/app-layout";
import { useGetModelQuery } from "@/store/modelApi";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";

export function GeometryIssuePage() {
  const navigate = useNavigate();
  const { modelId } = useParams() as { modelId: string };
  const { data: model } = useGetModelQuery(modelId);

  useEffect(() => {
    // Redirect back when the model does not contain geometry data.
    if (model && !model.hasGeo) {
      navigate(`/editor/${modelId}`);
    }
  }, [model, navigate, modelId]);

  return (
    <AppLayout title="Issue Page" headerVariant="light" sidebar={<GeometryIssueSidebar />}>
      <div className="h-full w-full">
        <ModelViewer modelId={modelId} />
      </div>
    </AppLayout>
  );
}

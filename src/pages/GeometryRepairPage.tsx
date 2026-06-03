import GeometryIssueSidebar from "@/components/features/GeometryIssueSidebar";
import GeometryRepairSidebar from "@/components/features/GeometryRepairSidebar";
import { ModelViewer } from "@/components/features/viewport/ModelViewer";
import { AppLayout } from "@/components/ui/app-layout";
// import { useGetModelQuery } from "@/store/modelApi";
// import { useEffect } from "react";
import { useParams } from "react-router";

export function GeometryRepairPage() {
  // const navigate = useNavigate();
  const { modelId } = useParams() as { modelId: string };
  // const { data: model } = useGetModelQuery(modelId);

  // useEffect(() => {
  //   // Redirect back when the model does not contain geometry data.
  //   if (model && !model.hasGeo) {
  //     navigate(`/editor/${modelId}`);
  //   }
  // }, [model, navigate, modelId]);

  return (
    <AppLayout
      title="Repair Page"
      headerVariant="light"
      sidebar={
        <GeometryIssueSidebar
          showPossibleSimulation={false}
          showQuickAction={false}
          showRepairButton={false}
        />
      }
      rightSidebar={<GeometryRepairSidebar />}
    >
      <div className="h-full w-full flex">
        <div className="flex-1 h-full">
          <ModelViewer modelId={modelId} showGeometrySelectionInfo={false} />
        </div>
        <div className="w-px bg-border h-full" />
        <div className="flex-1 h-full">
          <ModelViewer
            modelId={modelId}
            useClone
            isRepair={true}
            showGeometrySelectionInfo={false}
          />
        </div>
      </div>
    </AppLayout>
  );
}

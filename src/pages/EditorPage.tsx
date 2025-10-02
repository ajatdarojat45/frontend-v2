import { ViewportCanvas } from "@/components/features/ViewportCanvas";
import { AppLayout } from "@/components/ui/app-layout";
import { useParams } from "react-router";
import { useGetModelQuery } from "@/store/modelApi";
import { Loading } from "@/components/ui/loading";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";

export function EditorPage() {
  const { id } = useParams() as { id: string };
  const { data: model, isLoading, error } = useGetModelQuery(id);

  const renderContent = () => {
    if (error) {
      return (
        <div className="flex flex-col items-center justify-center h-full min-h-[300px]">
          <Alert variant="destructive" className="max-w-sm">
            <AlertCircleIcon />
            <AlertTitle>Error loading model</AlertTitle>
          </Alert>
        </div>
      );
    }

    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center h-full min-h-[300px]">
          <Loading message="Loading viewport" />
        </div>
      );
    }

    if (!model) {
      return (
        <div className="flex flex-col items-center justify-center h-full min-h-[300px]">
          <div>No model found</div>
        </div>
      );
    }

    return (
      <div className="h-full" style={{ height: "calc(100vh - 4rem)" }}>
        <ViewportCanvas modelUrl={model.modelUrl} modelId={model.id} />
      </div>
    );
  };

  return (
    <AppLayout
      title={model ? `Editor - ${model.modelName}` : "Editor"}
      sidebar={model ? <div /> : <h1>Tools</h1>}
    >
      {renderContent()}
    </AppLayout>
  );
}

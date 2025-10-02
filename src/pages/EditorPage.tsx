import { ViewportCanvas } from "@/components/features/ViewportCanvas";
import { AppLayout } from "@/components/ui/app-layout";
import { Button } from "@/components/ui/button";
import { Link, useParams } from "react-router";
import { useGetModelQuery } from "@/store/modelApi";
import { Loading } from "@/components/ui/loading";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";

export function EditorPage() {
  const { id } = useParams() as { id: string }
  const { data: model, isLoading, error } = useGetModelQuery(id)

  if (error) {
    return (
      <AppLayout
        title="Editor"
        action={
          <Button asChild>
            <Link to="/">Back to Home</Link>
          </Button>
        }
        sidebar={<h1>Tools</h1>}
      >
        <div className="flex flex-col items-center justify-center h-full min-h-[300px]">
          <Alert variant="destructive" className="max-w-sm">
            <AlertCircleIcon />
            <AlertTitle>Error loading model</AlertTitle>
          </Alert>
        </div>
      </AppLayout>
    )
  }

  if (isLoading) {
    return (
      <AppLayout
        title="Editor"
        action={
          <Button asChild>
            <Link to="/">Back to Home</Link>
          </Button>
        }
        sidebar={<h1>Tools</h1>}
      >
        <div className="flex flex-col items-center justify-center h-full min-h-[300px]">
          <Loading message="Loading model..." />
        </div>
      </AppLayout>
    )
  }

  if (!model) {
    return (
      <AppLayout
        title="Editor"
        action={
          <Button asChild>
            <Link to="/">Back to Home</Link>
          </Button>
        }
        sidebar={<h1>Tools</h1>}
      >
        <div className="flex flex-col items-center justify-center h-full min-h-[300px]">
          <div>No model found</div>
        </div>
      </AppLayout>
    )
  }

  return (
    <AppLayout
      title={`Editor - ${model.modelName}`}
      action={
        <Button asChild>
          <Link to="/">Back to Home</Link>
        </Button>
      }
      sidebar={<div/>}
    >
      <div className="h-full">
        <ViewportCanvas modelUrl={model.modelUrl} modelId={model.id} />
      </div>
    </AppLayout>
  );
}

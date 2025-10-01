import { ModelCard } from "@/components/features/ModelCard";
import { UploadModel } from "@/components/features/UploadModel";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { AppLayout } from "@/components/ui/app-layout";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loading } from "@/components/ui/loading";
import { useGetProjectQuery } from "@/store/projectApi";
import { AlertCircleIcon, CalendarIcon, ClockIcon, FolderIcon, UsersIcon } from "lucide-react";
import type React from "react";
import { useParams } from "react-router";

export function ProjectDetailPage() {
  const { id } = useParams() as { id: string };
  const { data: project, isLoading, error, refetch } = useGetProjectQuery(id);

  let content: React.ReactNode = null;

  if (error) {
    content = (
      <div className="flex flex-col items-center justify-center h-full min-h-[300px]">
        <Alert variant="destructive" className="max-w-sm">
          <AlertCircleIcon />
          <AlertTitle>Error loading project</AlertTitle>
        </Alert>
      </div>
    );
  } else if (isLoading) {
    content = (
      <div className="flex flex-col items-center justify-center h-full min-h-[300px]">
        <Loading message="Loading project..." />
      </div>
    );
  } else if (!project) {
    content = <div>No project found</div>;
  } else {
    content = (
      <div className="space-y-6 p-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FolderIcon className="h-5 w-5" />
              {project.name}
            </CardTitle>
            <CardDescription>{project.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <UsersIcon className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Group:</span> {project.group}
              </div>
              <div className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Created:</span>{" "}
                {new Date(project.createdAt).toLocaleDateString()}
              </div>
              <div className="flex items-center gap-2">
                <ClockIcon className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Updated:</span>{" "}
                {new Date(project.updatedAt).toLocaleDateString()}
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">ID:</span> {project.id}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UsersIcon className="h-5 w-5" />
              Models ({project.models?.length || 0})
            </CardTitle>
            <CardDescription>Associated models for this project</CardDescription>
            <CardAction>
              <UploadModel projectId={id} onSuccess={refetch} />
            </CardAction>
          </CardHeader>
          <CardContent>
            {project.models && project.models.length > 0 ? (
              <div className="space-y-6">
                {project.models.map((model) => (
                  <ModelCard key={model.id} model={model} />
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No models associated with this project.</p>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <AppLayout title={project ? project.name : "Project Detail"} sidebar={<h1>Sidebar</h1>}>
      {content}
    </AppLayout>
  );
}

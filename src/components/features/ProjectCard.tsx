import type { Project } from "@/types/project";
import { Card, CardHeader, CardTitle, CardContent, CardAction } from "@/components/ui/card";
import modelImg from "@/assets/model.png";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { simulationApi } from "@/store/simulationApi";
import type { AppDispatch } from "@/store";
import { selectSimulationCountByProjectId } from "@/store/simulationSelector";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVerticalIcon } from "lucide-react";
import { useDeleteProjectMutation } from "@/store/projectApi";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { toast } from "sonner";
import { ProjectForm } from "./ProjectForm";

type ProjectCardProps = {
  project: Project;
};
export function ProjectCard(props: ProjectCardProps) {
  const { project } = props;
  const dispatch: AppDispatch = useDispatch();
  const [deleteProject] = useDeleteProjectMutation();
  const simulationCount = useSelector(selectSimulationCountByProjectId(project.id));

  useEffect(() => {
    if (project.models.length > 0) {
      // Fetch simulations for the first model as an example
      project.models.forEach((model) => {
        dispatch(simulationApi.endpoints.getSimulationsByModelId.initiate(model.id));
      });
    }
  }, [project, dispatch]);

  const handleDeleteProject = async () => {
    try {
      await deleteProject(project.id.toString()).unwrap();

      toast.success("Project deleted successfully");
    } catch {
      toast.error("Failed to delete project");
    }
  };

  return (
    <Card>
      <CardHeader className="overflow-hidden relative">
        <CardTitle className="truncate">{project.name}</CardTitle>

        {/* stopPropagation on dropdown open, to avoid event bubbling which cause navigation to detail project */}
        <CardAction onClick={(e) => e.stopPropagation()}>
          <DropdownMenu>
            <DropdownMenuTrigger className="cursor-pointer absolute right-0 px-4">
              <EllipsisVerticalIcon />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <ConfirmDialog
                title="Delete Project"
                description="Are you sure you want to delete this project? This action cannot be undone."
                onConfirm={handleDeleteProject}
                confirmVariant="destructive"
                confirmLabel="Delete Project"
                trigger={
                  <DropdownMenuItem
                    onSelect={(e) => e.preventDefault()}
                    onClick={(e) => e.stopPropagation()}
                    className="text-red-600"
                  >
                    Delete Project
                  </DropdownMenuItem>
                }
              />
              <ProjectForm
                defaultValues={project}
                id={project.id}
                groupOnly
                trigger={
                  <DropdownMenuItem
                    onSelect={(e) => e.preventDefault()}
                    onClick={(e) => e.stopPropagation()}
                  >
                    Change Group
                  </DropdownMenuItem>
                }
              />
            </DropdownMenuContent>
          </DropdownMenu>
        </CardAction>
      </CardHeader>
      <CardContent className="flex items-end justify-between">
        <div>
          <p>{project.models.length} model</p>
          <p>{simulationCount} simulations</p>
        </div>

        <img
          className="invisible sm:visible w-24 object-cover"
          src={modelImg}
          alt="Model Illustration"
        />
      </CardContent>
    </Card>
  );
}

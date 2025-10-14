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
    <Card className="min-h-[192px] border border-transparent bg-gradient-to-r from-choras-primary from-50% to-choras-secondary bg-clip-border p-0.5">
      <div className="bg-[#e7e7e7] min-h-[190px] py-6 rounded-lg h-full flex flex-col justify-between">
        <CardHeader className="overflow-hidden relative px-5">
          <CardTitle className="truncate font-inter font-bold text-sm text-choras-secondary">
            {project.name}
          </CardTitle>

          {/* stopPropagation on dropdown open, to avoid event bubbling which cause navigation to detail project */}
          <CardAction onClick={(e) => e.stopPropagation()}>
            <DropdownMenu>
              <DropdownMenuTrigger className="cursor-pointer absolute right-0 px-4">
                <EllipsisVerticalIcon className="text-black/50" />
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
          <div className="text-black/50 text-xs">
            <p>{project.models.length} model</p>
            <p>{simulationCount} simulations</p>
          </div>

          <div className="invisible sm:visible relative w-36 h-24">
            {/* Stack of cards based on model length */}
            {Array.from({ length: Math.min(project.models.length, 2) }, (_, index) => (
              <img
                key={index}
                className="absolute w-36 h-24 object-cover rounded-lg"
                src={modelImg}
                alt="Model Illustration"
                style={{
                  transform: `rotate(${index * 15 - 5}deg) translate(${index * 30 - 30}px, ${index * -2}px)`,
                  zIndex: index + 1,
                  boxShadow: `0 ${2 + index * 2}px ${4 + index * 2}px rgba(0, 0, 0, 0.2), 0 ${1 + index}px ${2 + index}px rgba(0, 0, 0, 0.1)`,
                  filter:
                    index > 0
                      ? `brightness(${1 - index * 0.1}) contrast(${1 - index * 0.05})`
                      : "none",
                }}
              />
            ))}
          </div>
        </CardContent>
      </div>
    </Card>
  );
}

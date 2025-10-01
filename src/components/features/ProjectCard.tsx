import type { Project } from "@/types/project";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import modelImg from "@/assets/model.png";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { simulationApi } from "@/store/simulationApi";
import type { AppDispatch } from "@/store";
import { selectSimulationCountByProjectId } from "@/store/simulationSelector";

type ProjectCardProps = {
  project: Project;
};
export function ProjectCard(props: ProjectCardProps) {
  const { project } = props;

  const dispatch: AppDispatch = useDispatch();

  const simulationCount = useSelector(selectSimulationCountByProjectId(project.id));

  useEffect(() => {
    if (project.models.length > 0) {
      // Fetch simulations for the first model as an example
      project.models.forEach((model) => {
        dispatch(simulationApi.endpoints.getSimulationsByModelId.initiate(model.id));
      });
    }
  }, [project, dispatch]);

  return (
    <Card>
      <CardHeader className="overflow-hidden">
        <CardTitle className="truncate">{project.name}</CardTitle>
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

import { CreateSimulation } from "@/components/features/CreateSimulation";
import { AppLayout } from "@/components/ui/app-layout";
import { Button } from "@/components/ui/button";
import { useGetSimulationsByModelIdQuery } from "@/store/simulationApi";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router";

export function EditorPage() {
  const navigate = useNavigate()
  const { modelId, simulationId } = useParams() as { modelId: string, simulationId?: string };
  const { data: simulations } = useGetSimulationsByModelIdQuery(+modelId);

  // If no simulationId is provided, redirect to the first simulation
  // Once the simulations are created, the effect will run again
  useEffect(() => {
    if (simulations && simulations.length > 0 && !simulationId) {
      const firstSimulationId = simulations[0].id;
      navigate(`/editor/${modelId}/${firstSimulationId}`, { replace: true });
    }
  }, [simulations, simulationId]);

  return (
    <AppLayout
      title="Editor"
      sidebar={
        <div>

          <CreateSimulation modelId={+modelId} />
          <pre className="w-full">
            Model ID: {modelId}
            <br />
            Simulation ID: {simulationId}
          </pre>

        </div>
      }
    >
      <Button variant="outline" asChild>
        <Link to="/">Back to Home</Link>
      </Button>
    </AppLayout>
  )
}
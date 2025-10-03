import { CreateSimulation } from "@/components/features/CreateSimulation";
import { EmptySimulation } from "@/components/features/EmptySimulation";
import { AppLayout } from "@/components/ui/app-layout";
import { useGetSimulationsByModelIdQuery } from "@/store/simulationApi";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";

export function EditorPage() {
  const navigate = useNavigate();
  const { modelId, simulationId } = useParams() as { modelId: string; simulationId?: string };
  const { data: simulations } = useGetSimulationsByModelIdQuery(+modelId);

  // If no simulationId is provided, redirect to the first simulation
  // Once the simulations are created, the effect will run again
  useEffect(() => {
    if (simulations && simulations.length > 0 && !simulationId) {
      const firstSimulationId = simulations[0].id;
      navigate(`/editor/${modelId}/${firstSimulationId}`, { replace: true });
    }
  }, [simulations, simulationId, modelId, navigate]);

  return (
    <AppLayout
      title="Editor"
      sidebar={
        <div className="h-full">
          {
            // If there's a simulationId, show the simulation editor
            simulationId ? (
              <div className="w-full h-full flex flex-col">
                You're editing simulation {simulationId}
              </div>
            ) : (
              // If no simulations exist, show the empty state
              <EmptySimulation modelId={+modelId} />
            )
          }
        </div>
      }
      right={<CreateSimulation modelId={+modelId} />}
    >
      <div className="h-full w-full flex items-center justify-center text-4xl text-teal-800">
        Editor Page with <br />
        model ID: {modelId} <br />
        simulation ID: {simulationId}
      </div>
    </AppLayout>
  );
}

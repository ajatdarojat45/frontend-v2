import { CreateSimulation } from "@/components/features/CreateSimulation";
import { EmptySimulation } from "@/components/features/EmptySimulation";
import { SimulationPicker } from "@/components/features/SimulationPicker";
import { ModelViewer } from "@/components/features/ModelViewer";
import { AppLayout } from "@/components/ui/app-layout";
import { useGetSimulationsByModelIdQuery } from "@/store/simulationApi";
import { setActiveSimulation } from "@/store/simulationSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";

export function EditorPage() {
  const navigate = useNavigate();
  const { modelId, simulationId } = useParams() as { modelId: string; simulationId?: string };
  const { data: simulations } = useGetSimulationsByModelIdQuery(+modelId);
  const dispatch = useDispatch();

  // If no simulationId is provided, redirect to the first simulation
  // Once the simulations are created, the effect will run again
  useEffect(() => {
    if (simulations && simulations.length > 0) {
      // If simulationId is provided, find the active simulation and set it in the store
      if (simulationId) {
        const activeSimulation = simulations.find((sim) => sim.id === +simulationId);
        if (activeSimulation) {
          dispatch(setActiveSimulation(activeSimulation));
          return;
        }
      }

      // If no simulationId or invalid simulationId, redirect to the first simulation
      const { id: firstSimulationId } = simulations[0];
      navigate(`/editor/${modelId}/${firstSimulationId}`, { replace: true });
    }
  }, [simulations, simulationId, modelId, navigate, dispatch]);

  return (
    <AppLayout
      title="Editor"
      sidebar={
        <div className="h-full">
          {
            // If there's a simulationId, show the simulation editor
            simulationId ? (
              <div className="w-full h-full flex flex-col p-4">
                <SimulationPicker modelId={+modelId} simulationId={+simulationId} />
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
      <div className="h-full w-full">
        <ModelViewer modelId={modelId} />
      </div>
    </AppLayout>
  );
}

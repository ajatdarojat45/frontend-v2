import { CreateSimulation } from "@/components/features/CreateSimulation";
import { EmptySimulation } from "@/components/features/EmptySimulation";
import { AppLayout } from "@/components/ui/app-layout";
import { useGetSimulationsByModelIdQuery } from "@/store/simulationApi";
import { setActiveSimulation } from "@/store/simulationSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { SimulationPicker } from "@/components/features/simulationSettings/SimulationPicker";
import { SidebarTabs } from "@/components/features/simulationSettings/SidebarTabs";
import { ModelViewer } from "@/components/features/viewport/ModelViewer";
import { useGetModelQuery } from "@/store/modelApi";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { EditorNav } from "@/components/features/viewport/EditorNav";

export function EditorPage() {
  const navigate = useNavigate();
  const { modelId, simulationId } = useParams() as { modelId: string; simulationId?: string };
  const { data: simulations } = useGetSimulationsByModelIdQuery(+modelId);
  const { data: model } = useGetModelQuery(modelId);
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
      title={
        model && (
          <Breadcrumb
            items={[
              {
                label: model.projectTag || "Ungrouped",
                href: `/`,
              },
              {
                label: model.projectName,
                href: `/projects/${model.projectId}`,
              },
              {
                label: model.modelName,
                isActive: true,
              },
            ]}
          />
        )
      }
      sidebar={
        <div className="h-full flex flex-col">
          {simulationId ? (
            <>
              <div className="p-4 flex-shrink-0">
                <SimulationPicker modelId={+modelId} simulationId={+simulationId} />
              </div>
              <hr className="border-choras-gray py-1 border-0.5" />
              <div className="flex-1 overflow-auto px-4 scrollbar-hide">
                <SidebarTabs />
              </div>
            </>
          ) : (
            <EmptySimulation modelId={+modelId} />
          )}
        </div>
      }
      right={<CreateSimulation modelId={+modelId} />}
    >
      {simulationId && (
        <EditorNav active="geometry" modelId={+modelId} simulationId={+simulationId} />
      )}
      <div className="h-full w-full">
        <ModelViewer modelId={modelId} />
      </div>
    </AppLayout>
  );
}

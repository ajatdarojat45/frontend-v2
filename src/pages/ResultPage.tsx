import { AppLayout } from "@/components/ui/app-layout";
import { useParams } from "react-router";
import { ResultAuralizations } from "@/components/features/results/ResultAuralizations";
import { ResultParameters } from "@/components/features/results/ResultParameters";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetModelQuery } from "@/store/modelApi";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { EditorNav } from "@/components/features/viewport/EditorNav";
import { TrapezoidOutlineTab } from "@/components/features/results/TrapezoidOutlineTab";
import { CompareResult } from "@/components/features/results/CompareResult";
import { setActiveSimulation } from "@/store/simulationSlice";
import { useEffect } from "react";
import { useGetSimulationsByModelIdQuery } from "@/store/simulationApi";
import { useDispatch } from "react-redux";

export function ResultPage() {
  const dispatch = useDispatch();
  const { modelId, simulationId } = useParams() as { modelId: string; simulationId: string };
  const { data: model } = useGetModelQuery(modelId);
  const { data: simulations } = useGetSimulationsByModelIdQuery(+modelId);

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
    }
  }, [simulations, simulationId, modelId, dispatch]);

  return (
    <AppLayout
      title={
        model && (
          <Breadcrumb
            items={[
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
      sidebar={<CompareResult modelId={+modelId} />}
    >
      <EditorNav active="results" modelId={+modelId} simulationId={+simulationId} />

      <Tabs defaultValue="parameters" className="mt-8">
        <TabsList className="bg-transparent absolute bottom-0 h-100 w-8 p-0 flex-col rounded-r-xl roundedn-l-none z-50">
          <TabsTrigger value="parameters" asChild>
            <TrapezoidOutlineTab value="parameters">Parameters</TrapezoidOutlineTab>
          </TabsTrigger>
          <TabsTrigger value="auralizations" asChild>
            <TrapezoidOutlineTab value="auralizations">Auralizations</TrapezoidOutlineTab>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="parameters" className="pl-4">
          <ResultParameters simulationId={+simulationId} />
        </TabsContent>
        <TabsContent value="auralizations" className="pl-4">
          <ResultAuralizations simulationId={+simulationId} />
        </TabsContent>
      </Tabs>
    </AppLayout>
  );
}

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

export function ResultPage() {
  const { modelId, simulationId } = useParams() as { modelId: string; simulationId: string };
  const { data: model } = useGetModelQuery(modelId);

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
      sidebar={<CompareResult modelId={+modelId} />}
    >
      <EditorNav active="results" modelId={+modelId} simulationId={+simulationId} />
      <Tabs defaultValue="parameters" className="mt-8">
        <TabsList className="mx-auto bg-transparent w-80 p-0 h-8 absolute right-0 top-16 border-0">
          <TabsTrigger value="parameters" asChild>
            <TrapezoidOutlineTab value="parameters">Parameters</TrapezoidOutlineTab>
          </TabsTrigger>
          <TabsTrigger value="auralizations" asChild>
            <TrapezoidOutlineTab value="auralizations">Auralizations</TrapezoidOutlineTab>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="parameters">
          <ResultParameters simulationId={+simulationId} />
        </TabsContent>
        <TabsContent value="auralizations">
          <ResultAuralizations simulationId={+simulationId} />
        </TabsContent>
      </Tabs>
    </AppLayout>
  );
}

import { AppLayout } from "@/components/ui/app-layout";
import { Link, useParams } from "react-router";
import { Button } from "@/components/ui/button";
import { ResultAuralizations } from "@/components/features/ResultAuralizations";
import { DownloadResult } from "@/components/features/DownloadResult";
import { ResultParameters } from "@/components/features/ResultParameters";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetModelQuery } from "@/store/modelApi";
import { Breadcrumb } from "@/components/ui/breadcrumb";

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
      sidebar={
        <div className="h-full flex flex-col justify-end p-4 space-y-3">
          <DownloadResult
            mode="parameters"
            triggerLabel="Download Parameters"
            simulationId={+simulationId}
          />
          <DownloadResult mode="plots" triggerLabel="Download Plots" simulationId={+simulationId} />
          <DownloadResult
            mode="auralizations"
            triggerLabel="Download Impulse Response"
            simulationId={+simulationId}
          />
          <DownloadResult simulationId={+simulationId} />
          <Button asChild variant="secondary" className="w-full">
            <Link to={`/editor/${modelId}/${simulationId}`}>Exit Result</Link>
          </Button>
        </div>
      }
    >
      <Tabs defaultValue="parameters" className="mt-8">
        <TabsList className="mx-auto">
          <TabsTrigger value="parameters">Parameters</TabsTrigger>
          <TabsTrigger value="auralizations">Auralizations</TabsTrigger>
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

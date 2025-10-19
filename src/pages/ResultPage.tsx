import { AppLayout } from "@/components/ui/app-layout";
import { Link, useParams } from "react-router";
import { Button } from "@/components/ui/button";
import { ResultAuralizations } from "@/components/features/results/ResultAuralizations";
import { DownloadResult } from "@/components/features/results/DownloadResult";
import { ResultParameters } from "@/components/features/results/ResultParameters";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetModelQuery } from "@/store/modelApi";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { EditorNav } from "@/components/features/viewport/EditorNav";

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
      <EditorNav active="results" modelId={+modelId} simulationId={+simulationId} />
      <Tabs defaultValue="parameters" className="mt-8">
        <TabsList className="mx-auto  bg-transparent  w-80 p-0 absolute right-0 top-16">
          <TabsTrigger
            className="w-full h-full rounded-tl-none rounded-tr-none data-[state=active]:bg-choras-accent data-[state=active]:text-black text-white/50 flex items-center justify-center bg-choras-dark/50 cursor-pointer"
            style={{
              textOrientation: "mixed",
              clipPath: "polygon(0 0, 100% 0, 100% 1%, 85% 100%, 15% 100%, 0 1%)",
            }}
            value="parameters"
          >
            Parameters
          </TabsTrigger>
          <TabsTrigger
            className="w-full h-full rounded-tl-none rounded-tr-none data-[state=active]:bg-choras-accent data-[state=active]:text-black text-white/50 flex items-center justify-center bg-choras-dark/50 cursor-pointer"
            style={{
              textOrientation: "mixed",
              clipPath: "polygon(0 0, 100% 0, 100% 1%, 85% 100%, 15% 100%, 0 1%)",
            }}
            value="auralizations"
          >
            Auralizations
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

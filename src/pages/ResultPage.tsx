import { AppLayout } from "@/components/ui/app-layout";
import { Link, useParams } from "react-router";
import { Button } from "@/components/ui/button";
import { ResultAuralizations } from "@/components/features/ResultAuralizations";

export function ResultPage() {
  const { modelId, simulationId } = useParams() as { modelId: string; simulationId: string };

  return (
    <AppLayout
      title="Result"
      sidebar={
        <div className="h-full flex flex-col justify-end p-4">
          <Button asChild variant="secondary" className="w-full">
            <Link to={`/editor/${modelId}/${simulationId}`}>Exit Result</Link>
          </Button>
        </div>
      }
    >
      <ResultAuralizations simulationId={+simulationId} />
    </AppLayout>
  );
}

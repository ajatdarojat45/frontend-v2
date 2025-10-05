import { AppLayout } from "@/components/ui/app-layout";
import { Link, useParams } from "react-router";
import { Button } from "@/components/ui/button";
import { ImpulseResponsePlayer } from "@/components/features/ImpulseResponsePlayer";
import { UploadConvolvedAudio } from "@/components/features/UploadConvolvedAudio";
import { ConvolvedSounds } from "@/components/features/ConvolvedSounds";

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
      <div className="h-full w-full p-8 space-y-4">
        <h1 className="text-2xl">Impulse Response</h1>
        <ImpulseResponsePlayer simulationId={simulationId} />

        <br />
        <h1 className="text-2xl">Convolved Sound</h1>
        <div className="flex space-x-4">
          <ConvolvedSounds simulationId={+simulationId} />
          <UploadConvolvedAudio simulationId={+simulationId} />
        </div>
      </div>
    </AppLayout>
  );
}

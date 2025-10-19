import { ImpulseResponsePlayer } from "./ImpulseResponsePlayer";
import { UploadConvolvedAudio } from "./UploadConvolvedAudio";
import { ConvolvedSoundPlayer } from "./ConvolvedSoundPlayer";
import { DownloadResult } from "./DownloadResult";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loading } from "@/components/ui/loading";
import { useGetAuralizationsBySimulationIdQuery } from "@/store/auralizationApi";

type ResultAuralizationsProps = {
  simulationId: number;
};
export function ResultAuralizations({ simulationId }: ResultAuralizationsProps) {
  const {
    data: auralizations,
    isLoading,
    isError,
  } = useGetAuralizationsBySimulationIdQuery(simulationId);

  if (isLoading) {
    return <Loading message="Loading audio files..." className="h-container justify-center" />;
  }

  if (isError) {
    return (
      <Alert variant="destructive">
        <AlertDescription>Failed to load audio files</AlertDescription>
      </Alert>
    );
  }

  if (!auralizations || auralizations.length === 0) {
    return (
      <Alert variant="default">
        <AlertDescription>No audio files available</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="h-full w-full p-8 space-y-4">
      <div className="flex justify-between">
        <h1 className="text-2xl">Impulse Response</h1>

        <DownloadResult
          triggerLabel="Download Impulse Response"
          simulationId={simulationId}
          mode="auralizations"
        />
      </div>
      <ImpulseResponsePlayer simulationId={simulationId} />

      <div className="flex justify-between mt-12">
        <h1 className="text-2xl">Convolved Sound</h1>
        <UploadConvolvedAudio simulationId={simulationId} />
      </div>
      {auralizations.map((auralization) => (
        <ConvolvedSoundPlayer
          key={`${auralization.id}-${simulationId}`}
          simulationId={simulationId}
          auralization={auralization}
        />
      ))}
    </div>
  );
}

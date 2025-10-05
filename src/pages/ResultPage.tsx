import { AppLayout } from "@/components/ui/app-layout";
import { Link, useParams } from "react-router";
import { Button } from "@/components/ui/button";
import { useGetImpulseResponseBySimulationIdQuery } from "@/store/auralizationSlice";
import { useMemo, useRef } from "react";
import WavesurferPlayer from "@wavesurfer/react";
import type WaveSurfer from "wavesurfer.js";
import { Loading } from "@/components/ui/loading";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AudioPlayer } from "react-audio-play";
import { useGetSimulationQuery } from "@/store/simulationApi";
import { formatFilename } from "@/helpers/file";

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
      <div className="h-full w-full p-8">
        <PlayImpulseResponse simulationId={simulationId} />
      </div>
    </AppLayout>
  );
}

function PlayImpulseResponse({ simulationId }: { simulationId: string }) {
  const {
    data: impulseResponse,
    isLoading,
    isError,
  } = useGetImpulseResponseBySimulationIdQuery(+simulationId);
  const wsRef = useRef<WaveSurfer>(null);

  const { data: simulation } = useGetSimulationQuery(+simulationId);

  // Create a blob URL for the audio data
  const audioUrl = useMemo(() => {
    if (!impulseResponse) return null;
    const audioBlob = new Blob([impulseResponse], { type: "audio/wav" });
    return URL.createObjectURL(audioBlob);
  }, [impulseResponse]);

  if (isLoading) {
    return <Loading message="Loading impulse response..." />;
  }

  if (isError) {
    return (
      <Alert variant="destructive">
        <AlertDescription>Failed to load impulse response</AlertDescription>
      </Alert>
    );
  }

  // If no audio data, don't render anything
  if (!audioUrl || !simulation) {
    return null;
  }

  return (
    <div className="w-full flex flex-col gap-4">
      <h1 className="text-2xl">Impulse Response</h1>
      <WavesurferPlayer
        height={100}
        waveColor="darkseagreen"
        url={audioUrl}
        onReady={(ws) => (wsRef.current = ws)}
      />
      <div className="flex">
        <AudioPlayer
          src={audioUrl}
          width="100%"
          onPlay={() => wsRef.current?.play()}
          onPause={() => wsRef.current?.pause()}
          onEnd={() => {
            wsRef.current?.stop();

            // Reset both the wavesurfer and the audio element to the start
            wsRef.current?.seekTo(0);
          }}
        />
        <Button asChild className="h-14 rounded-none">
          <a href={audioUrl} download={formatFilename(`impulse-response-${simulation.name}.wav`)}>
            Download
          </a>
        </Button>
      </div>
    </div>
  );
}

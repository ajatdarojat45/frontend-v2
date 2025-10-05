import { AppLayout } from "@/components/ui/app-layout";
import { Link, useParams } from "react-router";
import { Button } from "@/components/ui/button";
import { useGetImpulseResponseBySimulationIdQuery } from "@/store/auralizationSlice";
import { useMemo, useRef } from "react";
import WavesurferPlayer from "@wavesurfer/react";
import type WaveSurfer from "wavesurfer.js";
import { Loading } from "@/components/ui/loading";
import { Alert, AlertDescription } from "@/components/ui/alert";

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
      <div className="h-full w-full">
        <h2 className="text-2xl font-bold">Simulation Result</h2>
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
  if (!audioUrl) {
    return null;
  }

  return (
    <div className="w-1/3 flex flex-col gap-4">
      <WavesurferPlayer
        height={100}
        waveColor="darkseagreen"
        url={audioUrl}
        onReady={(ws) => (wsRef.current = ws)}
      />
      <audio
        src={audioUrl}
        controls
        className="w-full"
        controlsList="nodownload noplaybackrate nofullscreen"
        onPlay={() => wsRef.current?.play()}
        onPause={() => wsRef.current?.pause()}
        onEnded={(e) => {
          wsRef.current?.stop();

          // Reset both the wavesurfer and the audio element to the start
          wsRef.current?.seekTo(0);
          e.currentTarget.currentTime = 0;
        }}
      >
        Your browser does not support the audio element.
      </audio>
      <Button asChild className="w-full">
        <a href={audioUrl} download>
          Download
        </a>
      </Button>
    </div>
  );
}

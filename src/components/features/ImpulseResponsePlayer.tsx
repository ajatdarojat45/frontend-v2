import { formatFilename } from "@/helpers/file";
import { useGetImpulseResponseBySimulationIdQuery } from "@/store/auralizationApi";
import { useGetSimulationQuery } from "@/store/simulationApi";
import WavesurferPlayer from "@wavesurfer/react";
import { useRef, useMemo } from "react";
import { AudioPlayer } from "react-audio-play";
import type WaveSurfer from "wavesurfer.js";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Loading } from "@/components/ui/loading";

type ImpulseResponsePlayerProps = {
  simulationId: number;
};
export function ImpulseResponsePlayer({ simulationId }: ImpulseResponsePlayerProps) {
  const {
    data: impulseResponse,
    isLoading,
    isError,
  } = useGetImpulseResponseBySimulationIdQuery(simulationId);
  const wsRef = useRef<WaveSurfer>(null);

  const { data: simulation } = useGetSimulationQuery(simulationId);

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

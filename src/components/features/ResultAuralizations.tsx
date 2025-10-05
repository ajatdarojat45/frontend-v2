import { ConvolvedSounds } from "./ConvolvedSounds";
import { ImpulseResponsePlayer } from "./ImpulseResponsePlayer";
import { UploadConvolvedAudio } from "./UploadConvolvedAudio";

type ResultAuralizationsProps = {
  simulationId: number;
};
export function ResultAuralizations({ simulationId }: ResultAuralizationsProps) {
  return (
    <div className="h-full w-full p-8 space-y-4">
      <h1 className="text-2xl">Impulse Response</h1>
      <ImpulseResponsePlayer simulationId={simulationId} />

      <br />
      <h1 className="text-2xl">Convolved Sound</h1>
      <div className="flex space-x-4">
        <ConvolvedSounds simulationId={simulationId} />
        <UploadConvolvedAudio simulationId={simulationId} />
      </div>
    </div>
  );
}

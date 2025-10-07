import type { Auralization } from "@/types/auralization";
import { ConvolvedSounds } from "./ConvolvedSounds";
import { ImpulseResponsePlayer } from "./ImpulseResponsePlayer";
import { UploadConvolvedAudio } from "./UploadConvolvedAudio";
import { useState } from "react";
import { ConvolvedSoundPlayer } from "./ConvolvedSoundPlayer";

type ResultAuralizationsProps = {
  simulationId: number;
};
export function ResultAuralizations({ simulationId }: ResultAuralizationsProps) {
  const [selectedAuralization, setSelectedAuralization] = useState<Auralization | null>(null);

  return (
    <div className="h-full w-full p-8 space-y-4">
      <h1 className="text-2xl">Impulse Response</h1>
      <ImpulseResponsePlayer simulationId={simulationId} />

      <br />
      <h1 className="text-2xl">Convolved Sound</h1>
      <div className="flex space-x-4">
        <ConvolvedSounds simulationId={simulationId} onSelect={setSelectedAuralization} />
        <UploadConvolvedAudio simulationId={simulationId} />
      </div>

      {selectedAuralization && (
        <ConvolvedSoundPlayer
          key={`${selectedAuralization.id}-${simulationId}`}
          simulationId={simulationId}
          auralization={selectedAuralization}
        />
      )}
    </div>
  );
}

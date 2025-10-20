import type { Auralization } from "@/types/auralization";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { AudioLinesIcon, LoaderCircleIcon, PlayIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { http } from "@/libs/http";
import { useState } from "react";
import { AudioPlayer } from "react-audio-play";

type ConvolvedSoundPlayerProps = {
  auralization: Auralization;
  simulationId: number;
};
export function ConvolvedSoundPlayer({ auralization, simulationId }: ConvolvedSoundPlayerProps) {
  const [loading, setLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  console.log(auralization, "<<<");

  const handlePlay = async () => {
    try {
      setLoading(true);

      // Request audio generation
      const { data } = await http({
        method: "POST",
        url: "/auralizations",
        data: {
          audioFileId: auralization.id,
          simulationId,
        },
      });

      // Check if audio generation is completed
      let audioGenerationCompleted = data.status === "Completed";

      // If not completed, poll the status endpoint until it is completed
      if (!audioGenerationCompleted) {
        while (true) {
          const { data: statusData } = await http({
            method: "GET",
            url: `/auralizations/${data.id}/status`,
          });

          if (statusData.status === "Completed") {
            audioGenerationCompleted = true;
            break;
          }

          if (statusData.status === "Failed") {
            throw new Error("Audio generation failed");
          }

          // Wait for a short period before checking the status again
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
      }

      if (audioGenerationCompleted) {
        // Fetch the generated audio file
        const { data: audioData } = await http({
          method: "GET",
          url: `/auralizations/${data.id}/wav`,
          responseType: "arraybuffer",
        });

        // Create a Blob from the audio data and generate a URL for it
        const audioBlob = new Blob([audioData], { type: "audio/wav" });
        const audioUrl = URL.createObjectURL(audioBlob);

        setAudioUrl(audioUrl);
      }
    } catch (error) {
      toast.error("Failed to play the convolved sound.");
      console.error("Error playing convolved sound:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Item variant="outline" className="bg-white">
      <ItemMedia>
        <AudioLinesIcon />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>{auralization.name}</ItemTitle>
        {auralization.description && <ItemDescription>{auralization.description}</ItemDescription>}
      </ItemContent>
      {audioUrl && (
        <ItemActions className="justify-end">
          <AudioPlayer src={audioUrl} className="!p-0 !h-9 !shadow-none w-96" />
        </ItemActions>
      )}
      {!audioUrl && (
        <ItemActions>
          <Button onClick={handlePlay} disabled={loading}>
            {loading ? (
              <LoaderCircleIcon className="size-4 animate-spin" />
            ) : (
              <PlayIcon className="size-4" />
            )}
            {loading ? "Processing..." : "Play"}
          </Button>
        </ItemActions>
      )}
    </Item>
  );
}

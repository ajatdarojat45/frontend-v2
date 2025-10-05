import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loading } from "@/components/ui/loading";
import { useGetAuralizationsBySimulationIdQuery } from "@/store/auralizationApi";

type ConvolvedSoundsProps = {
  simulationId: number;
};
export function ConvolvedSounds({ simulationId }: ConvolvedSoundsProps) {
  const {
    data: auralizations,
    isLoading,
    isError,
  } = useGetAuralizationsBySimulationIdQuery(simulationId);

  if (isLoading) {
    return <Loading message="Loading audio files..." />;
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
    <Select onValueChange={(value) => console.log("Selected audio ID:", value)} value="1">
      <SelectTrigger className="bg-white w-full">
        <SelectValue placeholder="Select audio" />
      </SelectTrigger>
      <SelectContent>
        {auralizations.map((auralization, index) => (
          <SelectItem key={index} value={auralization.id.toString()}>
            {auralization.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

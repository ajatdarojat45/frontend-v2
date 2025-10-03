import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetSimulationsByModelIdQuery } from "@/store/simulationApi";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/helpers/datetime";
import { CheckCircleIcon } from "lucide-react";
import type { Simulation } from "@/types/simulation";

type SimulationPickerProps = {
  modelId: number;
  simulationId?: number;
};
export function SimulationPicker({ modelId, simulationId }: SimulationPickerProps) {
  const navigate = useNavigate();
  const { data: simulations, isLoading } = useGetSimulationsByModelIdQuery(modelId);

  if (!simulations || simulations.length === 0 || isLoading) {
    return (
      <Button variant="secondary" className="justify-start">
        Loading simulations...
      </Button>
    );
  }

  // Active simulation used to display the current selected simulation in the picker
  const activeSimulation = simulations.find((sim) => sim.id === simulationId);

  return (
    <Select
      // We use the URL to manage the active simulation
      // When a simulation is selected, navigate to the corresponding URL
      onValueChange={(id) => navigate(`/editor/${modelId}/${id}`)}
      // So the value is coming from the URL param
      value={simulationId?.toString()}
    >
      <SelectTrigger className="bg-white w-full">
        <SelectValue>
          {activeSimulation && activeSimulation.completedAt && (
            <CheckCircleIcon className="inline text-green-600" />
          )}
          {activeSimulation ? activeSimulation.name : "Select a simulation"}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {simulations.map((simulation) => (
          <CustomSelectItem key={simulation.id} simulation={simulation} />
        ))}
      </SelectContent>
    </Select>
  );
}

function CustomSelectItem({ simulation }: { simulation: Simulation }) {
  let timestamp = (
    <p className="text-xs text-neutral-400">Created at: {formatDate(simulation.createdAt)}</p>
  );

  if (simulation.completedAt) {
    timestamp = (
      <p className="text-xs text-neutral-400 inline-flex gap-2">
        <CheckCircleIcon className="text-green-600" /> Completed at:{" "}
        {formatDate(simulation.completedAt)}
      </p>
    );
  }

  return (
    <SelectItem key={simulation.id} value={simulation.id.toString()}>
      <div className="flex flex-col gap-1">
        <p>{simulation.name}</p>
        {timestamp}
      </div>
    </SelectItem>
  );
}

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
import { CheckCircleIcon, FileText, GithubIcon } from "lucide-react";
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
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3 w-full items-center">
        <label htmlFor="simulation" className="font-medium text-white">
          Simulation:
        </label>
        <div className="col-span-2">
          <Select
            onValueChange={(id) => navigate(`/editor/${modelId}/${id}`)}
            value={simulationId?.toString()}
          >
            <SelectTrigger className="bg-choras-dark text-white border-choras-gray [&>svg]:text-choras-gray w-full">
              <SelectValue>
                {activeSimulation && activeSimulation.completedAt && (
                  <CheckCircleIcon className="inline text-green-600" />
                )}
                {activeSimulation ? activeSimulation.name : "Select a simulation"}
              </SelectValue>
            </SelectTrigger>
            <SelectContent className="bg-choras-dark border-choras-gray">
              {simulations.map((simulation) => (
                <CustomSelectItem key={simulation.id} simulation={simulation} />
              ))}
            </SelectContent>
          </Select>
        </div>
        <label htmlFor="method" className="font-medium text-white">
          Method:
        </label>
        <div className="col-span-2">
          <Select value="DE" disabled>
            <SelectTrigger className="bg-white w-full">
              <SelectValue>DE</SelectValue>
            </SelectTrigger>
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6 w-full items-center">
        <Button variant="outline">
          <div className="flex items-center gap-2 justify-center">
            <GithubIcon size={16} />
            DE Repo
          </div>
        </Button>
        <Button variant="outline">
          <div className="flex items-center gap-2 justify-center">
            <FileText size={16} />
            DE Docs
          </div>
        </Button>
      </div>
    </div>
  );
}

function CustomSelectItem({ simulation }: { simulation: Simulation }) {
  let timestamp = (
    <p className="text-xs text-choras-gray">Created at: {formatDate(simulation.createdAt)}</p>
  );

  if (simulation.completedAt) {
    timestamp = (
      <p className="text-xs text-choras-gray inline-flex gap-2">
        <CheckCircleIcon className="text-green-600" /> Completed at:{" "}
        {formatDate(simulation.completedAt)}
      </p>
    );
  }

  return (
    <SelectItem
      key={simulation.id}
      value={simulation.id.toString()}
      className="bg-choras-dark hover:bg-choras-dark/90 active:bg-choras-dark/80"
    >
      <div className="flex flex-col gap-1">
        <p className="text-choras-gray">{simulation.name}</p>
        {timestamp}
      </div>
    </SelectItem>
  );
}

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetSimulationsByModelIdQuery } from "@/store/simulationApi";
import { useGetSimulationMethodsQuery } from "@/store/simulationSettingsApi";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/helpers/datetime";
import { CheckCircleIcon, FileText, GithubIcon } from "lucide-react";
import type { Simulation } from "@/types/simulation";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedMethodType } from "@/store/simulationSettingsSlice";
import { setActiveSimulation } from "@/store/simulationSlice";
import type { RootState } from "@/store";
import { useEffect } from "react";

type SimulationPickerProps = {
  modelId: number;
  simulationId?: number;
};
export function SimulationPicker({ modelId, simulationId }: SimulationPickerProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: simulations, isLoading } = useGetSimulationsByModelIdQuery(modelId);
  const { data: methods, isLoading: methodsLoading } = useGetSimulationMethodsQuery();
  const selectedMethodType = useSelector(
    (state: RootState) => state.simulationSettings.selectedMethodType,
  );

  const handleMethodChange = (methodType: string) => {
    dispatch(setSelectedMethodType(methodType));
  };

  const handleSimulationChange = (simulationId: string) => {
    const selectedSimulation = simulations?.find((sim) => sim.id.toString() === simulationId);
    if (selectedSimulation) {
      dispatch(setActiveSimulation(selectedSimulation));
    }
    navigate(`/editor/${modelId}/${simulationId}`);
  };

  useEffect(() => {
    if (simulationId && simulations) {
      const currentSimulation = simulations.find((sim) => sim.id === simulationId);
      if (currentSimulation) {
        dispatch(setActiveSimulation(currentSimulation));
      }
    }
  }, [simulationId, simulations, dispatch]);

  if (!simulations || simulations.length === 0 || isLoading || methodsLoading) {
    return (
      <Button variant="secondary" className="justify-start">
        Loading...
      </Button>
    );
  }

  const activeSimulation = simulations.find((sim) => sim.id === simulationId);

  const selectedMethod = methods?.find((method) => method.simulationType === selectedMethodType);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3 w-full items-center">
        <label htmlFor="simulation" className="font-medium text-white">
          Simulation:
        </label>
        <div className="col-span-2">
          <Select onValueChange={handleSimulationChange} value={simulationId?.toString()}>
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
          <Select value={selectedMethodType} onValueChange={handleMethodChange}>
            <SelectTrigger className="bg-choras-dark text-white border-choras-gray [&>svg]:text-choras-gray w-full">
              <SelectValue>
                {selectedMethod ? selectedMethod.label.replace("method", "") : "Select a method"}
              </SelectValue>
            </SelectTrigger>
            <SelectContent className="bg-choras-dark border-choras-gray">
              {methods?.map((method) => (
                <SelectItem
                  key={method.simulationType}
                  value={method.simulationType}
                  className="bg-choras-dark hover:bg-choras-dark/90 active:bg-choras-dark/80 text-white"
                >
                  {method.label.replace("method", "")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6 w-full items-center">
        <Button
          variant="outline"
          onClick={() =>
            selectedMethod?.repositoryURL && window.open(selectedMethod.repositoryURL, "_blank")
          }
          disabled={!selectedMethod?.repositoryURL}
          className="h-auto whitespace-normal py-2"
        >
          <div className="flex items-center gap-2 justify-center">
            <GithubIcon size={16} className="flex-shrink-0" />
            <span className="break-words text-left">{selectedMethodType} Repo</span>
          </div>
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            selectedMethod?.documentationURL &&
            window.open(selectedMethod.documentationURL, "_blank")
          }
          disabled={!selectedMethod?.documentationURL}
          className="h-auto whitespace-normal py-2"
        >
          <div className="flex items-center gap-2 justify-center">
            <FileText size={16} className="flex-shrink-0" />
            <span className="break-words text-left">{selectedMethodType} Docs</span>
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

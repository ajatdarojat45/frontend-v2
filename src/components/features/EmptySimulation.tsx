import { CreateSimulation } from "./CreateSimulation";
import { LayersIcon } from "lucide-react";

type EmptySimulationProps = {
  modelId: number;
};

export function EmptySimulation({ modelId }: EmptySimulationProps) {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-full p-8 flex flex-col items-center text-center gap-4">
        <LayersIcon size={64} />

        <h2 className="text-lg font-semibold">No simulations yet</h2>

        <p className="text-sm text-neutral-200">
          Create your first simulation to explore results and iterate on your model.
        </p>

        <div className="mt-3">
          <CreateSimulation modelId={modelId} />
        </div>
      </div>
    </div>
  );
}

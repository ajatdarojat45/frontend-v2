import type { Model } from "@/types/model";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { selectSimulationCountByModelId } from "@/store/simulationSelector";
import { AudioLinesIcon } from "lucide-react";
import { Link } from "react-router";

type ModelCardProps = {
  model: Model;
};

export function ModelCard({ model }: ModelCardProps) {
  const simulationCount = useSelector(selectSimulationCountByModelId(model.id));

  return (
    <div
      key={model.id}
      className="w-full rounded-lg border border-teal-200 bg-white p-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm"
    >
      {/* Left: waveform icon */}
      <div className="flex-shrink-0 flex items-center justify-center">
        <AudioLinesIcon size={64} />
      </div>

      {/* Center: model name */}
      <div className="flex-1 flex flex-col items-center md:items-start">
        <h4 className="text-2xl font-semibold text-center md:text-left mb-2">{model.name}</h4>
      </div>

      {/* Center-right: meta info */}
      <div className="flex flex-col gap-2 items-center md:items-start text-slate-500 text-lg min-w-[220px]">
        <div className="flex items-center gap-2">
          <span>Contains {simulationCount} simulations</span>
        </div>
        <div className="flex items-center gap-2">
          <span>
            Created in{" "}
            {new Date(model.createdAt).toLocaleString(undefined, {
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-pink-400">Contains .geo file</span>
        </div>
      </div>

      {/* Right: CTA */}
      <div className="flex items-center">
        <Button variant="outline" asChild>
          <Link to={`/editor/${model.id}`}>Open model</Link>
        </Button>
      </div>
    </div>
  );
}

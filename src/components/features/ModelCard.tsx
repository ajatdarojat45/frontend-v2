import type { Model } from "@/types/model";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { selectSimulationCountByModelId } from "@/store/simulationSelector";

type ModelCardProps = {
  model: Model;
}

export function ModelCard({ model }: ModelCardProps) {
  const simulationCount = useSelector(selectSimulationCountByModelId(model.id));

  return (
    <div
      key={model.id}
      className="w-full rounded-lg border border-teal-200 bg-white p-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm"
    >
      {/* Left: waveform icon */}
      <div className="flex-shrink-0 flex items-center justify-center">
        <svg width="84" height="48" viewBox="0 0 84 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id={`g-${model.id}`} x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="#6366F1" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>
          </defs>
          <g stroke={`url(#g-${model.id})`} strokeWidth="6" strokeLinecap="round">
            <path d="M6 24v-8m10 8v-16m10 16v-6m10 6v-20m10 20v-8m10 8v-12m10 12v-4" />
          </g>
        </svg>
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
          <span>Created in {new Date(model.createdAt).toLocaleString(undefined, { month: 'short', day: 'numeric' })}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-pink-400">Contains .geo file</span>
        </div>
      </div>

      {/* Right: CTA */}
      <div className="flex items-center">
        <Button variant="outline">Open model</Button>
      </div>
    </div>
  )
}
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface SimulationMethod {
  id: string;
  label: string;
  description: string;
  supported: boolean;
}

interface IProps {
  methods?: SimulationMethod[];
}

const DEFAULT_METHODS: SimulationMethod[] = [
  { id: "DE", label: "DE", description: "Discontinuous Energy", supported: true },
  { id: "DG", label: "DG", description: "Discontinuous Galerkin", supported: false },
];

export function PossibleSimulation({ methods = DEFAULT_METHODS }: IProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const supportedCount = methods.filter((m) => m.supported).length;

  return (
    <div className="mb-3">
      <button
        onClick={() => setIsExpanded((prev) => !prev)}
        className="flex w-full items-center justify-between rounded-md border border-slate-300 bg-white/80 px-3 py-2 text-left"
      >
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-choras-primary">
            Possible Simulation
          </h4>
          <p className="mt-0.5 text-[11px] text-slate-500">
            Choose algorithm then run a new simulation.
          </p>
        </div>
        <div className="ml-3 flex shrink-0 items-center gap-1.5">
          <span className="rounded-full bg-choras-primary/10 px-2 py-0.5 text-[10px] font-bold text-choras-primary">
            {supportedCount} of {methods.length}
          </span>
          {isExpanded ? (
            <ChevronUp className="h-3.5 w-3.5 text-slate-400" />
          ) : (
            <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
          )}
        </div>
      </button>
      {isExpanded && (
        <ul className="mt-2 space-y-2 rounded-md border border-slate-200 bg-white/60 px-3 py-3">
          {methods.map((method) => (
            <li
              key={method.id}
              className={`flex items-center gap-3 rounded-md border px-3 py-2.5 ${
                method.supported ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"
              }`}
            >
              <span
                className={`h-3 w-3 shrink-0 rounded-full ${
                  method.supported ? "bg-green-500" : "bg-red-400"
                }`}
              />
              <span
                className={`text-sm font-bold ${
                  method.supported ? "text-slate-700" : "text-slate-400"
                }`}
              >
                {method.label}
              </span>
              <span className="text-xs text-slate-500">{method.description}</span>
              <span
                className={`ml-auto text-xs font-semibold ${
                  method.supported ? "text-green-600" : "text-red-400"
                }`}
              >
                {method.supported ? "Supported" : "Not Supported"}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

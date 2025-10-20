import { Play, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CircularProgress } from "@/components/ui/circular-progress";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useSimulationRunner } from "@/hooks/useSimulationRunner";

export function RunSimulationButton() {
  const { isRunning, progress, startSimulation, cancelAndStop } = useSimulationRunner();

  const handleClick = () => {
    if (isRunning) {
      cancelAndStop();
    } else {
      startSimulation();
    }
  };

  const getTooltipText = () => {
    if (isRunning) {
      return `Running Simulation (${Math.round(progress)}%)`;
    }
    return "Run Simulation";
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="relative w-[96px] h-[96px] flex items-center justify-center flex-shrink-0">
            <div
              className={`absolute inset-0 transition-opacity duration-200 ${isRunning ? "opacity-100" : "opacity-0"}`}
            >
              <CircularProgress
                progress={progress}
                size={96}
                strokeWidth={5}
                className="text-primary"
              />
            </div>
            <Button
              onClick={handleClick}
              size="icon"
              variant={isRunning ? "secondary" : "default"}
              className="h-20 w-20 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 relative z-10"
            >
              {isRunning ? (
                <Square className="h-4 w-4" fill="currentColor" />
              ) : (
                <Play className="h-5 w-5" fill="currentColor" />
              )}
            </Button>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{getTooltipText()}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

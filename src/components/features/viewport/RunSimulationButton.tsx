import { Play, Square, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CircularProgress } from "@/components/ui/circular-progress";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useSimulationRunner } from "@/hooks/useSimulationRunner";
import { useSimulationValidation } from "@/hooks/useSimulationValidation";
import { useDispatch } from "react-redux";
import { navigateToTabAndHighlight } from "@/store/tabSlice";
import { useParams } from "react-router";
import { useGetSimulationsByModelIdQuery } from "@/store/simulationApi";

export function RunSimulationButton() {
  const { isRunning, progress, startSimulation, cancelAndStop } = useSimulationRunner();
  const { isValid, errors } = useSimulationValidation();
  const { modelId, simulationId } = useParams() as { modelId: string; simulationId?: string };
  const { data: simulations } = useGetSimulationsByModelIdQuery(+modelId);
  const dispatch = useDispatch();

  const handleClick = () => {
    if (isRunning) {
      cancelAndStop();
    } else if (!isValid) {
      // Navigate to the first error's tab and highlight the relevant element
      const firstError = errors[0];
      dispatch(
        navigateToTabAndHighlight({
          tab: firstError.navigationTarget,
          element: firstError.highlightTarget,
        }),
      );
    } else {
      startSimulation();
    }
  };

  const getTooltipText = () => {
    if (isRunning) {
      return `Running Simulation (${Math.round(progress)}%)`;
    }
    if (!isValid) {
      return errors.map((error) => error.message).join(", ");
    }
    return "Run Simulation";
  };

  if (!simulations || simulations.length === 0 || !simulationId) {
    return null;
  }

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
              variant={isRunning ? "secondary" : !isValid ? "destructive" : "default"}
              className="h-20 w-20 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 relative z-10"
            >
              {isRunning ? (
                <Square className="h-4 w-4" fill="currentColor" />
              ) : !isValid ? (
                <AlertTriangle className="h-5 w-5" />
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

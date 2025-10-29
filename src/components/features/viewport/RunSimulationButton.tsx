import { Play, Square, AlertTriangle, ChartColumn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CircularProgress } from "@/components/ui/circular-progress";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useSimulationRunner } from "@/hooks/useSimulationRunner";
import { useSimulationValidation } from "@/hooks/useSimulationValidation";
import { useDuplicateSimulation } from "@/hooks/useDuplicateSimulation";
import { useDispatch } from "react-redux";
import { navigateToTabAndHighlight } from "@/store/tabSlice";
import { useParams, useNavigate } from "react-router";
import {
  useGetSimulationsByModelIdQuery,
  useRunSimulationMutation,
  usePatchMeshesMutation,
} from "@/store/simulationApi";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";

export function RunSimulationButton() {
  const { isRunning, progress, startSimulation, cancelAndStop } = useSimulationRunner();
  const { isValid, errors } = useSimulationValidation();
  const { duplicateSimulation } = useDuplicateSimulation();
  const { modelId, simulationId } = useParams() as { modelId: string; simulationId?: string };
  const { data: simulations } = useGetSimulationsByModelIdQuery(+modelId);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showOverwriteDialog, setShowOverwriteDialog] = useState(false);
  const [runSimulationMutation] = useRunSimulationMutation();
  const [patchMeshes] = usePatchMeshesMutation();

  const currentSimulation = simulations?.find((sim) => sim.id === Number(simulationId));

  const isCompletedRun =
    currentSimulation?.simulationRun?.status === "Completed" &&
    currentSimulation?.simulationRun?.percentage === 100;

  const editedAfterCompletion =
    currentSimulation?.updatedAt &&
    currentSimulation?.simulationRun?.completedAt &&
    new Date(currentSimulation.updatedAt) > new Date(currentSimulation.simulationRun.completedAt);

  const isCompleted = isCompletedRun && !editedAfterCompletion;

  const handleClick = () => {
    if (isCompleted) {
      navigate(`/editor/${modelId}/${simulationId}/results`);
    } else if (isRunning) {
      cancelAndStop();
    } else if (!isValid) {
      const firstError = errors[0];
      dispatch(
        navigateToTabAndHighlight({
          tab: firstError.navigationTarget,
          element: firstError.highlightTarget,
        }),
      );
    } else {
      if (isCompletedRun && editedAfterCompletion) {
        setShowOverwriteDialog(true);
      } else {
        startSimulation();
      }
    }
  };

  const handleOverrideResults = () => {
    setShowOverwriteDialog(false);
    startSimulation();
  };

  const handleDuplicateAndRun = async () => {
    if (!currentSimulation || !simulations) return;

    setShowOverwriteDialog(false);

    try {
      const newSimulation = await duplicateSimulation(currentSimulation, simulations, {
        navigateToNew: true,
        successMessage: "Simulation duplicated. Starting run...",
      });

      if (newSimulation) {
        await patchMeshes({ modelId: +modelId }).unwrap();
        await runSimulationMutation({ simulationId: newSimulation.id }).unwrap();
      }
    } catch (error) {
      console.error("Failed to duplicate and run:", error);
    }
  };

  const getTooltipText = () => {
    if (isCompleted) {
      return "Show Results";
    }
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
    <>
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
                variant={
                  isCompleted
                    ? "custom1"
                    : isRunning
                      ? "secondary"
                      : !isValid
                        ? "destructive"
                        : "default"
                }
                className="h-20 w-20 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 relative z-10 cursor-pointer"
                style={isCompleted ? { backgroundColor: "#f093fb" } : undefined}
              >
                {isCompleted ? (
                  <ChartColumn className="h-5 w-5" />
                ) : isRunning ? (
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

      <AlertDialog open={showOverwriteDialog} onOpenChange={setShowOverwriteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Overwrite Previous Results?</AlertDialogTitle>
            <AlertDialogDescription>
              This simulation has existing results. Running it again will overwrite the previous
              results. You can also duplicate this simulation to preserve the existing results.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDuplicateAndRun}
              className="bg-choras-secondary hover:bg-choras-secondary/80 cursor-pointer"
            >
              Duplicate & Run
            </AlertDialogAction>
            <AlertDialogAction
              onClick={handleOverrideResults}
              className="bg-choras-primary hover:bg-choras-primary/80 cursor-pointer"
            >
              Override Results
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

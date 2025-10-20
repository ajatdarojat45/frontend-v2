import { useState, useCallback, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  useRunSimulationMutation,
  useLazyGetSimulationRunsQuery,
  useCancelSimulationMutation,
  usePatchMeshesMutation,
} from "@/store/simulationApi";
import { toast } from "sonner";
import type { RootState } from "@/store";

export function useSimulationRunner() {
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const pollIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const activeSimulation = useSelector((state: RootState) => state.simulation.activeSimulation);
  const currentModelId = useSelector((state: RootState) => state.model.currentModelId);

  const [runSimulation] = useRunSimulationMutation();
  const [getSimulationRuns] = useLazyGetSimulationRunsQuery();
  const [cancelSimulation] = useCancelSimulationMutation();
  const [patchMeshes] = usePatchMeshesMutation();

  const stopPolling = useCallback(() => {
    if (pollIntervalRef.current) {
      clearInterval(pollIntervalRef.current);
      pollIntervalRef.current = null;
    }
  }, []);

  const cancelAndStop = useCallback(async () => {
    if (!activeSimulation?.id) {
      return;
    }

    try {
      await cancelSimulation({ simulationId: activeSimulation.id }).unwrap();
      toast.success("Simulation cancelled");
    } catch (error) {
      console.error("Failed to cancel simulation:", error);
      toast.error("Failed to cancel simulation");
    }

    setIsRunning(false);
    setProgress(0);
    stopPolling();
  }, [activeSimulation?.id, cancelSimulation, stopPolling]);

  const pollProgress = useCallback(async () => {
    if (!activeSimulation?.id) return;

    try {
      const { data: simulationRuns } = await getSimulationRuns();

      if (simulationRuns) {
        const currentRun = simulationRuns.find((run) => run.simulation.id === activeSimulation.id);

        if (currentRun) {
          setProgress(currentRun.percentage);

          if (currentRun.status === "Completed" && currentRun.percentage === 100) {
            setIsRunning(false);
            stopPolling();
            toast.success("Simulation completed successfully!");
          } else if (currentRun.status === "Error" || currentRun.status === "Failed") {
            setIsRunning(false);
            stopPolling();
            toast.error("Simulation failed!");
          }
        }
      }
    } catch (error) {
      console.error("Failed to poll simulation progress:", error);
    }
  }, [activeSimulation?.id, getSimulationRuns, stopPolling]);

  const startSimulation = useCallback(async () => {
    if (!activeSimulation?.id || !currentModelId) {
      toast.error("No active simulation or model selected");
      return;
    }

    setIsRunning(true);
    setProgress(0);

    try {
      await patchMeshes({ modelId: currentModelId }).unwrap();

      await runSimulation({ simulationId: activeSimulation.id }).unwrap();
      toast.success("Simulation started!");

      pollIntervalRef.current = setInterval(pollProgress, 3000);

      pollProgress();
    } catch (error) {
      console.error("Failed to start simulation:", error);
      toast.error("Failed to start simulation");
      setIsRunning(false);
      setProgress(0);
    }
  }, [activeSimulation?.id, currentModelId, patchMeshes, runSimulation, pollProgress]);

  useEffect(() => {
    return () => {
      stopPolling();
    };
  }, [stopPolling]);

  return {
    isRunning,
    progress,
    startSimulation,
    cancelAndStop,
  };
}

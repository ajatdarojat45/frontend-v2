import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetSimulationSettingsQuery } from "@/store/simulationSettingsApi";
import { useUpdateSimulationMutation } from "@/store/simulationApi";
import { setOptions } from "@/store/simulationSettingsSlice";
import { toast } from "sonner";
import type { Simulation } from "@/types/simulation";
import type { RootState } from "@/store";

export function useInitializeSimulationSettings(methodType?: string) {
  const dispatch = useDispatch();
  const selectedMethodType = useSelector(
    (state: RootState) => state.simulationSettings.selectedMethodType,
  );
  const effectiveMethodType = methodType || selectedMethodType;

  const { data: settingsData } = useGetSimulationSettingsQuery(effectiveMethodType);
  const [updateSimulation] = useUpdateSimulationMutation();

  const initializeSettings = useCallback(
    async (simulation: Simulation) => {
      if (!settingsData?.options) {
        console.warn("Cannot initialize settings: Settings data not available");
        toast.error("Settings data not available");
        return false;
      }

      try {
        dispatch(setOptions(settingsData.options));

        const defaultValues: Record<string, string | number> = {};
        settingsData.options.forEach((option) => {
          defaultValues[option.id] = option.default;
        });

        const updatePayload = {
          id: simulation.id,
          body: {
            modelId: simulation.modelId,
            name: simulation.name,
            status: simulation.status,
            hasBeenEdited: simulation.hasBeenEdited || false,
            solverSettings: {
              simulationSettings: defaultValues,
            },
          },
        };

        await updateSimulation(updatePayload).unwrap();

        return true;
      } catch (error) {
        console.error("Failed to initialize simulation settings:", error);
        toast.error("Failed to initialize settings");
        return false;
      }
    },
    [settingsData, dispatch, updateSimulation],
  );

  return { initializeSettings, isReady: !!settingsData };
}

import { useGetSimulationByIdQuery } from "@/store/simulationApi";
import { useGetMaterialsQuery } from "@/store/materialsApi";
import type { Simulation } from "@/types/simulation";
import type { Material, FormattedSimulationJson } from "@/types/simulationJson";

export const useSimulationJsonFormatter = (simulationId: number | null) => {
  const { data: simulation, isLoading: simLoading } = useGetSimulationByIdQuery(simulationId ?? 0, {
    skip: !simulationId,
  });

  const { data: materials = [], isLoading: matsLoading } = useGetMaterialsQuery();

  const generateJson = (sim: Simulation, mats: Material[]): FormattedSimulationJson => {
    const surfaceNames: Record<string, string> = {};
    const absorptionCoefficients: Record<string, number[]> = {};

    const layerIds = Object.entries(sim.layerIdByMaterialId || {});
    layerIds.forEach(([surfaceId, materialId], index) => {
      const displayName = `Surface [${index + 1}]`;
      surfaceNames[surfaceId] = displayName;

      const material = mats.find((m) => m.id === materialId);
      if (material) {
        absorptionCoefficients[displayName] = material.absorptionCoefficients;
      }
    });

    return {
      simulation_method: sim.solverSettings?.simulationSettings
        ? Object.keys(sim.solverSettings.simulationSettings).length > 0
          ? "DE"
          : "DE"
        : "DE",
      sources: (sim.sources || []).map((source) => ({
        id: source.id,
        label: source.label,
        orderNumber: source.orderNumber,
        x: source.x,
        y: source.y,
        z: source.z,
        isValid: source.isValid ?? true,
      })),
      receivers: (sim.receivers || []).map((receiver) => ({
        id: receiver.id,
        label: receiver.label,
        orderNumber: receiver.orderNumber,
        x: receiver.x,
        y: receiver.y,
        z: receiver.z,
        isValid: receiver.isValid ?? true,
      })),
      absorption_coefficients: absorptionCoefficients,
      simulationSettings: (sim.solverSettings?.simulationSettings as Record<string, unknown>) || {},
    };
  };

  const isLoading = simLoading || matsLoading;
  const json = simulation && materials.length > 0 ? generateJson(simulation, materials) : null;

  return {
    json,
    isLoading,
    simulation,
    materials,
  };
};

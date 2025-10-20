import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import { useSurfaces } from "./useSurfaces";
import { useGetSimulationByIdQuery } from "@/store/simulationApi";

export interface ValidationError {
  type: "sources" | "receivers" | "materials" | "sourceValidity" | "receiverValidity";
  message: string;
  navigationTarget: "sources" | "surfaces";
  highlightTarget?: string;
}

export function useSimulationValidation() {
  const activeSimulation = useSelector((state: RootState) => state.simulation.activeSimulation);
  const surfaces = useSurfaces();

  const { data: simulation, isLoading: simulationLoading } = useGetSimulationByIdQuery(
    activeSimulation?.id ?? 0,
    {
      skip: !activeSimulation?.id,
    },
  );

  const validateSimulation = (): { isValid: boolean; errors: ValidationError[] } => {
    const errors: ValidationError[] = [];

    if (simulationLoading || !simulation) {
      return {
        isValid: true,
        errors: [],
      };
    }

    if (!simulation.sources || simulation.sources.length === 0) {
      errors.push({
        type: "sources",
        message: "At least one source is required",
        navigationTarget: "sources",
        highlightTarget: "add-source-button",
      });
    }

    if (!simulation.receivers || simulation.receivers.length === 0) {
      errors.push({
        type: "receivers",
        message: "At least one receiver is required",
        navigationTarget: "sources",
        highlightTarget: "add-receiver-button",
      });
    }

    if (simulation.sources?.some((source) => source.isValid === false)) {
      errors.push({
        type: "sourceValidity",
        message: "Some sources have validation errors",
        navigationTarget: "sources",
        highlightTarget: "add-source-button",
      });
    }

    if (simulation.receivers?.some((receiver) => receiver.isValid === false)) {
      errors.push({
        type: "receiverValidity",
        message: "Some receivers have validation errors",
        navigationTarget: "sources",
        highlightTarget: "add-receiver-button",
      });
    }

    if (surfaces.length > 0) {
      const layerIdByMaterialId = simulation.layerIdByMaterialId || {};
      const assignedSurfaceCount = Object.keys(layerIdByMaterialId).length;

      if (assignedSurfaceCount === 0) {
        errors.push({
          type: "materials",
          message: `${surfaces.length} surface(s) need material assignment`,
          navigationTarget: "surfaces",
          highlightTarget: "material-assignment",
        });
      } else {
        const unassignedSurfaces = surfaces.filter((surface) => !layerIdByMaterialId[surface.id]);

        if (unassignedSurfaces.length > 0) {
          errors.push({
            type: "materials",
            message: `${unassignedSurfaces.length} surface(s) need material assignment`,
            navigationTarget: "surfaces",
            highlightTarget: "material-assignment",
          });
        }
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  };

  return validateSimulation();
}

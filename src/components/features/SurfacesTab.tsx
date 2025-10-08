import { useState, useEffect, useCallback, useRef } from "react";
import { useSurfaces } from "@/hooks/useSurfaces";
import { useGetMaterialsQuery } from "@/store/materialsApi";
import { useGetSimulationByIdQuery, useUpdateSimulationMutation } from "@/store/simulationApi";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store";
import {
  assignMaterial,
  removeMaterialAssignment,
  clearAllAssignments,
  setAssignments,
} from "@/store/materialAssignmentSlice";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { SurfaceInfo } from "@/types/material";
import { ChevronRight } from "lucide-react";

export function SurfacesTab() {
  const dispatch = useDispatch();
  const surfaces = useSurfaces();
  const [showIndividualAssignments, setShowIndividualAssignments] = useState(false);
  const {
    data: materials = [],
    isLoading: materialsLoading,
    error: materialsError,
  } = useGetMaterialsQuery();
  const materialAssignments = useSelector(
    (state: RootState) => state.materialAssignment.assignments,
  );
  const activeSimulation = useSelector((state: RootState) => state.simulation.activeSimulation);
  const currentModelId = useSelector((state: RootState) => state.model.currentModelId);
  const { data: simulation, error: simulationError } = useGetSimulationByIdQuery(
    activeSimulation?.id ?? 0,
    {
      skip: !activeSimulation?.id,
    },
  );
  const [updateSimulation] = useUpdateSimulationMutation();

  useEffect(() => {
    if (simulation?.layerIdByMaterialId) {
      dispatch(setAssignments(simulation.layerIdByMaterialId));
    }
  }, [simulation?.layerIdByMaterialId, dispatch]);

  useEffect(() => {
    if (simulationError) {
      toast.error("Cannot load simulation data. Material assignments will not be saved.");
    }
  }, [simulationError]);

  const debounceTimeoutRef = useRef<NodeJS.Timeout>(null);

  const updateSimulationData = useCallback(
    async (assignments?: Record<string, number>) => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }

      debounceTimeoutRef.current = setTimeout(async () => {
        if (!activeSimulation?.id) {
          console.warn("Cannot update simulation: No active simulation");
          toast.error("No active simulation to update");
          return;
        }

        if (!simulation) {
          console.warn("Cannot update simulation: Simulation data not loaded");
          toast.error("Simulation data not available");
          return;
        }

        if (!currentModelId) {
          console.warn("Cannot update simulation: No current model ID");
          toast.error("Model data not available");
          return;
        }

        const assignmentsToSave = assignments || materialAssignments;

        const updatePayload = {
          id: activeSimulation.id,
          body: {
            modelId: currentModelId,
            name: simulation.name,
            status: simulation.status,
            hasBeenEdited: true,
            layerIdByMaterialId: assignmentsToSave,
          },
        };

        try {
          await updateSimulation(updatePayload).unwrap();
          toast.success("Material assignments saved");
        } catch (error) {
          console.error("Failed to update simulation:", error);
          toast.error("Failed to save material assignment");
        }
      }, 300);
    },
    [activeSimulation?.id, simulation, currentModelId, materialAssignments, updateSimulation],
  );

  const handleMaterialAssignment = async (surfaceKey: string, materialId: string) => {
    let updatedAssignments: Record<string, number>;

    if (materialId === "default") {
      dispatch(removeMaterialAssignment(surfaceKey));
      updatedAssignments = { ...materialAssignments };
      delete updatedAssignments[surfaceKey];
    } else {
      dispatch(assignMaterial({ meshId: surfaceKey, materialId: parseInt(materialId) }));
      updatedAssignments = { ...materialAssignments, [surfaceKey]: parseInt(materialId) };
    }

    updateSimulationData(updatedAssignments);
  };

  const handleAssignAllMaterials = async (materialId: string) => {
    let updatedAssignments: Record<string, number>;

    if (materialId === "default") {
      dispatch(clearAllAssignments());
      updatedAssignments = {};
    } else {
      const newAssignments: Record<string, number> = {};
      surfaces.forEach((surface) => {
        const surfaceKey = surface.id;
        dispatch(assignMaterial({ meshId: surfaceKey, materialId: parseInt(materialId) }));
        newAssignments[surfaceKey] = parseInt(materialId);
      });
      updatedAssignments = { ...materialAssignments, ...newAssignments };
    }

    updateSimulationData(updatedAssignments);
  };

  const getMaterialName = (materialId?: number) => {
    if (!materialId) return "Default";
    const material = materials.find((m) => m.id === materialId);
    return material?.name || "Unknown Material";
  };

  const getDisplayName = (surface: SurfaceInfo, index: number) => {
    if (surface.name && surface.name !== `Surface ${surface.meshId}`) {
      return surface.name;
    }
    return `Surface [${index + 1}]`;
  };

  const getAssignAllValue = () => {
    if (surfaces.length === 0) return "default";

    const assignedMaterials = surfaces.map((surface) => {
      const surfaceKey = surface.id;
      return materialAssignments[surfaceKey];
    });

    const firstMaterial = assignedMaterials[0];
    const allSame = assignedMaterials.every((materialId) => materialId === firstMaterial);

    if (allSame && firstMaterial !== undefined) {
      return firstMaterial.toString();
    }

    return "default";
  };

  return (
    <div className="text-white">
      <div className="mb-4">
        <h4 className="text-lg font-semibold mb-2">Surfaces</h4>
      </div>

      {surfaces.length === 0 ? (
        <div className="text-gray-400 text-sm italic">No model loaded or no surfaces found</div>
      ) : (
        <div className="overflow-hidden">
          <table className="w-full table-fixed">
            <thead>
              <tr>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider w-1/2">
                  Layer
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider w-1/2">
                  Material
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-600">
                <td className="px-3 py-2 text-sm">
                  <button
                    onClick={() => setShowIndividualAssignments(!showIndividualAssignments)}
                    className="flex items-center gap-2 font-medium text-white hover:text-gray-300 transition-colors"
                  >
                    <span
                      className={`transform transition-transform ${showIndividualAssignments ? "rotate-90" : "rotate-0"}`}
                    >
                      <ChevronRight size={16} />
                    </span>
                    Assign All
                  </button>
                </td>
                <td className="px-3 py-2">
                  <Select value={getAssignAllValue()} onValueChange={handleAssignAllMaterials}>
                    <SelectTrigger
                      size="sm"
                      className="w-full bg-gray-700 border-gray-500 text-white [&>span]:truncate [&>span]:block [&>span]:max-w-full"
                    >
                      <SelectValue placeholder="Select material for all surfaces" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-600">
                      <SelectItem value="default" className="text-white">
                        All Assignment
                      </SelectItem>
                      {materialsLoading ? (
                        <SelectItem value="loading" disabled className="text-gray-400">
                          Loading materials...
                        </SelectItem>
                      ) : materialsError ? (
                        <SelectItem value="error" disabled className="text-red-400">
                          Error loading materials
                        </SelectItem>
                      ) : (
                        materials.map((material) => (
                          <SelectItem
                            key={material.id}
                            value={material.id.toString()}
                            className="text-white"
                          >
                            <span className="truncate block" title={material.name}>
                              {material.name}
                            </span>
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                </td>
              </tr>

              {showIndividualAssignments &&
                surfaces.map((surface, index) => {
                  const surfaceKey = surface.id;
                  const assignedMaterialId = materialAssignments[surfaceKey];

                  return (
                    <tr key={surface.id} className="hover:bg-gray-800/30 border-t border-gray-700">
                      <td className="px-3 py-2 text-sm w-1/3">
                        <div className="font-medium">{getDisplayName(surface, index)}</div>
                      </td>
                      <td className="px-3 py-2 w-2/3">
                        <Select
                          value={assignedMaterialId?.toString() || "default"}
                          onValueChange={(value) => handleMaterialAssignment(surfaceKey, value)}
                        >
                          <SelectTrigger
                            size="sm"
                            className="w-full bg-gray-800 border-gray-600 text-white [&>span]:truncate [&>span]:block [&>span]:max-w-full"
                          >
                            <SelectValue placeholder={getMaterialName(assignedMaterialId)} />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-800 border-gray-600">
                            <SelectItem value="default" className="text-white">
                              Default
                            </SelectItem>
                            {materialsLoading ? (
                              <SelectItem value="loading" disabled className="text-gray-400">
                                Loading materials...
                              </SelectItem>
                            ) : materialsError ? (
                              <SelectItem value="error" disabled className="text-red-400">
                                Error loading materials
                              </SelectItem>
                            ) : (
                              materials.map((material) => (
                                <SelectItem
                                  key={material.id}
                                  value={material.id.toString()}
                                  className="text-white"
                                >
                                  <span className="truncate block" title={material.name}>
                                    {material.name}
                                  </span>
                                </SelectItem>
                              ))
                            )}
                          </SelectContent>
                        </Select>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      )}

      {surfaces.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-600">
          <div className="text-sm text-gray-400">Total: {surfaces.length} surfaces found</div>
        </div>
      )}
    </div>
  );
}

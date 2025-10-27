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
import { setHighlightedElement } from "@/store/tabSlice";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import type { SurfaceInfo } from "@/types/material";
import { ChevronRight, Eye, EyeOff } from "lucide-react";
import { SurfaceMaterialList } from "./SurfaceMaterialList";
import { AbsorptionCoefficientChart } from "./AbsorptionCoefficientChart";

export function SurfacesTab() {
  const dispatch = useDispatch();
  const surfaces = useSurfaces();
  const [showIndividualAssignments, setShowIndividualAssignments] = useState(false);
  const [hiddenSurfaces, setHiddenSurfaces] = useState<Set<string>>(new Set());
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
  const highlightedElement = useSelector((state: RootState) => state.tab.highlightedElement);
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

  // Clear highlighting after 3 seconds
  useEffect(() => {
    if (highlightedElement) {
      const timer = setTimeout(() => {
        dispatch(setHighlightedElement(null));
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [highlightedElement, dispatch]);

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

  const toggleSurfaceVisibility = (surfaceId: string) => {
    setHiddenSurfaces((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(surfaceId)) {
        newSet.delete(surfaceId);
      } else {
        newSet.add(surfaceId);
      }
      return newSet;
    });
  };

  useEffect(() => {
    surfaces.forEach((surface) => {
      if (surface.mesh) {
        surface.mesh.visible = !hiddenSurfaces.has(surface.id);
      }
    });
  }, [surfaces, hiddenSurfaces]);

  return (
    <div className="text-white">
      <div className="mb-4 flex justify-between items-center">
        <h4 className="text-xl text-choras-primary">Surfaces</h4>
        <SurfaceMaterialList />
      </div>

      {surfaces.length === 0 ? (
        <div className="text-gray-400 text-sm italic">No model loaded or no surfaces found</div>
      ) : (
        <div
          className={`overflow-hidden transition-all duration-500 ${
            highlightedElement === "material-assignment"
              ? "ring-2 ring-yellow-400 shadow-lg animate-pulse bg-yellow-500/10 rounded-lg p-2"
              : ""
          }`}
        >
          <table className="w-full table-fixed">
            <thead>
              <tr>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider w-36">
                  Surface
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Material
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-choras-gray">
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
                      className="w-full bg-choras-dark border-choras-gray text-white [&>span]:truncate [&>span]:block [&>span]:max-w-full [&>svg]:text-choras-gray"
                    >
                      <SelectValue placeholder="Select material for all surfaces" />
                    </SelectTrigger>
                    <SelectContent className="bg-choras-dark border-choras-gray">
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
                        <TooltipProvider>
                          {materials.map((material) => (
                            <Tooltip key={material.id} delayDuration={300}>
                              <TooltipTrigger asChild>
                                <SelectItem value={material.id.toString()} className="text-white">
                                  <span className="truncate block" title={material.name}>
                                    {material.name}
                                  </span>
                                </SelectItem>
                              </TooltipTrigger>
                              <TooltipContent
                                side="right"
                                className="p-3 bg-choras-dark border-choras-primary"
                              >
                                <div className="text-sm mb-2 font-medium text-white">
                                  {material.name}
                                </div>
                                <AbsorptionCoefficientChart
                                  coefficients={material.absorptionCoefficients}
                                  size="md"
                                />
                              </TooltipContent>
                            </Tooltip>
                          ))}
                        </TooltipProvider>
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
                    <tr
                      key={surface.id}
                      className="hover:bg-choras-dark/90 border-t border-gray-700"
                    >
                      <td className="px-3 py-2 text-sm w-1/3">
                        <div className="flex items-center gap-2">
                          <div
                            onClick={() => toggleSurfaceVisibility(surfaceKey)}
                            className="cursor-pointer text-white hover:text-gray-300 transition-colors flex-shrink-0"
                          >
                            {hiddenSurfaces.has(surfaceKey) ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </div>
                          <div className="font-medium truncate">
                            {getDisplayName(surface, index)}
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-2 w-1/3">
                        <Select
                          value={assignedMaterialId?.toString() || "default"}
                          onValueChange={(value) => handleMaterialAssignment(surfaceKey, value)}
                        >
                          <SelectTrigger
                            size="sm"
                            className="w-full bg-choras-dark border-choras-gray text-white [&>span]:truncate [&>span]:block [&>span]:max-w-full [&>svg]:text-choras-gray"
                          >
                            <SelectValue placeholder={getMaterialName(assignedMaterialId)} />
                          </SelectTrigger>
                          <SelectContent className="bg-choras-dark border-choras-gray">
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
                              <TooltipProvider>
                                {materials.map((material) => (
                                  <Tooltip key={material.id} delayDuration={300}>
                                    <TooltipTrigger asChild>
                                      <SelectItem
                                        value={material.id.toString()}
                                        className="text-white"
                                      >
                                        <span className="truncate block" title={material.name}>
                                          {material.name}
                                        </span>
                                      </SelectItem>
                                    </TooltipTrigger>
                                    <TooltipContent
                                      side="right"
                                      className="p-3 bg-choras-dark border-choras-primary"
                                    >
                                      <div className="text-sm mb-2 font-medium text-white">
                                        {material.name}
                                      </div>
                                      <AbsorptionCoefficientChart
                                        coefficients={material.absorptionCoefficients}
                                        size="md"
                                      />
                                    </TooltipContent>
                                  </Tooltip>
                                ))}
                              </TooltipProvider>
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
        <div className="mt-4 pt-4 border-t border-choras-gray">
          <div className="text-sm text-gray-400">Total: {surfaces.length} surfaces found</div>
        </div>
      )}
    </div>
  );
}

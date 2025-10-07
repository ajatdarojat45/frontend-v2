import { useState } from "react";
import { useSurfaces } from "@/hooks/useSurfaces";
import { useGetMaterialsQuery } from "@/store/materialsApi";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store";
import {
  assignMaterial,
  removeMaterialAssignment,
  clearAllAssignments,
} from "@/store/materialAssignmentSlice";
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

  const handleMaterialAssignment = (meshId: string, materialId: string) => {
    if (materialId === "default") {
      dispatch(removeMaterialAssignment(meshId));
    } else {
      dispatch(assignMaterial({ meshId, materialId: parseInt(materialId) }));
    }
  };

  const handleAssignAllMaterials = (materialId: string) => {
    if (materialId === "default") {
      dispatch(clearAllAssignments());
    } else {
      surfaces.forEach((surface) => {
        const meshId = surface.mesh.uuid;
        dispatch(assignMaterial({ meshId, materialId: parseInt(materialId) }));
      });
    }
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
                  <Select onValueChange={handleAssignAllMaterials}>
                    <SelectTrigger
                      size="sm"
                      className="w-full bg-gray-700 border-gray-500 text-white [&>span]:truncate [&>span]:block [&>span]:max-w-full"
                    >
                      <SelectValue placeholder="Select material for all surfaces" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-600">
                      <SelectItem value="default" className="text-white">
                        Clear All Assignments
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
                  const meshId = surface.mesh.uuid;
                  const assignedMaterialId = materialAssignments[meshId];
                  return (
                    <tr key={surface.id} className="hover:bg-gray-800/30 border-t border-gray-700">
                      <td className="px-3 py-2 text-sm w-1/3">
                        <div className="font-medium">{getDisplayName(surface, index)}</div>
                      </td>
                      <td className="px-3 py-2 w-2/3">
                        <Select
                          value={assignedMaterialId?.toString() || "default"}
                          onValueChange={(value) => handleMaterialAssignment(meshId, value)}
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

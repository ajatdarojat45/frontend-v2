import { useState } from "react";
import { useSurfaces } from "@/hooks/useSurfaces";
import { AVAILABLE_MATERIALS } from "@/data/materials";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { SurfaceInfo } from "@/types/material";

export function SurfacesTab() {
  const surfaces = useSurfaces();
  const [materialAssignments, setMaterialAssignments] = useState<Record<string, number>>({});

  const handleMaterialAssignment = (surfaceId: string, materialId: string) => {
    if (materialId === "default") {
      setMaterialAssignments((prev) => {
        const newAssignments = { ...prev };
        delete newAssignments[surfaceId];
        return newAssignments;
      });
    } else {
      setMaterialAssignments((prev) => ({
        ...prev,
        [surfaceId]: parseInt(materialId),
      }));
    }
  };

  const getMaterialName = (materialId?: number) => {
    if (!materialId) return "Default";
    const material = AVAILABLE_MATERIALS.find((m) => m.id === materialId);
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
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider w-1/3">
                  Layer
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider w-2/3">
                  Material
                </th>
              </tr>
            </thead>
            <tbody>
              {surfaces.map((surface, index) => {
                const assignedMaterialId = materialAssignments[surface.id];
                return (
                  <tr key={surface.id} className="hover:bg-gray-800/30">
                    <td className="px-3 py-2 text-sm">
                      <div className="font-medium">{getDisplayName(surface, index)}</div>
                    </td>
                    <td className="px-3 py-2 w-full">
                      <Select
                        value={assignedMaterialId?.toString() || "default"}
                        onValueChange={(value) => handleMaterialAssignment(surface.id, value)}
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
                          {AVAILABLE_MATERIALS.map((material) => (
                            <SelectItem
                              key={material.id}
                              value={material.id.toString()}
                              className="text-white"
                            >
                              <span className="truncate block" title={material.name}>
                                {material.name}
                              </span>
                            </SelectItem>
                          ))}
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

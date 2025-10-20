import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGeometrySelection } from "@/hooks/useGeometrySelection";
import { useSurfaces } from "@/hooks/useSurfaces";
import { useSelector } from "react-redux";
import { useGetMaterialsQuery } from "@/store/materialsApi";
import type { RootState } from "@/store";

export function GeometrySelectionInfo() {
  const { selectedGeometry } = useGeometrySelection();
  const surfaces = useSurfaces();
  const materialAssignments = useSelector(
    (state: RootState) => state.materialAssignment.assignments,
  );
  const { data: materials = [] } = useGetMaterialsQuery();

  const selectedSurfaceInfo = useMemo(() => {
    if (!selectedGeometry || selectedGeometry.mesh?.visible === false) return null;

    const surfaceIndex = surfaces.findIndex((surface) => surface.mesh === selectedGeometry.mesh);

    if (surfaceIndex === -1) return null;

    return {
      surface: surfaces[surfaceIndex],
      index: surfaceIndex + 1,
    };
  }, [selectedGeometry, surfaces]);

  const totalModelVolume = useMemo(() => {
    return surfaces.reduce((total, surface) => total + (surface.volume || 0), 0);
  }, [surfaces]);

  if (!selectedGeometry || selectedGeometry.mesh?.visible === false) {
    return (
      <Card className="w-80 border border-choras-gray">
        <CardHeader>
          <CardTitle className="text-sm">Geometry Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <span className="font-medium">Total Volume:</span>
            </div>
            <div className="text-muted-foreground">{totalModelVolume.toFixed(2)} m³</div>
          </div>
          <p className="text-sm text-muted-foreground mt-3">
            Click on a face in the model to select it for material assignment.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-80 border border-choras-gray">
      <CardHeader>
        <CardTitle className="text-sm">Selected Surface</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <span className="font-medium">Surface:</span>
          </div>
          <div className="text-muted-foreground">
            {selectedSurfaceInfo
              ? `Surface [${selectedSurfaceInfo.index}]`
              : selectedGeometry.mesh.name || "Unknown Surface"}
          </div>

          {selectedSurfaceInfo?.surface.area && (
            <>
              <div>
                <span className="font-medium">Surface area:</span>
              </div>
              <div className="text-muted-foreground">
                {selectedSurfaceInfo.surface.area.toFixed(2)} m²
              </div>
            </>
          )}

          <div>
            <span className="font-medium">Assigned material:</span>
          </div>
          <div className="text-muted-foreground text-xs">
            {(() => {
              if (!selectedSurfaceInfo?.surface) {
                return "No material selected";
              }
              const surfaceKey = selectedSurfaceInfo.surface.id;
              const assignedMaterialId = materialAssignments[surfaceKey];
              if (!assignedMaterialId) {
                return "No material selected";
              }
              const material = materials.find((m) => m.id === assignedMaterialId);
              return material
                ? `${material.name} (ID: ${assignedMaterialId})`
                : `Material ID: ${assignedMaterialId}`;
            })()}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

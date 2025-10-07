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
    if (!selectedGeometry) return null;

    const surfaceIndex = surfaces.findIndex((surface) => surface.mesh === selectedGeometry.mesh);

    if (surfaceIndex === -1) return null;

    return {
      surface: surfaces[surfaceIndex],
      index: surfaceIndex + 1,
    };
  }, [selectedGeometry, surfaces]);

  if (!selectedGeometry) {
    return (
      <Card className="w-80">
        <CardHeader>
          <CardTitle className="text-sm">Geometry Selection</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Click on a face in the model to select it for material assignment.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-80">
      <CardHeader>
        <CardTitle className="text-sm">Selected Geometry</CardTitle>
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

          <div>
            <span className="font-medium">Face Index:</span>
          </div>
          <div className="text-muted-foreground">
            {selectedGeometry.faceIndex}
            {selectedSurfaceInfo && ` (of ${selectedSurfaceInfo.surface.faceCount})`}
          </div>

          {selectedSurfaceInfo?.surface.area && (
            <>
              <div>
                <span className="font-medium">Surface Area:</span>
              </div>
              <div className="text-muted-foreground">
                {selectedSurfaceInfo.surface.area.toFixed(2)} units²
              </div>
            </>
          )}

          <div>
            <span className="font-medium">Position:</span>
          </div>
          <div className="text-muted-foreground font-mono text-xs">
            ({selectedGeometry.point.x.toFixed(2)}, {selectedGeometry.point.y.toFixed(2)},{" "}
            {selectedGeometry.point.z.toFixed(2)})
          </div>

          <div>
            <span className="font-medium">Mesh ID:</span>
          </div>
          <div className="text-muted-foreground font-mono text-xs">
            {selectedGeometry.mesh.uuid.slice(0, 8)}...
          </div>

          <div>
            <span className="font-medium">Material:</span>
          </div>
          <div className="text-muted-foreground text-xs">
            {(() => {
              const meshId = selectedGeometry.mesh.uuid;
              const assignedMaterialId = materialAssignments[meshId];
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

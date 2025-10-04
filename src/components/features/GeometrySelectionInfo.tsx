import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useGeometrySelection } from "@/hooks/useGeometrySelection";

export function GeometrySelectionInfo() {
  const { selectedGeometry, clearSelection } = useGeometrySelection();

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
            <span className="font-medium">Box Face:</span>
          </div>
          <div className="text-muted-foreground">
            {selectedGeometry.mesh.userData?.meshId
              ? `Face ${selectedGeometry.mesh.userData.meshId}`
              : selectedGeometry.mesh.name || "Unnamed"}
          </div>

          <div>
            <span className="font-medium">Triangle:</span>
          </div>
          <div className="text-muted-foreground">{selectedGeometry.faceIndex} (of 2)</div>

          <div>
            <span className="font-medium">Position:</span>
          </div>
          <div className="text-muted-foreground font-mono text-xs">
            ({selectedGeometry.point.x.toFixed(2)}, {selectedGeometry.point.y.toFixed(2)},{" "}
            {selectedGeometry.point.z.toFixed(2)})
          </div>

          {selectedGeometry.materialId && (
            <>
              <div>
                <span className="font-medium">Material ID:</span>
              </div>
              <div className="text-muted-foreground font-mono text-xs">
                {selectedGeometry.materialId.slice(0, 8)}...
              </div>
            </>
          )}
        </div>

        <div className="flex gap-2 pt-2">
          <Button variant="outline" size="sm" onClick={clearSelection} className="flex-1">
            Clear Selection
          </Button>
          <Button
            size="sm"
            className="flex-1"
            onClick={() => {
              // This will be where material assignment happens
              console.log("Assign material to:", selectedGeometry);
            }}
          >
            Assign Material
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

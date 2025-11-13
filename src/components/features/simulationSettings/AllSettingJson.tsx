import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Editor } from "@monaco-editor/react";
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useUpdateSimulationMutation } from "@/store/simulationApi";
import { toast } from "sonner";
import type { RootState } from "@/store";
import type { Simulation } from "@/types/simulation";
import { useSimulationJsonFormatter } from "@/hooks/useSimulationJsonFormatter";
import { Upload } from "lucide-react";

export default function AllSettingJson() {
  const [open, setOpen] = useState(false);
  const [jsonValue, setJsonValue] = useState<string>("");
  const [isValidJson, setIsValidJson] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const activeSimulation = useSelector((state: RootState) => state.simulation.activeSimulation);
  const currentModelId = useSelector((state: RootState) => state.model.currentModelId);

  const { json, isLoading, materials, simulation } = useSimulationJsonFormatter(
    activeSimulation?.id ?? null,
  );

  const [updateSimulation] = useUpdateSimulationMutation();

  useEffect(() => {
    if (open && json && !isInitialized) {
      setJsonValue(JSON.stringify(json, null, 2));
      setIsValidJson(true);
      setIsInitialized(true);
    }
  }, [open, json, isInitialized]);

  useEffect(() => {
    if (!open) {
      setIsInitialized(false);
    }
  }, [open]);

  const handleJsonChange = (value: string | undefined) => {
    if (value !== undefined) {
      setJsonValue(value);
      try {
        JSON.parse(value);
        setIsValidJson(true);
      } catch {
        setIsValidJson(false);
      }
    }
  };

  const handleReset = () => {
    if (json) {
      setJsonValue(JSON.stringify(json, null, 2));
      setIsValidJson(true);
    }
  };

  const handleUploadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const parsedJson = JSON.parse(content);

        if (!parsedJson.sources || !parsedJson.receivers || !parsedJson.absorption_coefficients) {
          toast.error("Invalid JSON format. Missing required fields.");
          return;
        }

        setJsonValue(JSON.stringify(parsedJson, null, 2));
        setIsValidJson(true);
        toast.success("JSON file loaded successfully");
      } catch (error) {
        console.error("Failed to parse JSON file:", error);
        toast.error("Invalid JSON file format");
      }
    };
    reader.readAsText(file);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleClickUpload = () => {
    fileInputRef.current?.click();
  };

  const handleSave = async () => {
    if (!isValidJson) {
      toast.error("Invalid JSON format. Please fix syntax errors.");
      return;
    }

    if (!activeSimulation?.id || !simulation || !currentModelId) {
      toast.error("Simulation data not available");
      return;
    }

    try {
      setIsSaving(true);
      const parsedJson = JSON.parse(jsonValue);

      const layerIdByMaterialId: Record<string, number> = {};
      Object.entries(parsedJson.absorption_coefficients).forEach(([surfaceName, coefficients]) => {
        const matchedMaterial = materials.find(
          (m) => JSON.stringify(m.absorptionCoefficients) === JSON.stringify(coefficients),
        );
        if (matchedMaterial) {
          const entries = Object.entries(simulation.layerIdByMaterialId || {});
          const surfaceIndex = parseInt(surfaceName.match(/\d+/)?.[0] || "0") - 1;
          if (entries[surfaceIndex]) {
            const [surfaceId] = entries[surfaceIndex];
            layerIdByMaterialId[surfaceId] = matchedMaterial.id;
          }
        }
      });

      const updatePayload = {
        id: activeSimulation.id,
        body: {
          modelId: currentModelId,
          name: simulation.name,
          status: simulation.status,
          hasBeenEdited: true,
          layerIdByMaterialId: layerIdByMaterialId,
          solverSettings: {
            simulationSettings: parsedJson.simulationSettings,
          },
          sources: parsedJson.sources,
          receivers: parsedJson.receivers,
        } as Partial<Simulation>,
      };

      await updateSimulation(updatePayload).unwrap();
      toast.success("All settings saved successfully");
      setOpen(false);
    } catch (error) {
      console.error("Failed to save settings:", error);
      toast.error("Failed to save settings. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size={"sm"}
          className="hover:bg-choras-gray hover:text-white border-2 border-gray-500 rounded-lg text-gray-400 w-full cursor-pointer py-4"
        >
          Open JSON
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Edit Settings With JSON</DialogTitle>
          <DialogDescription>
            You can edit all simulation settings from this JSON editor. Changes will be saved to the
            database.
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 min-h-[400px] border rounded-md overflow-hidden">
          {isLoading ? (
            <div className="flex items-center justify-center h-full bg-gray-50">
              <div className="text-gray-400">Loading simulation data...</div>
            </div>
          ) : (
            <Editor
              height="400px"
              language="json"
              theme="vs-light"
              value={jsonValue}
              onChange={handleJsonChange}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: "on",
                renderWhitespace: "selection",
                automaticLayout: true,
                formatOnPaste: true,
                formatOnType: true,
              }}
            />
          )}
        </div>

        {!isValidJson && (
          <div className="text-red-500 text-sm">
            Invalid JSON format. Please fix syntax errors before saving.
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          onChange={handleUploadFile}
          className="hidden"
          aria-label="Upload JSON settings file"
        />

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            className="border-gray-500 text-gray-400 cursor-pointer"
            onClick={handleClickUpload}
            disabled={isSaving || isLoading}
          >
            <Upload size={16} className="mr-2" />
            Upload JSON
          </Button>
          <Button
            variant="outline"
            className="border-choras-primary cursor-pointer"
            onClick={handleReset}
            disabled={isSaving || isLoading}
          >
            Reset
          </Button>
          <Button
            className="bg-choras-primary disabled:bg-gray-600 cursor-pointer disabled:cursor-not-allowed"
            onClick={handleSave}
            disabled={!isValidJson || isSaving || isLoading}
          >
            {isSaving ? "Saving..." : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

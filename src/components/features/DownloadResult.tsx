import { useState } from "react";
import { Download } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

type DownloadResultProps = {
  simulationId: number;
};

export function DownloadResult({ simulationId }: DownloadResultProps) {
  const [open, setOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  // Checkbox states
  const [parameters, setParameters] = useState(false);
  const [plots, setPlots] = useState(false);
  const [auralizations, setAuralizations] = useState(false);

  // Sub-options for Parameters
  const [parameterOptions, setParameterOptions] = useState({
    edt: false,
    t20: false,
    t30: false,
    c80: false,
    d50: false,
    ts: false,
    spl_10_freq: false,
  });

  // Sub-options for Plots
  const [plotOptions, setPlotOptions] = useState({
    "63Hz": false,
    "125Hz": false,
    "250Hz": false,
    "500Hz": false,
    "1000Hz": false,
    "2000Hz": false,
    "4000Hz": false,
    "8000Hz": false,
  });

  // Sub-options for Auralizations
  const [auralizationOptions, setAuralizationOptions] = useState({
    wavIR: false,
    csvIR: false,
  });

  const handleDownload = async () => {
    // Check if at least one option is selected
    if (!parameters && !plots && !auralizations) {
      toast.error("Please select at least one option to download");
      return;
    }

    try {
      setIsDownloading(true);

      // Build the output in the required format
      const output: Record<string, (string | number)[]> = {
        xlsx: ["true"],
        SimulationId: [simulationId],
        Parameters: [],
        EDC: [],
        Auralization: [],
      };

      const selectedParams = Object.entries(parameterOptions)
        .filter(([_, selected]) => selected)
        .map(([key, _]) => (key === "spl_10_freq" ? "spl_t0_freq" : key));

      if (selectedParams.length > 0) {
        output.Parameters = selectedParams;
      }

      const selectedPlots = Object.entries(plotOptions)
        .filter(([_, selected]) => selected)
        .map(([key, _]) => key);

      if (selectedPlots.length > 0) {
        output.EDC = selectedPlots;
      }

      const selectedAuralizations = Object.entries(auralizationOptions)
        .filter(([_, selected]) => selected)
        .map(([key, _]) => key);

      if (selectedAuralizations.length > 0) {
        output.Auralization = selectedAuralizations;
      }

      // Simulate download process
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Here you would implement the actual download logic
      console.log("Download options:", output);

      toast.success("Download started successfully");
      setOpen(false);
    } catch {
      toast.error("Failed to start download");
    } finally {
      setIsDownloading(false);
    }
  };

  const resetSelections = () => {
    setParameters(false);
    setPlots(false);
    setAuralizations(false);
    setParameterOptions({
      edt: false,
      t20: false,
      t30: false,
      c80: false,
      d50: false,
      ts: false,
      spl_10_freq: false,
    });
    setPlotOptions({
      "63Hz": false,
      "125Hz": false,
      "250Hz": false,
      "500Hz": false,
      "1000Hz": false,
      "2000Hz": false,
      "4000Hz": false,
      "8000Hz": false,
    });
    setAuralizationOptions({
      wavIR: false,
      csvIR: false,
    });
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (!isOpen) resetSelections();
      }}
    >
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          <Download className="h-4 w-4 mr-2" />
          Download Results
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Select your preferences</DialogTitle>
          <DialogDescription>Choose which results you want to download.</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 my-6">
          {/* Parameters Section */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="parameters"
                checked={parameters}
                onCheckedChange={(checked) => {
                  const isChecked = !!checked;
                  setParameters(isChecked);
                  // Check/uncheck all parameter options
                  setParameterOptions({
                    edt: isChecked,
                    t20: isChecked,
                    t30: isChecked,
                    c80: isChecked,
                    d50: isChecked,
                    ts: isChecked,
                    spl_10_freq: isChecked,
                  });
                }}
              />
              <Label htmlFor="parameters" className="font-medium">
                Parameters
              </Label>
            </div>

            <div className="ml-6 grid grid-cols-3 gap-3">
              {Object.entries(parameterOptions).map(([key, checked]) => (
                <div key={key} className="flex items-center space-x-2">
                  <Checkbox
                    id={key}
                    checked={checked}
                    onCheckedChange={(value) =>
                      setParameterOptions((prev) => ({ ...prev, [key]: !!value }))
                    }
                  />
                  <Label htmlFor={key} className="text-sm">
                    {key}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Plots Section */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="plots"
                checked={plots}
                onCheckedChange={(checked) => {
                  const isChecked = !!checked;
                  setPlots(isChecked);
                  // Check/uncheck all plot options
                  setPlotOptions({
                    "63Hz": isChecked,
                    "125Hz": isChecked,
                    "250Hz": isChecked,
                    "500Hz": isChecked,
                    "1000Hz": isChecked,
                    "2000Hz": isChecked,
                    "4000Hz": isChecked,
                    "8000Hz": isChecked,
                  });
                }}
              />
              <Label htmlFor="plots" className="font-medium">
                Plots :
              </Label>
            </div>

            <div className="ml-6 grid grid-cols-3 gap-3">
              {Object.entries(plotOptions).map(([key, checked]) => (
                <div key={key} className="flex items-center space-x-2">
                  <Checkbox
                    id={`plot-${key}`}
                    checked={checked}
                    onCheckedChange={(value) =>
                      setPlotOptions((prev) => ({ ...prev, [key]: !!value }))
                    }
                  />
                  <Label htmlFor={`plot-${key}`} className="text-sm">
                    {key}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Auralizations Section */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="auralizations"
                checked={auralizations}
                onCheckedChange={(checked) => {
                  const isChecked = !!checked;
                  setAuralizations(isChecked);
                  // Check/uncheck all auralization options
                  setAuralizationOptions({
                    wavIR: isChecked,
                    csvIR: isChecked,
                  });
                }}
              />
              <Label htmlFor="auralizations" className="font-medium">
                Auralization :
              </Label>
            </div>

            <div className="ml-6 space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="wavIR"
                  checked={auralizationOptions.wavIR}
                  onCheckedChange={(value) =>
                    setAuralizationOptions((prev) => ({ ...prev, wavIR: !!value }))
                  }
                />
                <Label htmlFor="wavIR" className="text-sm">
                  .wav (Impulse Response)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="csvIR"
                  checked={auralizationOptions.csvIR}
                  onCheckedChange={(value) =>
                    setAuralizationOptions((prev) => ({ ...prev, csvIR: !!value }))
                  }
                />
                <Label htmlFor="csvIR" className="text-sm">
                  Impulse Response (csv)
                </Label>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" disabled={isDownloading}>
              Cancel
            </Button>
          </DialogClose>
          <Button onClick={handleDownload} disabled={isDownloading}>
            {isDownloading ? "Downloading..." : "Download"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

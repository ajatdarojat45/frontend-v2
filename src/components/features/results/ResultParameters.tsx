import { useGetSimulationByIdQuery, useGetSimulationResultQuery } from "@/store/simulationApi";
import { Loading } from "@/components/ui/loading";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useState } from "react";
import type { Parameters } from "@/types/simulation";
import { FREQUENCY_BANDS } from "@/constants";
import Chart from "react-apexcharts";
import { DownloadResult } from "./DownloadResult";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { selectCompareResultsSeriesData } from "@/store/simulationSelector";
import { useSelector } from "react-redux";

type ResultParametersProps = {
  simulationId: number;
};
export function ResultParameters({ simulationId }: ResultParametersProps) {
  const [selectedParameter, setSelectedParameter] = useState<keyof Parameters>("edt");
  const { data: results, isLoading, error } = useGetSimulationResultQuery(simulationId);
  const { data: simulation } = useGetSimulationByIdQuery(simulationId);
  const seriesData = useSelector(
    selectCompareResultsSeriesData(selectedParameter, simulation?.modelId),
  );

  if (isLoading) return <Loading className="h-container justify-center" />;

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>Failed to load impulse response</AlertDescription>
      </Alert>
    );
  }

  if (!results || results.length === 0 || results[0].responses.length === 0 || !simulation) {
    return (
      <Alert variant="default">
        <AlertDescription>No data available</AlertDescription>
      </Alert>
    );
  }

  const result = results[0];
  const parameters = result.responses[0].parameters;
  const keys = Object.keys(parameters) as (keyof Parameters)[];

  return (
    <div className="h-full w-full p-8 space-y-4">
      <h1 className="text-2xl text-choras-secondary font-inter font-bold mb-8">Parameters</h1>

      <div className="flex justify-between">
        <Select
          onValueChange={(v) => setSelectedParameter(v as keyof Parameters)}
          value={selectedParameter}
        >
          <SelectTrigger className="!h-10 w-48 border-black rounded-sm">
            <SelectValue className="text-black" placeholder="Select Parameter" />
          </SelectTrigger>
          <SelectContent>
            {keys.map((key) => (
              <SelectItem key={key} value={key}>
                {key.toUpperCase()}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <DownloadResult simulationId={+simulationId} mode="parameters" />
      </div>

      <div className="border border-black p-2 rounded-sm">
        <Chart
          type="bar"
          options={{
            legend: {
              show: true,
              showForSingleSeries: true,
              position: "top",
              horizontalAlign: "center",
            },
            xaxis: {
              categories: FREQUENCY_BANDS.map((f) => f.toString()),
              title: { text: "Center Frequency (Hz)" },
            },
            yaxis: {
              title: { text: selectedParameter.toUpperCase() },
            },
            grid: {
              show: true,
              borderColor: "#90A4AE",
              strokeDashArray: 3,
              position: "back",
              xaxis: {
                lines: {
                  show: true,
                },
              },
            },
          }}
          series={seriesData}
          height={500}
        />
      </div>
    </div>
  );
}

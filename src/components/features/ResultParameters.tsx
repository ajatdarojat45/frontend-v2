import { Button } from "@/components/ui/button";
import { useGetSimulationQuery, useGetSimulationResultQuery } from "@/store/simulationApi";
import { Loading } from "@/components/ui/loading";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useState } from "react";
import type { Parameters } from "@/types/simulation";
import { FREQUENCY_BANDS } from "@/constants";
import Chart from "react-apexcharts";
import { roundTo2 } from "@/helpers/number";
import { DownloadResult } from "./DownloadResult";

type ResultParametersProps = {
  simulationId: number;
};
export function ResultParameters({ simulationId }: ResultParametersProps) {
  const [selectedParameter, setSelectedParameter] = useState<keyof Parameters>("edt");
  const { data: results, isLoading, error } = useGetSimulationResultQuery(simulationId);
  const { data: simulation } = useGetSimulationQuery(simulationId);

  if (isLoading) return <Loading />;

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
  const paramertes = result.responses[0].parameters;
  const keys = Object.keys(paramertes) as (keyof Parameters)[];
  const availableFreqs = result.frequencies;

  const seriesData = FREQUENCY_BANDS.map((freq) => {
    const indexOfVal = availableFreqs.indexOf(freq);
    const val = paramertes[selectedParameter][indexOfVal];
    return val ? roundTo2(val) : null;
  });

  return (
    <div className="h-full w-full p-8 space-y-4">
      <div className="flex space-x-2 justify-center">
        {keys.map((key) => (
          <Button
            key={key}
            onClick={() => setSelectedParameter(key)}
            variant={key === selectedParameter ? "default" : "outline"}
            className="uppercase"
          >
            {key}
          </Button>
        ))}
      </div>

      <div>
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
          series={[
            {
              name: simulation.name,
              data: seriesData,
            },
          ]}
          height={500}
        />
      </div>

      <DownloadResult
        simulationId={+simulationId}
        mode="parameters"
        triggerLabel="Download Parameters"
      />
    </div>
  );
}

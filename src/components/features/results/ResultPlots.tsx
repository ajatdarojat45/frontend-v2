import { useGetSimulationResultQuery } from "@/store/simulationApi";
import { Loading } from "@/components/ui/loading";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useEffect, useMemo, useState } from "react";
import { DownloadResult } from "./DownloadResult";
import {
  selectCompareResultsPlotsSeriesData,
  selectCompareSimulationIds,
} from "@/store/simulationSelector";
import { useSelector } from "react-redux";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDownIcon } from "lucide-react";
import Chart from "react-apexcharts";

import energy_decary_curve  from "../../../assets/db/energy_decay_curve.json"
import signal_spectrum_db from "../../../assets/db/signal_spectrum_db.json"
import signal_spectrum from "../../../assets/db/signal_spectrum.json"
import signal_time_domain_db from "../../../assets/db/signal_time_domain_db.json"
import signal_time_domain from "../../../assets/db/signal_time_domain.json"

import ChorasDynamicChart from "./ChorasDynamicChart";

type ResultParametersProps = {
  simulationId: number;
};

export function ResultPlots({ simulationId }: ResultParametersProps) {
  const [selectedFrequencies, setSelectedFrequencies] = useState<number[]>([125]);
  const { data: results, isLoading, error } = useGetSimulationResultQuery(simulationId);
  const compareResultIds = useSelector(selectCompareSimulationIds);
  const seriesData = useSelector(selectCompareResultsPlotsSeriesData(selectedFrequencies));
  const [chartData, setChartData] = useState<any>(energy_decary_curve);
  const [activeTab, setActiveData] = useState('edc');
  const [selectedChannels, setSelectedChannels] = useState<string[]>([]);

  const getChartTitle = () => {
    switch (activeTab) {
      case 'edc': return 'Energy Decay Curve';
      case 'spectrum_db': return 'Signal Spectrum (dB)';
      case 'spectrum': return 'Signal Spectrum (Linear)';
      case 'rir_db': return 'Room Impulse Response (dB)';
      case 'rir': return 'Room Impulse Response (Linear)';
      default: return 'Visualization Plot';
    }
  };

  useEffect(() => {
    switch (activeTab) {
      case 'edc': 
        setChartData(energy_decary_curve) 
        break;
      case 'spectrum_db': 
        setChartData(signal_spectrum_db)
        break;
      case 'spectrum': 
        setChartData(signal_spectrum)
        break;
      case 'rir_db': 
        setChartData(signal_time_domain_db)
        break;
      case 'rir': 
        setChartData(signal_time_domain)
        break;
      default: setChartData(energy_decary_curve);
    }
    // Reset channel selection when chart type changes
    setSelectedChannels([]);
  }, [activeTab]);

  const enabledFrequencies = useMemo(() => {
    const defaultFrequencies: number[] = [];

    if (!results || !results.length) return defaultFrequencies;

    const firstResult = results[0];
    if (!firstResult.frequencies) return defaultFrequencies;

    return firstResult.frequencies;
  }, [results]);

  if (isLoading) return <Loading className="h-container justify-center" />;

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>Failed to load plot data</AlertDescription>
      </Alert>
    );
  }

  if (!results || results.length === 0 || results[0].responses.length === 0) {
    return (
      <Alert variant="default">
        <AlertDescription>No data available</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="h-full w-full p-8 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl text-choras-primary font-inter font-bold">Plots</h1>
        <DownloadResult simulationIds={compareResultIds} mode="plots" />
      </div>

      {/* Energy Decay Curve */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-gray-600">Energy Decay Curve</h2>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="border-black text-black hover:border-black hover:text-black hover:bg-black/5"
              >
                {selectedFrequencies.map((freq) => `${freq} Hz`).join(", ") || "Select Frequencies"}
                <ChevronDownIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              {enabledFrequencies.map((freq) => (
                <DropdownMenuCheckboxItem
                  key={freq}
                  checked={selectedFrequencies.includes(freq)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedFrequencies((prev) => [...prev, freq]);
                    } else {
                      setSelectedFrequencies((prev) => prev.filter((f) => f !== freq));
                    }
                  }}
                >
                  {freq} Hz
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="border border-black rounded-sm p-2">
        <Chart
          type="line"
          options={{
            chart: {
              type: "line",
              zoom: {
                enabled: true,
              },
            },
            xaxis: {
              type: "numeric",
              title: {
                text: "Time (s)",
              },
              labels: {
                formatter: function (val) {
                  return parseFloat(val).toFixed(3) + "s";
                },
              },
            },
            yaxis: {
              title: {
                text: "Energy decay curve (dB)",
              },
            },
            legend: {
              show: true,
              showForSingleSeries: true,
              position: "top",
              horizontalAlign: "center",
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

      <hr className="border-black" />

      {/* Dynamic Chart */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 justify-between">
          <h2 className="text-sm font-semibold text-gray-600">{getChartTitle()}</h2>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="border-black text-black hover:border-black hover:text-black hover:bg-black/5"
                >
                  {selectedChannels.length === 0
                    ? 'All Channels'
                    : selectedChannels.join(', ')}
                  <ChevronDownIcon />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                {(chartData?.legend ?? []).map((channel: string) => (
                  <DropdownMenuCheckboxItem
                    key={channel}
                    checked={selectedChannels.length === 0 || selectedChannels.includes(channel)}
                    onCheckedChange={(checked) =>
                      setSelectedChannels((prev) => {
                        const current = prev.length === 0
                          ? (chartData?.legend ?? []) as string[]
                          : prev;
                        return checked
                          ? [...current, channel]
                          : current.filter((c) => c !== channel);
                      })
                    }
                  >
                    {channel}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="border-black text-black hover:border-black hover:text-black hover:bg-black/5"
                >
                  {getChartTitle()}
                  <ChevronDownIcon />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                {[
                  { value: "edc", label: "Energy Decay Curve" },
                  { value: "spectrum_db", label: "Signal Spectrum (dB)" },
                  { value: "spectrum", label: "Signal Spectrum (Linear)" },
                  { value: "rir_db", label: "Room Impulse Response (dB)" },
                  { value: "rir", label: "Room Impulse Response (Linear)" },
                ].map((item) => (
                  <DropdownMenuCheckboxItem
                    key={item.value}
                    checked={activeTab === item.value}
                    onCheckedChange={() => setActiveData(item.value)}
                  >
                    {item.label}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="border border-black rounded-sm p-2">
          <ChorasDynamicChart
            chartData={chartData}
            title={getChartTitle()}
            selectedChannels={selectedChannels.length === 0 ? undefined : selectedChannels}
          />
        </div>
      </div>
    </div>
  );
}

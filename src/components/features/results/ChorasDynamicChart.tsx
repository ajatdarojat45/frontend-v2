import Plot from "react-plotly.js";

interface ChartDataProps {
  x: number[];
  y: number[] | number[][];
  xlabel: string;
  ylabel: string;
  x_limits: [number, number];
  y_limits: [number, number];
  x_scale: "linear" | "log";
  legend?: string[];
  colors?: string[];
}

interface ChorasDynamicChartProps {
  chartData: ChartDataProps;
  selectedChannels?: string[];
}

const ChorasDynamicChart = ({ chartData, selectedChannels }: ChorasDynamicChartProps) => {
  // Defensive check jika data dari API belum selesai di-load (loading state)
  if (!chartData || !chartData.y) {
    return <div className="p-4 text-center text-gray-500">Loading chart data...</div>;
  }

  // 1. Cek apakah format data 'y' berbentuk 2D array (multi-channel) atau 1D array biasa
  const isMultiChannel = Array.isArray(chartData.y[0]);

  // Jika backend tidak mengirimkan property legend, kita buat fallback default array
  const legendLabels =
    chartData.legend ||
    (isMultiChannel ? (chartData.y as number[][]).map((_, i) => `Channel ${i + 1}`) : ["Signal"]);

  // 2. Transformasi data menjadi array traces Plotly secara dinamis
  const traces = legendLabels
    .filter((name) => !selectedChannels || selectedChannels.includes(name))
    .map((channelName: string, _index: number) => {
      const originalIndex = legendLabels.indexOf(channelName);
      return {
        x: chartData.x,
        y: isMultiChannel ? (chartData.y as number[][])[originalIndex] : (chartData.y as number[]),
        type: "scatter",
        mode: "lines",
        name: channelName,
        line: { width: 2, color: chartData.colors?.[originalIndex] },
      };
    });

  const thirdOctaveFrequencies = [
    20, 25, 31.5, 40, 50, 63, 80, 100, 125, 160, 200, 250, 315, 400, 500, 630, 800, 1000, 1250,
    1600, 2000, 2500, 3150, 4000,
  ];
  const octaveFrequencies = [31.5, 63, 125, 250, 500, 1000, 2000, 4000];
  const visibleThirdOctaveFrequencies = thirdOctaveFrequencies.filter(
    (frequency) => frequency >= chartData.x_limits[0] && frequency <= chartData.x_limits[1],
  );
  const visibleTickFrequencies = [
    ...new Set([...octaveFrequencies, ...visibleThirdOctaveFrequencies]),
  ]
    .filter((frequency) => frequency >= chartData.x_limits[0] && frequency <= chartData.x_limits[1])
    .sort((left, right) => left - right);

  // 3. Konfigurasi layout yang membaca konfigurasi JSON akustik secara dinamis
  const layout = {
    xaxis: {
      title: {
        text: chartData.xlabel || "Time (s)",
        font: {
          family: "Inter, sans-serif",
          size: 14,
          color: "#373d3f",
        },
        standoff: 8,
      },
      type: chartData.x_scale, // Otomatis menyesuaikan 'linear' atau 'log' (misal: log untuk Spectrum)
      // Plotly log axis requires range in log10 units
      range:
        chartData.x_scale === "log"
          ? [Math.log10(chartData.x_limits[0]), Math.log10(chartData.x_limits[1])]
          : chartData.x_limits,
      showgrid: true,
      gridcolor: "#90A4AE",
      griddash: "solid",
      showline: true,
      mirror: true,
      linecolor: "#333",
      linewidth: 1,
      zeroline: false,
      ...(chartData.x_scale === "log"
        ? {
            tickmode: "array" as const,
            tickvals: visibleTickFrequencies,
            ticktext: visibleTickFrequencies.map((frequency) =>
              frequency >= 1000 ? `${frequency / 1000}k` : `${frequency}`,
            ),
            minor: {
              ticks: "outside" as const,
            },
          }
        : {}),
    },
    yaxis: {
      title: {
        text: chartData.ylabel || "Signal",
        font: {
          family: "Inter, sans-serif",
          size: 14,
          color: "#373d3f",
        },
        standoff: 8,
      },
      type: "linear", // Sumbu Y tetap linear karena nilai log (dB) sudah dihitung langsung oleh backend
      range: chartData.y_limits, // Batas sumbu Y dinamis (Pascals [-1, 1] atau dB [-85, 5])
      showgrid: true,
      gridcolor: "#90A4AE",
      griddash: "solid",
      showline: true,
      mirror: true,
      linecolor: "#333",
      linewidth: 1,
      zeroline: false,
    },
    margin: { t: 50, b: 60, l: 60, r: 20 },
    showlegend: true,
    legend: {
      orientation: "h" as const,
      yanchor: "bottom" as const,
      y: 1.02,
      xanchor: "right" as const,
      x: 1,
    },
    paper_bgcolor: "rgba(0,0,0,0)",
    plot_bgcolor: "rgba(0,0,0,0)",
  };

  const config = {
    responsive: true,
    displayModeBar: true,
    displaylogo: false,
  };

  return (
    <div className="w-full h-[500px]">
      <Plot
        data={traces}
        layout={layout}
        config={config}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
};

export default ChorasDynamicChart;

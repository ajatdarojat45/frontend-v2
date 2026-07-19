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
}

interface ChorasDynamicChartProps {
  chartData: ChartDataProps;
  title: string;
  selectedChannels?: string[];
}

const ChorasDynamicChart = ({ chartData, title, selectedChannels }: ChorasDynamicChartProps) => {
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
        line: { width: 1.5 },
      };
    });

  // 3. Konfigurasi layout yang membaca konfigurasi JSON akustik secara dinamis
  const layout = {
    title: {
      text: title,
      font: { color: "#333", size: 16 },
    },
    xaxis: {
      title: {
        text: chartData.xlabel,
      },
      type: chartData.x_scale, // Otomatis menyesuaikan 'linear' atau 'log' (misal: log untuk Spectrum)
      // Plotly log axis requires range in log10 units
      range:
        chartData.x_scale === "log"
          ? [Math.log10(chartData.x_limits[0]), Math.log10(chartData.x_limits[1])]
          : chartData.x_limits,
      showgrid: true,
      gridcolor: "#90A4AE",
      griddash: "dot",
    },
    yaxis: {
      title: {
        text: chartData.ylabel,
      },
      type: "linear", // Sumbu Y tetap linear karena nilai log (dB) sudah dihitung langsung oleh backend
      range: chartData.y_limits, // Batas sumbu Y dinamis (Pascals [-1, 1] atau dB [-85, 5])
      showgrid: true,
      gridcolor: "#90A4AE",
      griddash: "dot",
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
    <div className="w-full h-[400px] p-4">
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

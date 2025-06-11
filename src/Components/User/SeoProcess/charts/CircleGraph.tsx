import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface MetricDetails {
  Current: number;
}

interface DeviceData {
  [deviceType: string]: {
    [metric: string]: MetricDetails;
  };
}

interface CircleGraphProps {
  data: DeviceData;
  metric: string; 
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const CircleGraph: React.FC<CircleGraphProps> = ({ data, metric }) => {
  const chartData = Object.entries(data)
    .map(([device, metrics]) => ({
      name: device,
      value: metrics[metric]?.Current || 0,
    }))
    .filter((entry) => entry.value > 0); // Filter out 0 values
// console.log(data,"data")
  if (chartData.length === 0) {
    return <p className="text-center">No data available for {metric}</p>;
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="name"
          innerRadius={60}
          outerRadius={100}
          label
        >
          {chartData.map((_, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CircleGraph;

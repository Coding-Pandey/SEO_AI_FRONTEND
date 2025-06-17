import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

interface DeviceData {
  [deviceType: string]: {
    [metric: string]: any;
  };
}

interface CircleGraphProps {
  data: DeviceData;
  metric: "clicks" | "impressions" | "ctr" | "position";
}

const COLORS = ["#90CAF9", "#007bba"];  


const metricKeyMap: { [key: string]: string } = {
  clicks: "Clicks",
  impressions: "Impressions",
  ctr: "CTR",
  position: "AvgPosition",
};

const CircleGraph: React.FC<CircleGraphProps> = ({ data, metric }) => {
  const actualMetricKey = metricKeyMap[metric];

  const chartData = Object.entries(data)
    .map(([device, metrics]) => {
      const metricData = metrics[actualMetricKey];
      const value =
        metricData?.["Relative_Change (%)"] ?? metricData?.["Change (%)"] ?? 0;

      return {
        name: device,
        value: Math.abs(value),
      };
    })
    .filter((entry) => entry.value > 0);

  const totalValue = chartData.reduce((sum, entry) => sum + entry.value, 0);

  // Add "Other" if total < 100
  if (totalValue < 100) {
    chartData.push({
      name: "Other",
      value: 100 - totalValue,
    });
  }

  if (chartData.length === 0) {
    return <p className="text-center">No data available for {metric}</p>;
  }

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={12}
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
 <div  className="graph-body  d-flex justify-content-center align-items-center">
    <div style={{ width: 250, height: 200 }}  >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            stroke="none"
            innerRadius={45}
            outerRadius={90}
            label={renderCustomizedLabel}
            labelLine={false}
          >
            {chartData.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div> 
    <div className="ml-3">
          {chartData.map((entry, index) => (
            <div key={index} className="d-flex align-items-center mb-2">
              <div
                style={{
                  width: 10,
                  height: 10,
                  backgroundColor: COLORS[index],
                  borderRadius: "50%",
                  marginRight: 8,
                }}
              ></div>
              <span style={{ fontSize: 13 }}>{entry.name}</span>
            </div>
          ))}
        </div>
   </div>
  );
};

export default CircleGraph;

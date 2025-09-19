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

const COLORS = ["#90CAF9", "#007bba", "#FFB74D"];

const metricKeyMap: { [key: string]: string } = {
  clicks: "Clicks",
  impressions: "Impressions",
  ctr: "CTR",
  position: "AvgPosition",
};

const CircleGraph: React.FC<CircleGraphProps> = ({ data, metric }) => {
  const actualMetricKey = metricKeyMap[metric];

  const chartData = Object.entries(data).map(([device, metrics]) => {
    const metricData = metrics[actualMetricKey];
    const value = metricData?.["Current"] ?? 0;

    return {
      name: device,
      value,
    };
  });

  const total = chartData.reduce((sum, d) => sum + d.value, 0);

  if (total === 0) {
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
    <div className="graph-body d-flex flex-column align-items-center gap-3">
      <div style={{ width: 250, height: 200 }}>
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

      <div className="card-footer d-flex justify-content-around w-100 mt-3">
        {chartData.map((entry, index) => {
          const percent = ((entry.value / total) * 100).toFixed(1);
          return (
            <div key={index} className="text-center">
              <div
                style={{
                  width: 12,
                  height: 12,
                  backgroundColor: COLORS[index % COLORS.length],
                  borderRadius: "50%",
                  margin: "0 auto 4px",
                }}
              ></div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>
                {entry.value.toLocaleString()}
              </div>
              <div style={{ fontSize: 12, color: "#888" }}>{percent}%</div>
              <div style={{ fontSize: 12 }}>{entry.name}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CircleGraph;

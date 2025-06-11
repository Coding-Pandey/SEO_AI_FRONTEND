import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LabelList,
  Tooltip,
} from "recharts";

const COLORS = ["#007bba", "#9edcff"]; // Brand, Generic

interface PieChartData {
  branded_value: number;
  branded_percentage: number;
  branded_pct_diff: number;
  generic_value: number;
  generic_percentage: number;
  generic_pct_diff: number;
  total: number;
}

interface Props {
  data: { [key: string]: PieChartData };
  selectedMetric: string;
  title: string;
}

const BrandVsNonBrandChart: React.FC<Props> = ({
  data,
  selectedMetric,
  title,
}) => {
  const metricData = data[selectedMetric];

  if (
    metricData.branded_percentage === 0 &&
    metricData.generic_percentage === 0
  ) {
    return (
      <div className="card keyword_data_card">
        <div className="card-header bg-white border-0">
          <h3 className="font_16 mb-0">{title}</h3>
        </div>
        <p style={{ color: "#aeb4bf", fontSize: "12px" }}>{selectedMetric}</p>
        <div className="card-body text-center text-muted">
          No {selectedMetric} data available
        </div>
      </div>
    );
  }

  const chartData = [
    {
      name: "Brand Keywords",
      value: metricData.branded_value,
      percentage: metricData.branded_percentage,
    },
    {
      name: "Generic Keywords",
      value: metricData.generic_value,
      percentage: metricData.generic_percentage,
    },
  ];
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            backgroundColor: "white",
            border: "1px solid #ccc",
            padding: 5,
            borderRadius: 4,
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          }}
        >
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color, marginBottom: 4 }}>
              <span style={{ color: entry.color }}>●</span> {entry.name}:{" "}
              {typeof entry.value === "number"
                ? `${entry.value.toFixed(1)}%`
                : entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="card keyword_data_card">
      <div className="card-header bg-white border-0">
        <h3 className="font_16 mb-0">{title}</h3>
      </div>
      <p style={{ color: "#aeb4bf", fontSize: "12px" }}>{selectedMetric}</p>
      <div
        className="card-body d-flex justify-content-center align-items-center"
        style={{ flexDirection: "column" }}
      >
        <div style={{ width: 250, height: 200 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={80}
                dataKey="percentage"
                paddingAngle={3}
                stroke="none"
              >
                {chartData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
                <LabelList
                  dataKey="percentage"
                  position="inside"
                  formatter={(value: any) => `${value}%`}
                  style={{ fill: "#333", fontSize: 8, fontWeight: 600 }}
                />
              </Pie>
              <Tooltip content={<CustomTooltip />} />
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
      <div className="card-footer">
        <div className="row text-center">
          <div className="col">
            <div>Brand</div>
            <div>{metricData.branded_value.toLocaleString()}</div>
            <div
              style={{
                color: metricData.branded_pct_diff < 0 ? "#dc3545" : "#28a745",
                fontSize: 13,
              }}
            >
              {metricData.branded_pct_diff < 0 ? "↓" : "↑"}{" "}
              {Math.abs(metricData.branded_pct_diff).toFixed(1)}%
            </div>
          </div>
          <div className="col">
            <div>Non-brand</div>
            <div>{metricData.generic_value.toLocaleString()}</div>
            <div
              style={{
                color: metricData.generic_pct_diff < 0 ? "#dc3545" : "#28a745",
                fontSize: 13,
              }}
            >
              {metricData.generic_pct_diff < 0 ? "↓" : "↑"}{" "}
              {Math.abs(metricData.generic_pct_diff).toFixed(1)}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandVsNonBrandChart;

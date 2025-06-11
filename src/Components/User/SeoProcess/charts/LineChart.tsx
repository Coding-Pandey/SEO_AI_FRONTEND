import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface RawEntry {
  row_number: number;
  date: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

interface Props {
  period1: RawEntry[];
  period2: RawEntry[];
  selectedMetric: "clicks" | "impressions" | "ctr" | "position";
  setSelectedMetric: (
    metric: "clicks" | "impressions" | "ctr" | "position"
  ) => void;
}

const CustomTooltip = ({ active, payload, selectedMetric }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const metricLabel =
      selectedMetric.charAt(0).toUpperCase() + selectedMetric.slice(1);

    return (
      <div
        style={{
          background: "white",
          border: "1px solid #ccc",
          padding: 10,
          borderRadius: 4,
        }}
      >
        <p style={{ marginBottom: 0 }}>
          <span style={{ color: "#e74c3c" }}>●</span> Date:{" "}
          {data.date2 || "N/A"}
        </p>
        <p style={{ marginBottom: 0 }}>
          <span style={{ color: "#2ecc71" }}>●</span> Date:{" "}
          {data.date1 || "N/A"}
        </p>
        <p style={{ marginBottom: 0 }}>
          <span style={{ color: "#e74c3c" }}>●</span> {metricLabel}:{" "}
          {data.period2}
        </p>
        <p style={{ marginBottom: 0 }}>
          <span style={{ color: "#2ecc71" }}>●</span> {metricLabel}:{" "}
          {data.period1}
        </p>
      </div>
    );
  }

  return null;
};

const LineChartGraph: React.FC<Props> = ({ period1, period2,  selectedMetric,
  setSelectedMetric, }) => {
  // const [selectedMetric, setSelectedMetric] = useState<
  //   "clicks" | "impressions" | "ctr" | "position"
  // >("clicks");
  const [showDropdown, setShowDropdown] = useState(false);

  if (!period1?.length || !period2?.length) return <p>No data available</p>;

  const maxLength = Math.max(period1.length, period2.length);

  const graphData = Array.from({ length: maxLength }).map((_, index) => {
    const entry1 = period1.find((item) => item.row_number === index);
    const entry2 = period2.find((item) => item.row_number === index);
    return {
      row_number: index,
      period1: entry1 ? entry1[selectedMetric] : 0,
      period2: entry2 ? entry2[selectedMetric] : 0,
      date1: entry1?.date?.split("T")[0] || "",
      date2: entry2?.date?.split("T")[0] || "",
    };
  });

  return (
    <div className="col-12">
      <div
        className="card_box click_chart"
        style={{ height: 400, padding: 20, position: "relative" }}
      >
        {/* Filter Icon */}
        <div
          style={{
            position: "absolute",
            top: 5,
            right: 10,
            zIndex: 2,
            fontWeight: "bold",
          }}
        >
          <i
            className="bi bi-filter"
            style={{ fontSize: 20, cursor: "pointer" }}
            onClick={() => setShowDropdown((prev) => !prev)}
          ></i>

          {showDropdown && (
            <div
              style={{
                marginTop: 8,
                background: "white",
                border: "1px solid #ccc",
                borderRadius: 6,
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                padding: 10,
                position: "absolute",
                right: 0,
                width: 160,
              }}
            >
              {[
                { key: "clicks", label: "Clicks" },
                { key: "impressions", label: "Impressions" },
                { key: "ctr", label: "CTR" },
                { key: "position", label: "Avg. Position" },
              ].map(({ key, label }) => (
                <label
                  key={key}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: 8,
                    fontSize: 14,
                    cursor: "pointer",
                    color: "#333",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={selectedMetric === key}
                    onChange={() => {
                      setSelectedMetric(key as any);
                      setShowDropdown(false);
                    }}
                    style={{
                      accentColor: "rgb(72, 114, 183)",
                      marginRight: 8,
                      width: 16,
                      height: 16,
                    }}
                  />
                  {label}
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Chart */}
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={graphData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="row_number"
              label={{
                value: "Row Number",
                position: "insideBottom",
                offset: -5,
                style: { fill: "#aeb4bf", fontSize: 12 },
              }}
            />
            <YAxis
              label={{
                value:
                  selectedMetric.charAt(0).toUpperCase() +
                  selectedMetric.slice(1),
                angle: -90,
                position: "insideLeft",
                offset: 1,
                style: { textAnchor: "middle", fill: "#aeb4bf", fontSize: 12 },
              }}
            />
            <Tooltip
              content={<CustomTooltip selectedMetric={selectedMetric} />}
            />
            <Line
              type="monotone"
              dataKey="period1"
              stroke="#2ecc71"
              dot={false}
              name="Period 1"
            />
            <Line
              type="monotone"
              dataKey="period2"
              stroke="#e74c3c"
              dot={false}
              name="Period 2"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LineChartGraph;

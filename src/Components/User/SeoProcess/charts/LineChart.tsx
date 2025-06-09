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

const LineChartGraph: React.FC<Props> = ({ period1, period2 }) => {
  const [selectedMetric, setSelectedMetric] = useState<
    "clicks" | "impressions" | "ctr" | "position"
  >("clicks");
  const [showDropdown, setShowDropdown] = useState(false);

  if (!period1?.length || !period2?.length) return <p>No data available</p>;

  const mergedDates = Array.from(
    new Set([...period1.map((d) => d.date), ...period2.map((d) => d.date)])
  )
    .sort()
    .reverse();

  const graphData = mergedDates.map((date) => {
    const entry1 = period1.find((item) => item.date === date);
    const entry2 = period2.find((item) => item.date === date);
    return {
      date: date.split("T")[0],
      period1: entry1 ? entry1[selectedMetric] : 0,
      period2: entry2 ? entry2[selectedMetric] : 0,
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
                borderRadius: 4,
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                padding: 8,
                position: "absolute",
                right: 0,
              }}
            >
              {["clicks", "impressions", "ctr", "position"].map((metric) => (
                <div
                  key={metric}
                  style={{
                    padding: "4px 8px",
                    cursor: "pointer",
                    fontWeight: selectedMetric === metric ? "bold" : "normal",
                  }}
                  onClick={() => {
                    setSelectedMetric(metric as any);
                    setShowDropdown(false);
                  }}
                >
                  {metric === "ctr"
                    ? "CTR"
                    : metric === "position"
                    ? "Avg Position"
                    : metric.charAt(0).toUpperCase() + metric.slice(1)}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Chart */}
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={graphData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickFormatter={(dateStr) => {
                const date = new Date(dateStr);
                return date.toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  // year: "numeric",
                });
              }}
            />

            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="period1"
              stroke="#2ecc71"
              dot={false}
              name={`${selectedMetric}`}
            />
            <Line
              type="monotone"
              dataKey="period2"
              stroke="#e74c3c"
              dot={false}
              name={`${selectedMetric}`}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LineChartGraph;

import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import ChartFilter from "../Common/ChartFilter";

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
          <span style={{ color: "#90CAF9" }}>●</span> Date:{" "}
          {data.date2 || "N/A"}
        </p>
        <p style={{ marginBottom: 0 }}>
          <span style={{ color: "#1E88E5" }}>●</span> Date:{" "}
          {data.date1 || "N/A"}
        </p>
        <p style={{ marginBottom: 0 }}>
          <span style={{ color: "#90CAF9" }}>●</span> {metricLabel}:{" "}
          {data.period2}
        </p>
        <p style={{ marginBottom: 0 }}>
          <span style={{ color: "#1E88E5" }}>●</span> {metricLabel}:{" "}
          {data.period1}
        </p>
      </div>
    );
  }

  return null;
};

const LineChartGraph: React.FC<Props> = ({
  period1,
  period2,
  selectedMetric,
  setSelectedMetric,
}) => {
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
        style={{
          height: 400,
          minHeight: 400,
          padding: 20,
          position: "relative",
        }}
      >
        {/* Filter Icon */}
        <ChartFilter
          selectedMetric={selectedMetric}
          setSelectedMetric={setSelectedMetric}
          showDropdown={showDropdown}
          setShowDropdown={setShowDropdown}
        />

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
            <Legend
              layout="horizontal"
              verticalAlign="top"
              wrapperStyle={{
                paddingBottom: 20,
                fontSize: 13,
                textTransform: "capitalize",
                color: "#333",
                fontWeight: 500,
                lineHeight: "20px",
              }}
            />
            <Line
              type="monotone"
              dataKey="period2"
              strokeWidth={2}
              stroke="#90CAF9"
              dot={false}
              name={`${selectedMetric}`}
            />
            <Line
              type="monotone"
              dataKey="period1"
              stroke="#1E88E5"
              strokeWidth={2}
              dot={false}
              name={`${selectedMetric} (previous Old days)`}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LineChartGraph;

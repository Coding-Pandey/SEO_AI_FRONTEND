import React, { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";
import ChartFilter from "../Common/ChartFilter";

const metricsMap = {
  clicks: ["branded_clicks", "generic_clicks"],
  impressions: ["branded_impressions", "generic_impressions"],
  ctr: ["branded_ctr", "generic_ctr"],
  position: ["branded_avg_position", "generic_avg_position"],
};

type MetricType = "clicks" | "impressions" | "ctr" | "position";

const BrandedGenericAreaChart = ({
  data,
  selectedMetric,
  setSelectedMetric,
}: {
  data: any[];
  selectedMetric: MetricType;
  setSelectedMetric: React.Dispatch<React.SetStateAction<MetricType>>;
}) => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [brandedKey, genericKey] = metricsMap[selectedMetric];

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "400px",
        minHeight: "400px",
      }}
      className="click_chart border-0"
    >
      {/* Filter Icon & Dropdown */}

      <ChartFilter
        selectedMetric={selectedMetric}
        setSelectedMetric={setSelectedMetric}
        showDropdown={showDropdown}
        setShowDropdown={setShowDropdown}
      />

      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            {/* Brand Keywords (dark blue) */}
            <linearGradient id="brandedColor" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4872b7" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#4872b7" stopOpacity={0} />
            </linearGradient>

            {/* Generic Keywords (light blue) */}
            <linearGradient id="genericColor" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#9ec8f7" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#9ec8f7" stopOpacity={0} />
            </linearGradient>
          </defs>

          <XAxis dataKey="date" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
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

          <Area
            type="monotone"
            dataKey={brandedKey}
            name={`Brand Keywords`}
            stroke="#1E88E5"
            fillOpacity={1}
            strokeWidth={2}
            fill="url(#brandedColor)"
          />
          <Area
            type="monotone"
            dataKey={genericKey}
            name={`Generic Keywords`}
            stroke="#90CAF9"
            fillOpacity={1}
            strokeWidth={2}
            fill="url(#genericColor)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BrandedGenericAreaChart;

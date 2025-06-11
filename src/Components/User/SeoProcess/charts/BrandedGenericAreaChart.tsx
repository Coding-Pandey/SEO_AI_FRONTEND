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
      style={{ position: "relative", width: "100%", height: "400px" }}
      className="card_box click_chart border-0"
    >
      {/* Filter Icon & Dropdown */}
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
                      setSelectedMetric(key as MetricType);
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

      <ResponsiveContainer>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="brandedColor" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#007bff" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#007bff" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="genericColor" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00c49f" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#00c49f" stopOpacity={0} />
            </linearGradient>
          </defs>

          <XAxis dataKey="date" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />

          <Area
            type="monotone"
            dataKey={brandedKey}
            name={`Branded ${selectedMetric}`}
            stroke="#007bff"
            fillOpacity={1}
            fill="url(#brandedColor)"
          />
          <Area
            type="monotone"
            dataKey={genericKey}
            name={`Generic ${selectedMetric}`}
            stroke="#00c49f"
            fillOpacity={1}
            fill="url(#genericColor)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BrandedGenericAreaChart;

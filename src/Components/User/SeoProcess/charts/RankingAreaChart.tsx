import React, { useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
  Legend,
} from "recharts";
import ChartFilter from "../Common/ChartFilter";

export type MetricType = "clicks" | "impressions" | "ctr" | "position";

interface DataPoint {
  date: string;
  keywords_top_3: number;
  keywords_top_4_10: number;
  keywords_top_11_20: number;
  keywords_pos_21_plus: number;
  clicks_top_3: number;
  clicks_top_4_10: number;
  clicks_top_11_20: number;
  clicks_pos_21_plus: number;
  impressions_top_3: number;
  impressions_top_4_10: number;
  impressions_top_11_20: number;
  impressions_pos_21_plus: number;
  ctr_top_3: number;
  ctr_top_4_10: number;
  ctr_top_11_20: number;
  ctr_pos_21_plus: number;
  position_top_3: number;
  position_top_4_10: number;
  position_top_11_20: number;
  position_pos_21_plus: number;
}

interface Props {
  data: DataPoint[];
  selectedMetric: MetricType;
  setSelectedMetric: React.Dispatch<React.SetStateAction<MetricType>>;
}

const COLORS = {
  top_3: "#3182CE",
  top_4_10: "#63B3ED",
  top_11_20: "#90CDF4",
  pos_21_plus: "#BEE3F8",
};

const labels = {
  top_3: "Top 3",
  top_4_10: "Top 4–10",
  top_11_20: "Top 11–20",
  pos_21_plus: "Pos 21+",
};

const RankingAreaChart: React.FC<Props> = ({
  data,
  selectedMetric,
  setSelectedMetric,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const keys = {
    top_3: `${selectedMetric}_top_3`,
    top_4_10: `${selectedMetric}_top_4_10`,
    top_11_20: `${selectedMetric}_top_11_20`,
    pos_21_plus: `${selectedMetric}_pos_21_plus`,
  } as const;

  return (
    <div style={{ position: "relative", width: "100%", height: 300 }}>
      {/* Filter Icon & Dropdown */}
      <ChartFilter
        selectedMetric={selectedMetric}
        setSelectedMetric={setSelectedMetric}
        showDropdown={showDropdown}
        setShowDropdown={setShowDropdown}
      />

      {/* Chart */}
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="gradTop3" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={COLORS.top_3} stopOpacity={0.6} />
              <stop offset="95%" stopColor={COLORS.top_3} stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gradTop10" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={COLORS.top_4_10} stopOpacity={0.6} />
              <stop offset="95%" stopColor={COLORS.top_4_10} stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gradTop20" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor={COLORS.top_11_20}
                stopOpacity={0.6}
              />
              <stop offset="95%" stopColor={COLORS.top_11_20} stopOpacity={0} />
            </linearGradient>
            <linearGradient id="grad21plus" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor={COLORS.pos_21_plus}
                stopOpacity={0.6}
              />
              <stop
                offset="95%"
                stopColor={COLORS.pos_21_plus}
                stopOpacity={0}
              />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
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
            dataKey={keys.pos_21_plus}
            stroke={COLORS.pos_21_plus}
            fillOpacity={1}
            strokeWidth={2}
            fill="url(#grad21plus)"
            name={labels.pos_21_plus}
          />
          <Area
            type="monotone"
            dataKey={keys.top_11_20}
            stroke={COLORS.top_11_20}
            fillOpacity={1}
            strokeWidth={2}
            fill="url(#gradTop20)"
            name={labels.top_11_20}
          />
          <Area
            type="monotone"
            dataKey={keys.top_4_10}
            stroke={COLORS.top_4_10}
            fillOpacity={1}
            strokeWidth={2}
            fill="url(#gradTop10)"
            name={labels.top_4_10}
          />
          <Area
            type="monotone"
            dataKey={keys.top_3}
            stroke={COLORS.top_3}
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#gradTop3)"
            name={labels.top_3}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RankingAreaChart;

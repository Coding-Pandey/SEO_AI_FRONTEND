import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface RankingData {
  date: string; // ISO string date
  "Top 3": number;
  "Top 10": number;
  "Top 20+": number;
}

interface Props {
  data: RankingData[];
}

const KeywordRankingChart: React.FC<Props> = ({ data }) => {
  // Format date for X-axis labels
  const formattedData = data.map((item) => ({
    ...item,
    date: new Date(item.date).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
    }),
  }));

  return (
    <ResponsiveContainer width="100%" height={250}>
      <AreaChart
        data={formattedData}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }} // give more top margin
      >
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend
          layout="horizontal"
          verticalAlign="top"
          align="center"
          wrapperStyle={{
            paddingBottom: 20,
            fontSize: 10,
            marginLeft: 25,
            textTransform: "capitalize",
            color: "#333",
            fontWeight: 500,
            lineHeight: "20px",
          }}
        />
        <Area
  type="monotone"
  dataKey="Top 3"
  stackId="1"
  strokeWidth={1}
  stroke="#1E88E5"
  fill="#1E88E5"
/>
<Area
  type="monotone"
  dataKey="Top 10"
  stackId="1"
   strokeWidth={1}
  stroke="#90CAF9"
  fill="#90CAF9"
/>
<Area
  type="monotone"
  dataKey="Top 20+"
  stackId="1"
   strokeWidth={1}
  stroke="#BBDEFB"
  fill="#BBDEFB"
/>

      </AreaChart>
    </ResponsiveContainer>
  );
};

export default KeywordRankingChart;

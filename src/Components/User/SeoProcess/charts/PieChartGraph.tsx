import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  LabelList,
} from "recharts";

interface ImpressionData {
  branded: number;
  generic: number;
}

interface Props {
  data: ImpressionData;
  title: string;
}

const COLORS = ["#007bba", "#9edcff"];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const { name, payload: item } = payload[0];
    return (
      <div
        style={{
          background: "#ffffff",
          border: "1px solid #ccc",
          borderRadius: 4,
          padding: "6px 10px",
          fontSize: 12,
          color: "#000",
        }}
      >
        <strong>{name}</strong>: {item.percentage}%
      </div>
    );
  }
  return null;
};

const PieChartGraph: React.FC<Props> = ({ data, title }) => {
  const total = data.branded + data.generic;
   if (!total) {
    return (
      <div
        className="card_box border-0"
        style={{
          padding: 20,
          borderRadius: 10,
          background: "#fff",
          // maxWidth: 300,
        }}
      >
        <h3
          className="font_16 font_300 mb-2"
          style={{ fontSize: 16, fontWeight: 400,color:"#4f4e4d" }}
        >
          {title}
        </h3>
        <p style={{ color: "#999", fontSize: 14 }}>No {title} data available</p>
      </div>
    );
  }

  const chartData = [
    {
      name: "Brand Keywords",
      value: data.branded,
      percentage: ((data.branded / total) * 100).toFixed(1),
    },
    {
      name: "Generic Keywords",
      value: data.generic,
      percentage: ((data.generic / total) * 100).toFixed(1),
    },
  ];

  return (
    <div
      className="card_box border-0"
      style={{
        padding: 20,
        borderRadius: 10,
        background: "#fff",
        // maxWidth: 300,
      }}
    >
      <div className="graph_outer">
        <h3
          className="font_16 font_300 mb-3"
          style={{ fontSize: 16, fontWeight: 400 ,color:"#4f4e4d"}}
        >
          {title}
        </h3>
        <div className="d-flex flex-column align-items-center">
          <div style={{ position: "relative", width: 180, height: 140 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={30}
                  outerRadius={50}
                  paddingAngle={3}
                  dataKey="value"
                  stroke="none"
                >
                  {chartData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                  <LabelList
                    dataKey="percentage"
                    position="inside"
                    style={{ fill: "#333", fontSize: 5, fontWeight: 600 }}
                    formatter={(value: any) => `${value}%`}
                  />
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="graph_bullets mt-3">
            <ul className="list-unstyled mb-0">
              {chartData.map((entry, index) => (
                <li
                  key={index}
                  className="d-flex align-items-center mb-1"
                  style={{ fontSize: 10 }}
                >
                  <div
                    style={{
                      width: 10,
                      height: 10,
                      backgroundColor: COLORS[index],
                      borderRadius: "50%",
                      marginRight: 8,
                    }}
                  ></div>
                  <span className="graph_points_text">{entry.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PieChartGraph;

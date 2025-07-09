import React from "react";
import { AreaChart, Area, Tooltip, ResponsiveContainer, YAxis } from "recharts";

export interface ChartItem {
  name: string;
  value: number;
}

export interface CardItem {
  title: string;
  value: number;
  percent: number;
  isDown: boolean;
  chart: ChartItem[];
}

interface AuditSectionModalProps {
  cards: CardItem[];
  filters: string[];
  tableHeaders: string[];
  activeFilter: string;
  tableRows: any[];
  setActiveFilter: (filter: string) => void;
  isIndexability?: boolean;
}

const AuditSectionModal: React.FC<AuditSectionModalProps> = ({
  cards,
  filters,
  tableHeaders,
  activeFilter,
  tableRows,
  setActiveFilter,
  isIndexability = false,
}) => {
 
  return (
    <div className="seo_report_content brand_content">
      <form className="row">
        <div className="col-12">
          <div className="row overview_cards">
            {cards.map((card, idx) => (
              <div key={idx} className="col-12 col-sm-6 col-xxl-3">
                <div className="card_box">
                  <h3 className="font_18 font_300 mb-2">{card.title}</h3>
                  <h4 className="font_25 font_500 mb-1">{card.value}</h4>
                  <p
                    className={`font_14 ${
                      card.isDown ? "text-danger" : "text-success"
                    }  mb-1`}
                  >
                    <i
                      className={`bi ${
                        card.isDown
                          ? "bi-arrow-down-short"
                          : "bi-arrow-up-short"
                      }`}
                    ></i>{" "}
                    {card.percent ?? card.value}
                  </p>
                  {card.chart && (
                    <div style={{ width: "100%", height: 60 }}>
                      <ResponsiveContainer>
                        <AreaChart
                          data={card.chart}
                          margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                        >
                          <YAxis domain={[0, 100]} />
                          <Tooltip
                            cursor={{ stroke: "#ccc", strokeWidth: 1 }}
                            formatter={(
                              value: number,
                              _name: string,
                              props: any
                            ) => {
                              const itemName = props?.payload?.name;
                              const label =
                                itemName === "Count" ? "Current" : "Remaining";
                              return [`${value.toFixed(1)}%`, label];
                            }}
                            labelFormatter={() => ""}
                          />

                          <Area
                            type="monotone"
                            dataKey="value"
                            stroke="#1E88E5"
                            fill="#90CAF9"
                            fillOpacity={0.3}
                            strokeWidth={2}
                            dot={false}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="col-12 col-xxl-12">
          <div className="indexables_table_filter">
            <h3 className="font_18 mb-3">
              Pages -{" "}
              <span className="text_blue">
               {activeFilter?.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())}
              </span>
            </h3>
            <ul className="filter_btn_wrapper">
              {filters.map((filter, idx) => (
                <li key={idx}>
                  <button
                    className={`indexable_btn primary_btn ${
                      activeFilter === filter ? "activeFilter" : ""
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveFilter(filter);
                    }}
                  >
                    {filter?.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="card_box">
            <div className="branded_keywords table-responsive indexable_table">
              <table className="table">
                <thead>
                  <tr>
                    {tableHeaders.map((header, idx) => (
                      <th key={idx} scope="col">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tableRows && tableRows.length > 0 ? (
                    tableRows.map((row, rowIdx) => (
                      <tr key={rowIdx}>
                        <td>{row?.Address || "-"}</td>
                        <td>
                          {row?.Indexability
                            ? row.Indexability
                            : row?.Canonical_Link_Element_1
                            ? row.Canonical_Link_Element_1
                            : row?.Meta_Robots_1
                            ? row.Meta_Robots_1
                            : row?.Status
                            ? row.Status
                            : "-"}
                        </td>
                        <td>
                          {isIndexability
                            ? row?.Indexability_Status ||
                              row?.Status_Code ||
                              "-"
                            : row?.Status_Code || "-"}
                        </td>
                        <td>{row?.Title_1 || "-"}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="text-center">
                        Data not found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AuditSectionModal;

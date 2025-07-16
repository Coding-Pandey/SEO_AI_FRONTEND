import React from "react";
import {
  AreaChart,
  Area,
  Tooltip,
  ResponsiveContainer,
  YAxis,
  XAxis,
} from "recharts";

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
  isIndexability?: string;
}

const AuditSectionModal: React.FC<AuditSectionModalProps> = ({
  cards,
  filters,
  tableHeaders,
  activeFilter,
  tableRows,
  setActiveFilter,
  isIndexability,
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
                    <div
                      style={{ width: "100%", height: 150, overflowX: "auto" }}
                    >
                      <ResponsiveContainer width="100%" minWidth={300}>
                        <AreaChart
                          data={card.chart}
                          margin={{ top: 10, right: 20, left: 0, bottom: 20 }}
                        >
                          <XAxis
                            dataKey="name"
                            tick={{ fontSize: 10 }}
                            interval={0}
                            angle={-30}
                          />
                          <YAxis allowDecimals={false} />
                          <Tooltip
                            formatter={(value: number) => [
                              `${value}`,
                              "Issue Count",
                            ]}
                            labelFormatter={(label: string) => `Date: ${label}`}
                          />
                          <Area
                            type="monotone"
                            dataKey="value"
                            stroke="#1E88E5"
                            fill="#90CAF9"
                            fillOpacity={0.3}
                            strokeWidth={2}
                            dot={true}
                          />

                          {/* <XAxis
                            dataKey="name"
                            tick={{ fontSize: 10 }}
                            interval={0} // shows all labels
                            angle={-30} // optional: rotate labels to avoid overlap
                            height={50} // ensure enough space for rotated text
                          />
                          <YAxis allowDecimals={false} />
                          <Tooltip
                            cursor={{ stroke: "#ccc", strokeWidth: 1 }}
                            formatter={(value: number) => [`${value}`, "Count"]}
                            labelFormatter={(label: string) => `Date: ${label}`}
                          />
                          <Area
                            type="monotone"
                            dataKey="value"
                            stroke="#1E88E5"
                            fill="#90CAF9"
                            fillOpacity={0.3}
                            strokeWidth={2}
                            dot={false}
                          /> */}
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
                {activeFilter
                  ?.replace(/_/g, " ")
                  .replace(/\b\w/g, (char) => char.toUpperCase())}
              </span>
            </h3>
            <ul className="filter_btn_wrapper">
              {filters.map((filter, idx) => (
                <li key={idx}>
                  <button
                    className={`indexable_btn primary_btn ${
                      activeFilter.trim().toLowerCase() ===
                      filter.trim().toLowerCase()
                        ? "activeAudit"
                        : ""
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveFilter(filter);
                    }}
                  >
                    {filter
                      ?.replace(/_/g, " ")
                      .replace(/\b\w/g, (char) => char.toUpperCase())}
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
                          {isIndexability === "pagetitle"
                            ? row?.Title_1 || "-"
                            : isIndexability === "htags"
                            ? row?.Status_Code || "-"
                            : row?.Indexability
                            ? row.Indexability
                            : row?.Canonical_Link_Element_1
                            ? row.Canonical_Link_Element_1
                            : row?.Meta_Robots_1
                            ? row.Meta_Robots_1
                            : row?.Status
                            ? row.Status
                            : row?.Meta_Description_1
                            ? row?.Meta_Description_1
                            : "-"}
                        </td>
                        {isIndexability !== "metadescription" && (
                          <>
                            <td>
                              {isIndexability === "pagetitle"
                                ? row?.Title_1_Length || "-"
                                : isIndexability === "indexability"
                                ? row?.Indexability_Status ||
                                  row?.Status_Code ||
                                  "-"
                                : isIndexability === "htags"
                                ? row?.H1_1 || "-"
                                : row?.Status_Code || "-"}
                            </td>
                            <td>
                              {isIndexability === "pagetitle"
                                ? row?.Title_1_Pixel_Width || "-"
                                : isIndexability === "htags"
                                ? row?.H1_1_Length || "-"
                                : row?.Title_1 || "-"}
                            </td>
                          </>
                        )}
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

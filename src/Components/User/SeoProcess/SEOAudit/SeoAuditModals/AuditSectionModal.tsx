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
                        {/* Address */}
                        <td>{row?.Address || "-"}</td>

                        {/* First Column */}
                        <td>
                          {isIndexability === "internalLinks"
                            ? row?.Indexability || "-"
                            : isIndexability === "pagetitle"
                            ? row?.Title_1 || "-"
                            : isIndexability === "htags"
                            ? row?.Status_Code || "-"
                            : row?.Indexability ||
                              row?.Canonical_Link_Element_1 ||
                              row?.Meta_Robots_1 ||
                              row?.Status ||
                              row?.Meta_Description_1 ||
                              "-"}
                        </td>

                        {isIndexability !== "metadescription" && (
                          <>
                            {/* Second Column */}
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

                            {/* Third Column */}
                            <td>
                              {(() => {
                                switch (isIndexability) {
                                  case "pagetitle":
                                    return row?.Title_1_Pixel_Width || "-";
                                  case "htags":
                                    return row?.H1_1_Length || "-";
                                  case "internalLinks":
                                    return row?.Status || "-";
                                  case "content":
                                    return row?.Word_Count || "-";
                                  case "Urls":
                                    return row?.Multiple_Slashes || "-";
                                  default:
                                    return row?.Title_1 || "-";
                                }
                              })()}
                            </td>

                            {/* Fourth Column */}
                            <td>
                              {isIndexability === "internalLinks"
                                ? row?.Inlinks || "-"
                                : isIndexability === "content"
                                ? row?.Readability || "-"
                                : isIndexability === "Urls"
                                ? row?.Non_ASCII_Characters || "-"
                                : ""}
                            </td>

                            {/* Fifth Column */}
                            <td>
                              {isIndexability === "internalLinks"
                                ? row?.Unique_Inlinks || "-"
                                : isIndexability === "content"
                                ? row?.Sentence_Count || "-"
                                : isIndexability === "Urls"
                                ? row?.Over_115_Characters || "-"
                                : ""}
                            </td>

                            {/* Sixth Column */}
                            <td>
                              {isIndexability === "internalLinks"
                                ? row?.Outlinks || "-"
                                : isIndexability === "content"
                                ? row?.Average_Words_Per_Sentence || "-"
                                : isIndexability === "Urls"
                                ? row?.Parameters || "-"
                                : ""}
                            </td>

                            {/* Seventh Column */}
                            <td>
                              {isIndexability === "internalLinks"
                                ? row?.Unique_Outlinks || "-"
                                : isIndexability === "content"
                                ? row?.Flesch_Reading_Ease_Score || "-"
                                : isIndexability === "Urls"
                                ? row?.Underscores || "-"
                                : ""}
                            </td>

                            {/* Eighth Column */}
                            <td>
                              {isIndexability === "internalLinks"
                                ? row?.External_Outlinks || "-"
                                : isIndexability === "content"
                                ? row?.Closest_Near_Duplicate_Match || "-"
                                : isIndexability === "Urls"
                                ? row?.Uppercase || "-"
                                : ""}
                            </td>

                            {/* Ninth Column */}
                            <td>
                              {isIndexability === "internalLinks"
                                ? row?.Unique_External_Outlinks || "-"
                                : isIndexability === "content"
                                ? row?.Closest_Semantically_Similar_Address ||
                                  "-"
                                : ""}
                            </td>
                          </>
                        )}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={10} className="text-center">
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

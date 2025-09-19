import React, { useEffect, useRef, useState } from "react";
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
  const [visibleRows, setVisibleRows] = useState<number>(50);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!tableRows.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleRows((prev) => Math.min(prev + 50, tableRows.length));
        }
      },
      { threshold: 1 }
    );
    const current = sentinelRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [tableRows]);

  const headerKeyMap: Record<string, string> = {
    "URL Address": "Address",
    Status: "Status",
    "Status Type": "Status_Type",
    Title: "Title_1",
    Indexability: "Indexability",
    "Indexability Status": "Indexability_Status",
    "Page title": "Title_1",
    "Title Length": "Title_1_Length",
    "Pixel Width": "Title_1_Pixel_Width",
    "Meta Description": "Meta_Description_1",
    H1: "H1_1",
    "H1 char. length": "H1_1_Length",
    "Status Code": "Status_Code",
    Inlinks: "Inlinks",
    "Unique Inlinks": "Unique_Inlinks",
    Outlinks: "Outlinks",
    "Unique Outlinks": "Unique_Outlinks",
    "External Outlinks": "External_Outlinks",
    "Unique External Outlinks": "Unique_External_Outlinks",
    "Word Count": "Word_Count",
    Readability: "Readability",
    "Sentence Count": "Sentence_Count",
    "Average Words Per Sentence": "Average_Words_Per_Sentence",
    "Flesch Reading Ease Score": "Flesch_Reading_Ease_Score",
    "Closest Near Duplicate Match": "Closest_Near_Duplicate_Match",
    "Closest Semantically Similar Address":
      "Closest_Semantically_Similar_Address",
    "Multiple Slashes": "Multiple_Slashes",
    "Non ASCII Characters": "Non_ASCII_Characters",
    "Over 115 Characters": "Over_115_Characters",
    Parameters: "Parameters",
    Underscores: "Underscores",
    Uppercase: "Uppercase",
  };

  // ✅ Sorting logic
  const sortedRows = [...tableRows].sort((a, b) => {
    if (!sortColumn) return 0;

    const key = headerKeyMap[sortColumn];
    const valA = a[key] ?? "";
    const valB = b[key] ?? "";

    const isNumeric = !isNaN(Number(valA)) && !isNaN(Number(valB));

    if (isNumeric) {
      return sortOrder === "asc"
        ? Number(valA) - Number(valB)
        : Number(valB) - Number(valA);
    }

    return sortOrder === "asc"
      ? String(valA).localeCompare(String(valB))
      : String(valB).localeCompare(String(valA));
  });

  const handleSort = (header: string) => {
    if (sortColumn === header) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(header);
      setSortOrder("asc");
    }
  };

  const renderRowCells = (row: any) => {
    switch (isIndexability) {
      case "statuscode":
        return (
          <>
            <td>{row?.Address || "-"}</td>
            <td>{row?.Indexability || "-"}</td>
            <td>{row?.Status_Code || "-"}</td>
            <td>{row?.Status || "-"}</td>
            <td>{row?.Status_Type || "-"}</td>
            <td>{row?.Title_1 || "-"}</td>
          </>
        );

      case "indexability":
        return (
          <>
            <td>{row?.Address || "-"}</td>
            <td>{row?.Indexability || "-"}</td>
            <td>{row?.Status_Code || "-"}</td>
            <td>{row?.Indexability_Status || "-"}</td>
            <td>{row?.Title_1 || "-"}</td>
          </>
        );

      case "pagetitle":
        return (
          <>
            <td>{row?.Address || "-"}</td>
            <td>{row?.Indexability || "-"}</td>
            <td>{row?.Status_Code || "-"}</td>
            <td>{row?.Title_1 || "-"}</td>
            <td>{row?.Title_1_Length || "-"}</td>
            <td>{row?.Title_1_Pixel_Width || "-"}</td>
          </>
        );

      case "metadescription":
        return (
          <>
            <td>{row?.Address || "-"}</td>
            <td>{row?.Indexability || "-"}</td>
            <td>{row?.Status_Code || "-"}</td>
            <td>{row?.Meta_Description_1 || "-"}</td>
          </>
        );

      case "htags":
        return (
          <>
            <td>{row?.Address || "-"}</td>
            <td>{row?.Indexability || "-"}</td>
            <td>{row?.Status_Code || "-"}</td>
            <td>{row?.Status || "-"}</td>
            <td>{row?.H1_1 || "-"}</td>
            <td>{row?.H1_1_Length || "-"}</td>
          </>
        );

      case "internalLinks":
        return (
          <>
            <td>{row?.Address || "-"}</td>
            <td>{row?.Indexability || "-"}</td>
            <td>{row?.Status_Code || "-"}</td>
            <td>{row?.Status || "-"}</td>
            <td>{row?.Inlinks || "-"}</td>
            <td>{row?.Unique_Inlinks || "-"}</td>
            <td>{row?.Outlinks || "-"}</td>
            <td>{row?.Unique_Outlinks || "-"}</td>
            <td>{row?.External_Outlinks || "-"}</td>
            <td>{row?.Unique_External_Outlinks || "-"}</td>
          </>
        );

      case "content":
        return (
          <>
            <td>{row?.Address || "-"}</td>
            <td>{row?.Indexability || "-"}</td>
            <td>{row?.Status_Code || "-"}</td>
            <td>{row?.Status || "-"}</td>
            <td>{row?.Word_Count || "-"}</td>
            <td>{row?.Readability || "-"}</td>
            <td>{row?.Sentence_Count || "-"}</td>
            <td>{row?.Average_Words_Per_Sentence || "-"}</td>
            <td>{row?.Flesch_Reading_Ease_Score || "-"}</td>
            <td>{row?.Closest_Near_Duplicate_Match || "-"}</td>
            <td>{row?.Closest_Semantically_Similar_Address || "-"}</td>
          </>
        );

      case "Urls":
        return (
          <>
            <td>{row?.Address || "-"}</td>
            <td>{row?.Indexability || "-"}</td>
            <td>{row?.Status_Code || "-"}</td>
            <td>{row?.Status || "-"}</td>
            <td>{row?.Multiple_Slashes || "-"}</td>
            <td>{row?.Non_ASCII_Characters || "-"}</td>
            <td>{row?.Over_115_Characters || "-"}</td>
            <td>{row?.Parameters || "-"}</td>
            <td>{row?.Underscores || "-"}</td>
            <td>{row?.Uppercase || "-"}</td>
          </>
        );

      default:
        return <td colSpan={10}>Data not found</td>;
    }
  };

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
                    className={`font_14 ${card.isDown ? "text-danger" : "text-success"
                      }  mb-1`}
                  >
                    <i
                      className={`bi ${card.isDown
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
                    className={`indexable_btn primary_btn ${activeFilter.trim().toLowerCase() ===
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
              <table className="table table-striped">
                <thead>
                  <tr>
                    {tableHeaders.map((header, idx) => (
                      <th
                        key={idx}
                        scope="col"
                        onClick={() => handleSort(header)}
                        className="cursor-pointer select-none"
                        style={{ cursor: "pointer" }}
                      >
                        {header}{" "}
                        <span>
                          {sortColumn === header
                            ? sortOrder === "asc"
                              ? "▲"
                              : "▼"
                            : "⇅"}
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sortedRows && sortedRows.length > 0 ? (
                    sortedRows.slice(0, visibleRows).map((row, rowIdx) => (
                      <tr
                        key={rowIdx}
                        style={{
                          backgroundColor:
                            rowIdx % 2 === 0 ? "#ffffff" : "#f9f9f9",
                          fontSize: "13px",
                        }}
                      >
                        {renderRowCells(row)}
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
              {visibleRows < tableRows.length && (
                <div ref={sentinelRef} style={{ height: "50px" }} />
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AuditSectionModal;

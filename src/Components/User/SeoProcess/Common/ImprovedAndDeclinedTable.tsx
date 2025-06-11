import React from "react";

type MetricType = "clicks" | "impressions" | "ctr" | "position";

interface KeywordItem {
  keyword: string;
  position_last_30_days: number;
  position_before_30_days: number;
  change_in_position: number;
  clicks_last_30_days: number;
  clicks_before_30_days: number;
  change_in_clicks: number;
  impressions_last_30_days: number;
  impressions_before_30_days: number;
  change_in_impressions: number;
  ctr_last_30_days: number;
  ctr_before_30_days: number;
  change_in_ctr: number;
}

interface Props {
  data: KeywordItem[];
  selectedMetric: MetricType;
}

const ImprovedAndDeclinedTable: React.FC<Props> = ({ data, selectedMetric }) => {
  const getMetricValues = (item: KeywordItem) => {
    switch (selectedMetric) {
      case "clicks":
        return {
          last30: item.clicks_last_30_days,
          before30: item.clicks_before_30_days,
          change: item.change_in_clicks,
        };
      case "impressions":
        return {
          last30: item.impressions_last_30_days,
          before30: item.impressions_before_30_days,
          change: item.change_in_impressions,
        };
      case "ctr":
        return {
          last30: item.ctr_last_30_days,
          before30: item.ctr_before_30_days,
          change: item.change_in_ctr,
        };
      case "position":
      default:
        return {
          last30: item.position_last_30_days,
          before30: item.position_before_30_days,
          change: item.change_in_position,
        };
    }
  };

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Keyword</th>
          <th>Pos. last 30 days</th>
          <th>Pos. before</th>
          <th>Change</th>
        </tr>
      </thead>
      <tbody>
        {data && data.length > 0 ? (
          data.map((item, index) => {
            const { last30, before30, change } = getMetricValues(item);
            const isPositive =
              selectedMetric === "position" ? change < 0 : change > 0;

            return (
              <tr key={index}>
                <td>{item.keyword}</td>
                <td>{last30}</td>
                <td>{before30}</td>
                <td className={isPositive ? "text-success" : "text-danger"}>
                  <i
                    className={`bi ${
                      isPositive ? "bi-arrow-up-short" : "bi-arrow-down-short"
                    }`}
                  ></i>{" "}
                  {Math.abs(change)}
                </td>
              </tr>
            );
          })
        ) : (
          <tr>
            <td colSpan={4} className="text-center text-muted py-3">
              No {selectedMetric} data found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default ImprovedAndDeclinedTable;

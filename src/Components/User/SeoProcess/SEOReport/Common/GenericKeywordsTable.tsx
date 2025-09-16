import React, { useState } from "react";
import { capitalizeFirstLetter } from "../Reports";
 

interface KeywordData {
  keyword: string;
  pos_last_30_days: number;
  pos_before_30_days: number;
  change: number;
}

interface Props {
  keywordList: KeywordData[];
  message: string;
  selectedMetric: string;
}

const GenericKeywordsTable: React.FC<Props> = ({
  keywordList,
  message,
  selectedMetric,
}) => {
  const [visibleCount, setVisibleCount] = useState(50);

  const handleShowMore = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setVisibleCount((prev) => prev + 50);
  };

  const visibleKeywords = keywordList.slice(0, visibleCount);

  return (
    <div className="col-12 col-xxl-6">
      <div className="card_box">
        <h3 className="font_20 font_400 ps-1">
          {message}
          <span className="font_12 gray_clr ps-2">
            {capitalizeFirstLetter(selectedMetric)}
          </span>
        </h3>

        <div className="branded_keywords table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Keywords</th>
                <th scope="col">Pos. last 30 days</th>
                <th scope="col">Pos. before</th>
                <th scope="col">Change</th>
              </tr>
            </thead>
            <tbody>
              {visibleKeywords.length > 0 ? (
                visibleKeywords.map((item, index) => {
                  const isPositive = item.change >= 0;
                  return (
                    <tr key={index}  >
                      <td>{item.keyword}</td>
                      <td>{item.pos_last_30_days}</td>
                      <td>{item.pos_before_30_days}</td>
                      <td
                        className={isPositive ? "text-success" : "text-danger"}
                      >
                        <i
                          className={`bi ${
                            isPositive
                              ? "bi-arrow-up-short"
                              : "bi-arrow-down-short"
                          }`}
                        ></i>{" "}
                        {item.change}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={4} className="text-center text-muted py-3">
                    No {message} found
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {visibleCount < keywordList.length && (
            <div className="text-center">
              <button
                type="button"
                className="show-more-button"
                onClick={handleShowMore}
              >
                Show More
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GenericKeywordsTable;

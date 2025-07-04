import React from "react";

interface CardItem {
  title: string;
  value: string;
  change?: string;
  percent?: string;
  status?: "success" | "danger";
  icon?: string;
  color?: string;
}

interface TableRow {
  url: string;
  status: string;
  type: string;
  title: string;
}

interface AuditSectionProps {
  title: string;
  cards: CardItem[];
  filters: string[];
  tableHeaders: string[];
  tableRows: TableRow[];
}

const AuditSection: React.FC<AuditSectionProps> = ({
  title,
  cards,
  filters,
  tableHeaders,
  tableRows,
}) => {
  return (
    <div className="seo_report_content brand_content">
      <form className="row">
        {/* Cards */}
        <div className="col-12">
          <div className="row overview_cards">
            {cards.map((card, idx) => (
              <div key={idx} className="col-12 col-sm-6 col-xxl-3">
                <div className="card_box">
                  <h3 className="font_18 font_300 mb-2">{card.title}</h3>
                  <h4 className="font_25 font_500 mb-1">{card.value}</h4>
                  <p
                    className={`font_14 ${
                      card.color ? card.color : `text-${card.status}`
                    } mb-1`}
                  >
                    <i
                      className={`bi ${
                        card.icon
                          ? card.icon
                          : card.status === "success"
                          ? "bi-arrow-up-short"
                          : "bi-arrow-down-short"
                      }`}
                    ></i>{" "}
                    {card.percent ?? card.change}
                  </p>
                  <img
                    src="/assets/images/indexable_card_graph.png"
                    alt="card-graph"
                    className="img-fluid indexable_graph w-100"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Filters + Table */}
        <div className="col-12 col-xxl-12">
          <div className="indexables_table_filter">
            <h3 className="font_18 mb-3">
              Pages - <span className="text_blue">{title}</span>
            </h3>
            <ul className="filter_btn_wrapper">
              {filters.map((filter, idx) => (
                <li key={idx}>
                  <button className="indexable_btn primary_btn">{filter}</button>
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
                  {tableRows.map((row, rowIdx) => (
                    <tr key={rowIdx}>
                      <td>{row.url}</td>
                      <td>{row.status}</td>
                      <td>{row.type}</td>
                      <td>{row.title}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AuditSection;

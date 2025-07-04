import { useState } from "react";
import Header from "../../Header/Header";
import SideBar from "../../SideBar/SideBar";
import AuditSection from "./AuditSection";

const cards = [
  {
    title: "200 Response",
    value: "1,398",
    percent: "4.8%",
    icon: "bi-arrow-up-short",
    color: "text-success",
  },
  {
    title: "3xx Response",
    value: "230",
    percent: "0.5%",
    icon: "bi-arrow-down-short",
    color: "text-danger",
  },
  {
    title: "4xx Response",
    value: "48",
    percent: "4.8%",
    icon: "bi-arrow-up-short",
    color: "text-success",
  },
  {
    title: "5xx Response",
    value: "39",
    percent: "4.8%",
    icon: "bi-arrow-up-short",
    color: "text-success",
  },
  {
    title: "Redirect Loop",
    value: "28",
    percent: "0.5%",
    icon: "bi-arrow-up-short",
    color: "text-success",
  },
  {
    title: "Redirect Chain",
    value: "17",
    percent: "0.5%",
    icon: "bi-arrow-up-short",
    color: "text-success",
  },
];

const tableHeaders = ["URL Address", "Status", "Status Type", "Title"];

const tableRows = [
  {
    url: "https://dataracks.com/our-products/",
    status: "200",
    type: "OK",
    title: "Our Products",
  },
  {
    url: "https://dataracks.com/our-products/",
    status: "200",
    type: "OK",
    title: "Design-Dataracks",
  },
  {
    url: "https://dataracks.com/our-products/",
    status: "200",
    type: "OK",
    title: "PDUs Fixing & Management",
  },
  {
    url: "https://dataracks.com/our-products/",
    status: "200",
    type: "OK",
    title: "Our Products",
  },
  {
    url: "https://dataracks.com/our-products/",
    status: "200",
    type: "OK",
    title: "Design-Dataracks",
  },
  {
    url: "https://dataracks.com/our-products/",
    status: "200",
    type: "OK",
    title: "PDUs Fixing & Management",
  },
  {
    url: "https://dataracks.com/our-products/",
    status: "200",
    type: "OK",
    title: "Our Products",
  },
  {
    url: "https://dataracks.com/our-products/",
    status: "200",
    type: "OK",
    title: "Design-Dataracks",
  },
  {
    url: "https://dataracks.com/our-products/",
    status: "200",
    type: "OK",
    title: "PDUs Fixing & Management",
  },
];

const filters = [
  "200 Response",
  "3xx Response",
  "4xx Response",
  "5xx Response",
  "Redirect Loop",
  "Redirect Chain",
];

const cardsIndexability = [
  {
    title: "Indexable",
    value: "1,398",
    percent: "4.8%",
    icon: "bi-arrow-up-short",
    color: "text-success",
  },
  {
    title: "Non-Indexable",
    value: "230",
    percent: "0.5%",
    icon: "bi-arrow-down-short",
    color: "text-danger",
  },
  {
    title: "URL with Noindex",
    value: "48",
    percent: "4.8%",
    icon: "bi-arrow-up-short",
    color: "text-success",
  },
  {
    title: "Blocked by robots.txt",
    value: "39",
    percent: "4.8%",
    icon: "bi-arrow-up-short",
    color: "text-success",
  },
  {
    title: "Contains Canonical Tag",
    value: "28",
    percent: "0.5%",
    icon: "bi-arrow-up-short",
    color: "text-success",
  },
  {
    title: "Missing Canonical Tag",
    value: "17",
    percent: "0.5%",
    icon: "bi-arrow-up-short",
    color: "text-success",
  },
  {
    title: "Sel Referencing Canonical",
    value: "2",
    percent: "4.8%",
    icon: "bi-arrow-up-short",
    color: "text-success",
  },
  {
    title: "Outside <head>",
    value: "2",
    percent: "4.8%",
    icon: "bi-arrow-up-short",
    color: "text-success",
  },
];

const tableHeadersIndexability = [
  "URL Address",
  "Indexability",
  "Indexability Status",
  "Page title",
];

const tableRowsIndexability = [
  {
    url: "https://dataracks.com/our-products/",
    status: "Indexable",
    type: "-",
    title: "Our Products",
  },
  {
    url: "https://dataracks.com/our-products/",
    status: "Indexable",
    type: "-",
    title: "Design-Dataracks",
  },
  {
    url: "https://dataracks.com/our-products/",
    status: "Indexable",
    type: "-",
    title: "PDUs Fixing & Management",
  },
  {
    url: "https://dataracks.com/our-products/",
    status: "Indexable",
    type: "-",
    title: "Our Products",
  },
  {
    url: "https://dataracks.com/our-products/",
    status: "Indexable",
    type: "-",
    title: "Design-Dataracks",
  },
  {
    url: "https://dataracks.com/our-products/",
    status: "Indexable",
    type: "-",
    title: "PDUs Fixing & Management",
  },
  {
    url: "https://dataracks.com/our-products/",
    status: "Indexable",
    type: "-",
    title: "Our Products",
  },
  {
    url: "https://dataracks.com/our-products/",
    status: "Indexable",
    type: "-",
    title: "Design-Dataracks",
  },
  {
    url: "https://dataracks.com/our-products/",
    status: "Indexable",
    type: "-",
    title: "PDUs Fixing & Management",
  },
];

const filtersIndexability = [
  "Indexable",
  "Non-indexable",
  "Meta Noindex",
  "Blocked by robots.txt",
  "Contains Canonical Tag",
  "Missing Canonical Tag",
  "Sel Referencing Canonical",
];

const cardsPageTitle = [
  {
    title: "All",
    value: "1,398",
    percent: "4.8%",
    icon: "bi-arrow-up-short",
    color: "text-success",
  },
  {
    title: "Missing",
    value: "230",
    percent: "0.5%",
    icon: "bi-arrow-down-short",
    color: "text-danger",
  },
  {
    title: "Duplicate",
    value: "48",
    percent: "4.8%",
    icon: "bi-arrow-up-short",
    color: "text-success",
  },
  {
    title: "Over 60 characters",
    value: "39",
    percent: "4.8%",
    icon: "bi-arrow-up-short",
    color: "text-success",
  },
  {
    title: "Below 30 characters",
    value: "28",
    percent: "0.5%",
    icon: "bi-arrow-up-short",
    color: "text-success",
  },
  {
    title: "Same as H1",
    value: "17",
    percent: "0.5%",
    icon: "bi-arrow-up-short",
    color: "text-success",
  },
  {
    title: "Multiple",
    value: "2",
    percent: "4.8%",
    icon: "bi-arrow-up-short",
    color: "text-success",
  },
];

const tableHeadersPageTitle = [
  "URL Address",
  "Title",
  "Title Length",
  "Pixel Width",
];

const tableRowsPageTitle = [
  {
    url: "https://dataracks.com/our-products/",
    status: "Our Products",
    type: "12",
    title: "Our Products",
  },
  {
    url: "https://dataracks.com/our-products/",
    status: "Design - Dataracks",
    type: "18",
    title: "Design-Dataracks",
  },
  {
    url: "https://dataracks.com/our-products/",
    status: "Patching Rakcs - Dataracks",
    type: "26",
    title: "Patching Rakcs - Dataracks",
  },
  {
    url: "https://dataracks.com/our-products/",
    status: "Swtich Ducts - Dataracks",
    type: "24",
    title: "Our Products",
  },
  {
    url: "https://dataracks.com/our-products/",
    status: "Our Products",
    type: "21",
    title: "Design-Dataracks",
  },
  {
    url: "https://dataracks.com/our-products/",
    status: "Our Products",
    type: "12",
    title: "PDUs Fixing & Management",
  },
  {
    url: "https://dataracks.com/our-products/",
    status: "Our Products",
    type: "12",
    title: "Our Products",
  },
  {
    url: "https://dataracks.com/our-products/",
    status: "Our Products",
    type: "12",
    title: "Design-Dataracks",
  },
  {
    url: "https://dataracks.com/our-products/",
    status: "Our Products",
    type: "12",
    title: "PDUs Fixing & Management",
  },
];

const filtersPageTitle = [
  "Missing",
  "Duplicate",
  "Too long",
  "Too short",
  "Same as H1",
  "Multiple",
];

const cardsHTags = [
  {
    title: "All",
    value: "1,398",
    percent: "4.8%",
    icon: "bi-arrow-up-short",
    color: "text-success",
  },
  {
    title: "H1 Missing",
    value: "230",
    percent: "0.5%",
    icon: "bi-arrow-down-short",
    color: "text-danger",
  },
  {
    title: "H1 Duplicate",
    value: "48",
    percent: "4.8%",
    icon: "bi-arrow-up-short",
    color: "text-success",
  },
  {
    title: "H1 Over 70 characters",
    value: "39",
    percent: "4.8%",
    icon: "bi-arrow-up-short",
    color: "text-success",
  },
  {
    title: "Multiple H1s",
    value: "28",
    percent: "0.5%",
    icon: "bi-arrow-up-short",
    color: "text-success",
  },
  {
    title: "H2 Missing",
    value: "17",
    percent: "0.5%",
    icon: "bi-arrow-up-short",
    color: "text-success",
  },
  {
    title: "H2 Duplicate",
    value: "2",
    percent: "4.8%",
    icon: "bi-arrow-up-short",
    color: "text-success",
  },
];

const tableHeadersHTags = ["URL Address", "Status", "H1", "H1 char. length"];

const tableRowsHTags = [
  {
    url: "https://dataracks.com/our-products/",
    status: "200",
    type: "Our Products",
    title: "12",
  },
  {
    url: "https://dataracks.com/our-products/",
    status: "200",
    type: "Design",
    title: "18",
  },
  {
    url: "https://dataracks.com/our-products/",
    status: "200",
    type: "Patching Rakcs",
    title: "26",
  },
  {
    url: "https://dataracks.com/our-products/",
    status: "200",
    type: "	Switch Ducts",
    title: "24",
  },
  {
    url: "https://dataracks.com/our-products/",
    status: "200",
    type: "Wallboxes",
    title: "21",
  },
  {
    url: "https://dataracks.com/our-products/",
    status: "200",
    type: "Aisle Containment",
    title: "21",
  },
  {
    url: "https://dataracks.com/our-products/",
    status: "200",
    type: "Chimney Cabinets",
    title: "16",
  },
  {
    url: "https://dataracks.com/our-products/",
    status: "200",
    type: "Blanking Panels",
    title: "25",
  },
  {
    url: "https://dataracks.com/our-products/",
    status: "200",
    type: "Power Management",
    title: "28",
  },
];

const filtersHTags = [
  "H1 Missing",
  "H1 Duplicate",
  "H1 Over 70 char.",
  "H1 Missing",
  "H2 Duplicate",
  "Multiple H1",
];

const cardsMeta = [
  {
    title: "All",
    value: "1,398",
    percent: "4.8%",
    icon: "bi-arrow-up-short",
    color: "text-success",
  },
  {
    title: "Missing",
    value: "230",
    percent: "0.5%",
    icon: "bi-arrow-down-short",
    color: "text-danger",
  },
  {
    title: "Duplicate",
    value: "48",
    percent: "4.8%",
    icon: "bi-arrow-up-short",
    color: "text-success",
  },
  {
    title: "Over 160 characters",
    value: "39",
    percent: "4.8%",
    icon: "bi-arrow-up-short",
    color: "text-success",
  },
  {
    title: "Below 70 characters",
    value: "28",
    percent: "0.5%",
    icon: "bi-arrow-up-short",
    color: "text-success",
  },
  {
    title: "Multiple",
    value: "17",
    percent: "0.5%",
    icon: "bi-arrow-up-short",
    color: "text-success",
  },
];

const tableHeadersMeta = ["URL Address", "","Meta Description",""];

const tableRowsMeta = [
  {
    url: "https://dataracks.com/our-products/",
    status: "",
    type: "	- Site Survey -Bespoke Product Design - Prototyping - Structual & load analysis",
    title: "",
  },
  {
    url: "https://dataracks.com/our-products/",
    status: "",
    type: `	-SHRINK PROOF Our range of data centre shrink roof designs, provide a safe a robust solution for your site. Dataricks has introduced our new "Shrink" Panels for aisle containment. The Shrink Panels are specifically designed roof panels for aisle containment. So, in the case of a fire at your data centre, the Panels will automatically.`,
    title: "",
  },
  {
    url: "https://dataracks.com/our-products/",
    status: "",
    type: "- Site Survey -Bespoke Product Design - Prototyping - Structual & load analysis",
    title: "",
  },
  {
    url: "https://dataracks.com/our-products/",
    status: "",
    type: `	-SHRINK PROOF Our range of data centre shrink roof designs, provide a safe a robust solution for your site. Dataricks has introduced our new "Shrink" Panels for aisle containment. The Shrink Panels are specifically designed roof panels for aisle containment. So, in the case of a fire at your data centre, the Panels will automatically.`,
    title: "",
  },
  {
    url: "https://dataracks.com/our-products/",
    status: "",
    type: "- Site Survey -Bespoke Product Design - Prototyping - Structual & load analysis",
    title: "",
  },
  {
    url: "https://dataracks.com/our-products/",
    status: "",
    type: `-SHRINK PROOF Our range of data centre shrink roof designs, provide a safe a robust solution for your site. Dataricks has introduced our new "Shrink" Panels for aisle containment. The Shrink Panels are specifically designed roof panels for aisle containment. So, in the case of a fire at your data centre, the Panels will automatically.`,
    title: "",
  },
  {
    url: "https://dataracks.com/our-products/",
    status: "",
    type: "- Site Survey -Bespoke Product Design - Prototyping - Structual & load analysis",
    title: "",
  },
  {
    url: "https://dataracks.com/our-products/",
    status: "",
    type: `	-SHRINK PROOF Our range of data centre shrink roof designs, provide a safe a robust solution for your site. Dataricks has introduced our new "Shrink" Panels for aisle containment. The Shrink Panels are specifically designed roof panels for aisle containment. So, in the case of a fire at your data centre, the Panels will automatically.`,
    title: "",
  },
  {
    url: "https://dataracks.com/our-products/",
    status: "",
    type: "	- Site Survey -Bespoke Product Design - Prototyping - Structual & load analysis",
    title: "",
  },
];

const filtersMeta = [
  "Missing",
  "Duplicate",
  "Too long",
  "Too short",
  "Multiple",
];

const SeoAudit = () => {
  const [selectedTab, setSelectedTab] = useState<string>("Overview");
  return (
    <>
      <Header />
      <main className="main_wrapper">
        <SideBar />
        <div className="inner_content">
          <div className="keyword_tool_content  generate_post create_content">
            <div className="content_header mb-4">
              <h2 className="font_25 font_600 mb-2">
                <img
                  src="/assets/images/seo_report_icon.png"
                  className="heading_icon me-1"
                  alt="heading icon"
                />
                SEO Audit <span className="text_blue">/ {selectedTab}</span>
              </h2>
            </div>
            <div className="profile_settings_wrapper seo_audit_wrapper">
              <div className="row gy-3">
                <div className="col-12 col-xl-3 col-xxl-2">
                  <div className="settings_tabs_wrapper previously_created_warpper">
                    <ul
                      className="nav nav-pills flex-column nav-pills"
                      id="audit-tab"
                      role="tablist"
                    >
                      {[
                        { id: "overview", label: "Overview" },
                        { id: "indexability", label: "Indexability" },
                        { id: "status", label: "Status Codes" },
                        { id: "titles", label: "Page Titles" },
                        { id: "meta", label: "Meta Descriptions" },
                        { id: "tags", label: "H tags" },
                        { id: "internal", label: "Internal Links" },
                        { id: "content", label: "Content" },
                        { id: "url", label: "URLs" },
                        { id: "images", label: "Images" },
                      ].map((item, index) => (
                        <li
                          className="nav-item"
                          role="presentation"
                          key={item.id}
                        >
                          <button
                            className={`nav-link ${
                              index === 0 ? "active" : ""
                            }`}
                            id={`audit-${item.id}-tab`}
                            data-bs-toggle="pill"
                            data-bs-target={`#audit-${item.id}`}
                            type="button"
                            role="tab"
                            aria-controls={`audit-${item.id}`}
                            aria-selected={index === 0 ? "true" : "false"}
                             onClick={() => setSelectedTab(item.label)}
                          >
                            {item.label}
                            <span>
                              <i className="bi bi-chevron-right"></i>
                            </span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="col-12 col-xl-9 col-xxl-10">
                  <div
                    className="tab-content setting_tab_content"
                    id="pills-tabContent"
                  >
                    <div
                      className="tab-pane fade show active"
                      id="audit-overview"
                      role="tabpanel"
                      aria-labelledby="audit-overview-tab"
                    >
                      <div className="seo_report_content overview_content">
                        <form className="row">
                          <div className="col-12">
                            <div className="row overview_cards">
                              <div className="col-12 col-sm-6 col-xxl-3">
                                <div className="card_box">
                                  <h3 className="font_18 font_300 mb-2">
                                    Indexable URLs
                                  </h3>
                                  <h4 className="font_25 font_500 mb-1">
                                    1,398
                                  </h4>
                                  <p className="font_14 text-success mb-1">
                                    <i className="bi bi-arrow-up-short"></i>{" "}
                                    4.8%
                                  </p>
                                </div>
                              </div>

                              <div className="col-12 col-sm-6 col-xxl-3">
                                <div className="card_box">
                                  <h3 className="font_18 font_300 mb-2">
                                    Non-Indexable URLs
                                  </h3>
                                  <h4 className="font_25 font_500 mb-1">330</h4>
                                  <p className="font_14 text-danger mb-1">
                                    <i className="bi bi-arrow-down-short"></i>{" "}
                                    0.5%
                                  </p>
                                </div>
                              </div>

                              <div className="col-12 col-sm-6 col-xxl-3">
                                <div className="card_box">
                                  <h3 className="font_18 font_300 mb-2">
                                    Ranking Keywords
                                  </h3>
                                  <h4 className="font_25 font_500 mb-1">
                                    1,398
                                  </h4>
                                  <p className="font_14 text-success mb-1">
                                    <i className="bi bi-arrow-up-short"></i>{" "}
                                    4.8%
                                  </p>
                                </div>
                              </div>

                              <div className="col-12 col-sm-6 col-xxl-3">
                                <div className="card_box">
                                  <h3 className="font_18 font_300 mb-2">
                                    Ranking URLs
                                  </h3>
                                  <h4 className="font_25 font_500 mb-1">330</h4>
                                  <p className="font_14 text-success mb-1">
                                    <i className="bi bi-arrow-up-short"></i>{" "}
                                    0.5%
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>

                    <div
                      className="tab-pane fade"
                      id="audit-indexability"
                      role="tabpanel"
                      aria-labelledby="audit-indexability-tab"
                    >
                      <AuditSection
                        title="Indexable"
                        cards={cardsIndexability}
                        filters={filtersIndexability}
                        tableHeaders={tableHeadersIndexability}
                        tableRows={tableRowsIndexability}
                      />
                    </div>

                    <div
                      className="tab-pane fade"
                      id="audit-status"
                      role="tabpanel"
                      aria-labelledby="audit-status-tab"
                    >
                      <AuditSection
                        title="200 Response"
                        cards={cards}
                        filters={filters}
                        tableHeaders={tableHeaders}
                        tableRows={tableRows}
                      />
                    </div>

                    <div
                      className="tab-pane fade"
                      id="audit-titles"
                      role="tabpanel"
                      aria-labelledby="audit-titles-tab"
                    >
                      <AuditSection
                        title="Title Missing"
                        cards={cardsPageTitle}
                        filters={filtersPageTitle}
                        tableHeaders={tableHeadersPageTitle}
                        tableRows={tableRowsPageTitle}
                      />
                    </div>

                    <div
                      className="tab-pane fade"
                      id="audit-meta"
                      role="tabpanel"
                      aria-labelledby="audit-meta-tab"
                    >
                      <AuditSection
                        title="Meta description over 1600 characters"
                        cards={cardsMeta}
                        filters={filtersMeta}
                        tableHeaders={tableHeadersMeta}
                        tableRows={tableRowsMeta}
                      />
                    </div>

                    <div
                      className="tab-pane fade"
                      id="audit-tags"
                      role="tabpanel"
                      aria-labelledby="audit-tags-tab"
                    >
                      <AuditSection
                        title="H1 Missing"
                        cards={cardsHTags}
                        filters={filtersHTags}
                        tableHeaders={tableHeadersHTags}
                        tableRows={tableRowsHTags}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default SeoAudit;

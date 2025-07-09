import { useEffect, useState } from "react";
import Header from "../../Header/Header";
import SideBar from "../../SideBar/SideBar";
import AuditSection from "./AuditSection";
import { GetAuditListDetails, GetCrawDataById } from "../SeoServices";
import Loading from "../../../Page/Loading/Loading";
import AuditAllSiteModal from "./SeoAuditModals/AuditAllSiteModal";
import AuditSectionModal, {
  CardItem,
} from "./SeoAuditModals/AuditSectionModal";

const tableStatusCodeHeaders = [
  "URL Address",
  "Status",
  "Status Type",
  "Title",
];

const tableHeadersIndexability = [
  "URL Address",
  "Indexability",
  "Indexability Status",
  "Page title",
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

const tableHeadersMeta = ["URL Address", "", "Meta Description", ""];

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
export interface CrawlSite {
  uuid: string;
  crawl_url: string;
}

type KPI = {
  count: number;
  percentage: number;
};

type IndexabilityKpis = Record<string, KPI>;

interface IndexabilityState {
  data: {
    tables: {
      [key: string]: any[];
    };
  } | null;
  filters: string[];
  cards: CardItem[];
  activeFilter: string;
  tableData: any[];
}

interface IndexabilityState {
  data: {
    tables: {
      [key: string]: any[];
    };
  } | null;
  filters: string[];
  cards: CardItem[];
  activeFilter: string;
  tableData: any[];
}

const SeoAudit = () => {
  const [selectedTab, setSelectedTab] = useState<string>("Overview");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true);
  const [AllCrawlList, setAllCrawlList] = useState<CrawlSite[]>([]);
  const [AlreadySelectedCrawl, setAlreadySelectedCrawl] = useState<
    string | null
  >(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedSite, setSelectedSite] = useState<CrawlSite | null>(null);
  const [indexability, setIndexability] = useState<IndexabilityState>({
    data: null,
    filters: [],
    cards: [],
    activeFilter: "",
    tableData: [],
  });

  const [statusCode, setStatusCode] = useState<IndexabilityState>({
    data: null,
    filters: [],
    cards: [],
    activeFilter: "",
    tableData: [],
  });

  useEffect(() => {
    fetchWebListDetails();
  }, []);

  useEffect(() => {
    if (selectedSite) {
      handleCloseModal();
    }
  }, [selectedSite]);

  const fetchWebListDetails = async () => {
    try {
      setIsLoading(true);
      const response = await GetAuditListDetails();
      if (response?.status === 200 || response?.status === 201) {
        // console.log(response?.data?.sites || []);
        setAllCrawlList(response?.data || []);
        setAlreadySelectedCrawl(response?.data?.selected_site);
      }
    } catch (error: any) {
      console.error("Error fetchWebList:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const generateCards = (kpis: IndexabilityKpis): CardItem[] =>
    Object.entries(kpis).map(([key, value]) => {
      const percent = value.percentage;
      const isDown = percent < 0;

      return {
        title: key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
        value: value.count,
        percent,
        isDown,
        chart: [
          { name: "Count", value: percent },
          { name: "Remaining", value: 100 - percent },
        ],
      };
    });

  const handleCloseModal = async () => {
    try {
      setIsLoading(true);

      const response = await GetCrawDataById(selectedSite?.uuid!);

      if (response.status === 200) {
        const data = response.data;

        const indexFilters = Object.keys(data.indexability?.tables || {});
        const firstIndexFilter = indexFilters[0] || "";

        setIndexability({
          data: data.indexability,
          filters: indexFilters,
          activeFilter: firstIndexFilter,
          tableData: data.indexability?.tables?.[firstIndexFilter] || [],
          cards: generateCards(
            data.indexability?.kpis?.indexability_kpis || {}
          ),
        });

        // Status Code
        const statusFilters = Object.keys(data.status_code?.tables || {});
        const firstStatusFilter = statusFilters[0] || "";

        setStatusCode({
          data: data.status_code,
          filters: statusFilters,
          activeFilter: firstStatusFilter,
          tableData: data.status_code?.tables?.[firstStatusFilter] || [],
          cards: generateCards(data.status_code?.kpis?.status_code_kpis || {}),
        });
        setIsModalOpen(false);
      }
    } catch (error: any) {
      console.error("Error fetchWebList:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <Loading />}
      <Header />
      <main className="main_wrapper">
        <SideBar />
        <div className="inner_content">
          <div className="keyword_tool_content  generate_post create_content">
            <div
              className="content_header mb-4"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h2 className="font_25 font_600 mb-2">
                <img
                  src="/assets/images/seo_report_icon.png"
                  className="heading_icon me-1"
                  alt="heading icon"
                />
                SEO Audit <span className="text_blue">/ {selectedTab}</span>
              </h2>

              {AllCrawlList?.length > 0 && !isModalOpen && (
                <select
                  className="form-select"
                  style={{ width: "auto" }}
                  value={selectedSite?.crawl_url || ""}
                  onChange={(e) => {
                    const selected = AllCrawlList.find(
                      (site) => site.crawl_url === e.target.value
                    );
                    if (selected) {
                      setSelectedSite(selected);
                    }
                  }}
                >
                  {AllCrawlList.map((item, index) => (
                    <option key={index} value={item.crawl_url}>
                      {item.crawl_url}
                    </option>
                  ))}
                </select>
              )}
            </div>
            {isModalOpen ? (
              <>
                <AuditAllSiteModal
                  isOpen={isModalOpen}
                  AllCrawlList={AllCrawlList}
                  onSelect={(site) => {
                    setSelectedSite(site);
                  }}
                  selectedSite={selectedSite}
                  AlreadySelectedCrawl={AlreadySelectedCrawl}
                  isLoading={isLoading}
                />
              </>
            ) : (
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
                                    <h4 className="font_25 font_500 mb-1">
                                      330
                                    </h4>
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
                                    <h4 className="font_25 font_500 mb-1">
                                      330
                                    </h4>
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
                        <AuditSectionModal
                          cards={indexability.cards}
                          filters={indexability.filters}
                          tableHeaders={tableHeadersIndexability}
                          tableRows={indexability.tableData}
                          activeFilter={indexability.activeFilter}
                          setActiveFilter={(filter: string) => {
                            setIndexability((prev) => ({
                              ...prev,
                              activeFilter: filter,
                              tableData: prev.data?.tables?.[filter] || [],
                            }));
                          }}
                          isIndexability={true}
                        />
                      </div>

                      <div
                        className="tab-pane fade"
                        id="audit-status"
                        role="tabpanel"
                        aria-labelledby="audit-status-tab"
                      >
                        <AuditSectionModal
                          cards={statusCode.cards}
                          filters={statusCode.filters}
                          tableHeaders={tableStatusCodeHeaders}
                          tableRows={statusCode.tableData}
                          activeFilter={statusCode.activeFilter}
                          setActiveFilter={(filter: string) => {
                            setStatusCode((prev) => ({
                              ...prev,
                              activeFilter: filter,
                              tableData: prev.data?.tables?.[filter] || [],
                            }));
                          }}
                          isIndexability={false}
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
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default SeoAudit;

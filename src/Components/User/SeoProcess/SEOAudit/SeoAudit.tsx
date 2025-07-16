import { useCallback, useEffect, useState } from "react";
import Header from "../../Header/Header";
import SideBar from "../../SideBar/SideBar";
import { GetAuditListDetails, GetCrawDataById } from "../SeoServices";
import Loading from "../../../Page/Loading/Loading";
import AuditAllSiteModal, { Site } from "./SeoAuditModals/AuditAllSiteModal";
import AuditSectionModal, {
  CardItem,
} from "./SeoAuditModals/AuditSectionModal";
import ConfirmModal from "../../../Page/ConfirmModal";
import DomainModal from "../../../Page/DomainModal";

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

const tableHeadersPageTitle = [
  "URL Address",
  "Title",
  "Title Length",
  "Pixel Width",
];

const tableHeadersMeta = ["URL Address", "Meta Description"];

const tableHeadersHTags = ["URL Address", "Status", "H1", "H1 char. length"];

export interface CrawlSite {
  uuid: string;
  crawl_url: string;
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
  const [AddAlreadySelectSite, setAddAlreadySelectSite] = useState<any>(null);
  const [AllData, setAllData] = useState<any>([]);
  const [AlreadySelectedCrawl, setAlreadySelectedCrawl] = useState<
    string | null
  >("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isNewLoading, setIsNewLoading] = useState<boolean>(false);
  const [ActionConfirmModal, setActionConfirmModal] = useState(false);
  const [ShowAddDomainModal, setShowAddDomainModal] = useState(false);
  const [domainInput, setDomainInput] = useState<string>("");
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

  const [pageTitle, setPageTitle] = useState<IndexabilityState>({
    data: null,
    filters: [],
    cards: [],
    activeFilter: "",
    tableData: [],
  });

  const [metaDescription, setMetaDescription] = useState<IndexabilityState>({
    data: null,
    filters: [],
    cards: [],
    activeFilter: "",
    tableData: [],
  });

  const [hTags, setHTags] = useState<IndexabilityState>({
    data: null,
    filters: [],
    cards: [],
    activeFilter: "",
    tableData: [],
  });

  useEffect(() => {
    fetchWebListDetails();
  }, []);

  const fetchWebListDetails = async () => {
    try {
      setIsLoading(true);
      const response = await GetAuditListDetails();
      if (response?.status === 200 || response?.status === 201) {
        const selected = response?.data?.[0]?.selected_site;
        setAllData(response?.data);
        setAlreadySelectedCrawl(selected);
      }
    } catch (error: any) {
      console.error("Error fetchWebList:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const generateCards = (
    kpis: Record<string, { date: string; count: number; percentage: number }[]>
  ): CardItem[] => {
    return Object.entries(kpis).map(([key, entries]) => {
      const title = key
        .replace(/_/g, " ")
        .replace(/\b\w/g, (l) => l.toUpperCase());

      const chart = entries.map((item) => ({
        name: new Date(item.date).toLocaleDateString("en-GB"),
        value: item.count,
      }));

      const latest = entries[entries.length - 1];

      return {
        title,
        value: latest?.count || 0,
        percent: latest?.percentage || 0,
        isDown: (latest?.percentage || 0) < 0,
        chart,
      };
    });
  };

 
  const handleCloseModal = async (site: Site) => {
    try {
      setIsNewLoading(true);
      const response = await GetCrawDataById(site?.uuid!);

      if (response.status === 200) {
        const data = response.data;
        console.log(data, "data");
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

        //page Title
        const pageTitleFilters = Object.keys(data.page_title?.tables || {});
        const firstpageTitleFilter = pageTitleFilters[0] || "";

        setPageTitle({
          data: data.page_title,
          filters: pageTitleFilters,
          activeFilter: firstpageTitleFilter,
          tableData: data.page_title?.tables?.[firstpageTitleFilter] || [],
          cards: generateCards(data.page_title?.kpis?.page_title_kpis || {}),
        });

        //Meta Description
        const metaDescriptionFilters = Object.keys(
          data.meta_description?.tables || {}
        );
        const firstMetaDescriptionFilter = metaDescriptionFilters[0] || "";

        setMetaDescription({
          data: data.meta_description,
          filters: metaDescriptionFilters,
          activeFilter: firstMetaDescriptionFilter,
          tableData:
            data.meta_description?.tables?.[firstMetaDescriptionFilter] || [],
          cards: generateCards(
            data.meta_description?.kpis?.meta_description_kpis || {}
          ),
        });

        //H-Tags
        const hTagFilters = Object.keys(data.h_tags?.tables || {});
        const firstHTagsFilter = hTagFilters[0] || "";

        setHTags({
          data: data.h_tags,
          filters: hTagFilters,
          activeFilter: firstHTagsFilter,
          tableData: data.h_tags?.tables?.[firstHTagsFilter] || [],
          cards: generateCards(data.h_tags?.kpis?.h_tags_kpis || {}),
        });

        setShowAddDomainModal(false);
      }
    } catch (error: any) {
      console.error("Error fetchWebList:", error);
    } finally {
      setIsModalOpen(false);
      setIsNewLoading(false);
    }
  };

  const handleConfirmModal = () => {
    setActionConfirmModal(false);
    setShowAddDomainModal(true);
  };

  const handleCancel = () => {
    setActionConfirmModal(false);
  };

  const handleCloseDomainModel = () => {
    setShowAddDomainModal(false);
  };

  const handleSelect = useCallback((site: Site) => {
    setAddAlreadySelectSite(site);
    handleCloseModal(site);
    setShowAddDomainModal(false);
  }, []);

  return (
    <>
      {isLoading && <Loading />}
      {isNewLoading && <Loading />}
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

              {!isModalOpen && (
                <button
                  className="btn primary_btn ok_btn"
                  onClick={() => setActionConfirmModal(true)}
                >
                  Search New Domain
                </button>
              )}

              <ConfirmModal
                isOpen={ActionConfirmModal}
                title="If you do this, your data from the previous domain will be removed."
                onClose={handleConfirmModal}
                onCancel={handleCancel}
              />

              {ShowAddDomainModal && (
                <DomainModal
                  title="🔍 Enter a New Domain"
                  content={domainInput}
                  setContent={setDomainInput}
                  handleClose={handleCloseDomainModel}
                  onSelect={handleSelect}
                  AddAlreadySelectSite={AddAlreadySelectSite}
                />
              )}
            </div>
            {isModalOpen ? (
              <>
                <AuditAllSiteModal
                  isOpen={isModalOpen}
                  onSelect={handleSelect}
                  AllData={AllData}
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
                          isIndexability="indexability"
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
                          isIndexability="statuscode"
                        />
                      </div>

                      <div
                        className="tab-pane fade"
                        id="audit-titles"
                        role="tabpanel"
                        aria-labelledby="audit-titles-tab"
                      >
                        <AuditSectionModal
                          cards={pageTitle.cards}
                          filters={pageTitle.filters}
                          tableHeaders={tableHeadersPageTitle}
                          tableRows={pageTitle.tableData}
                          activeFilter={pageTitle.activeFilter}
                          setActiveFilter={(filter: string) => {
                            setPageTitle((prev) => ({
                              ...prev,
                              activeFilter: filter,
                              tableData: prev.data?.tables?.[filter] || [],
                            }));
                          }}
                          isIndexability="pagetitle"
                        />
                      </div>

                      <div
                        className="tab-pane fade"
                        id="audit-meta"
                        role="tabpanel"
                        aria-labelledby="audit-meta-tab"
                      >
                        <AuditSectionModal
                          cards={metaDescription.cards}
                          filters={metaDescription.filters}
                          tableHeaders={tableHeadersMeta}
                          tableRows={metaDescription.tableData}
                          activeFilter={metaDescription.activeFilter}
                          setActiveFilter={(filter: string) => {
                            setMetaDescription((prev) => ({
                              ...prev,
                              activeFilter: filter,
                              tableData: prev.data?.tables?.[filter] || [],
                            }));
                          }}
                          isIndexability="metadescription"
                        />
                      </div>

                      <div
                        className="tab-pane fade"
                        id="audit-tags"
                        role="tabpanel"
                        aria-labelledby="audit-tags-tab"
                      >
                        <AuditSectionModal
                          cards={hTags.cards}
                          filters={hTags.filters}
                          tableHeaders={tableHeadersHTags}
                          tableRows={hTags.tableData}
                          activeFilter={hTags.activeFilter}
                          setActiveFilter={(filter: string) => {
                            setHTags((prev) => ({
                              ...prev,
                              activeFilter: filter,
                              tableData: prev.data?.tables?.[filter] || [],
                            }));
                          }}
                          isIndexability="htags"
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

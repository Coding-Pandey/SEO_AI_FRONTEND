import { useEffect, useRef, useState } from "react";
import Header from "../../Header/Header";
import SideBar from "../../SideBar/SideBar";
import {
  AddBrandedWordanalysis,
  AddRankingKeyword,
  AddSearchConsole,
  GetFilterData,
  GetWebListDetails,
} from "../SeoServices";
import Loading from "../../../Page/Loading/Loading";
import SelectSiteModal from "./SelectSiteModal";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { subMonths } from "date-fns";
import LineChartGraph from "./charts/LineChart";
import CircleGraph from "./charts/CircleGraph";
import FilterComponent from "./Common/FilterComponent";
import GenericKeywordsTable from "./Common/GenericKeywordsTable";
import PieChartGraph from "./charts/PieChartGraph";
import BrandVsNonBrandChart from "./charts/BrandVsNonBrandChart";
import BrandedGenericAreaChart from "./charts/BrandedGenericAreaChart";
import ImprovedAndDeclinedTable from "./Common/ImprovedAndDeclinedTable";
import RankingAreaChart from "./charts/RankingAreaChart";
import KeywordRankingChart from "./charts/KeywordRankingChart";
import ChartFilter from "./Common/ChartFilter";

export interface Site {
  siteUrl: string;
  permissionLevel: string;
}

type MetricData = {
  Current: number;
  Previous?: number;
  Difference?: number;
  "Change (%)"?: number;
  Change_Direction?: string;
  "Relative_Change (%)"?: number;
  Percentage_Point_Change?: number;
  Position_Change?: number;
  Direction?: string;
  Change_Type?: string;
};

type CardMatrix = Record<string, MetricData>;

type DisplayItem = {
  title: string;
  value: number;
  percent: string;
  isDown: boolean;
};

function formatDateToYYYYMMDD(date: any) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // months are 0-indexed
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

const getTitle = (rankBucket: string) => {
  switch (rankBucket) {
    case "Top 3":
      return "Top 3 (#1-3)";
    case "Top 4-10":
      return "Top 10 (#4-10)";
    case "Top 11-20":
      return "Top 20 (#11-20)";
    case "Pos 21+":
      return "Position 21+";
    default:
      return rankBucket;
  }
};

export const capitalizeFirstLetter = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);

const Reports = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [webList, setWebList] = useState<Site[]>([]);
  const [webListAllData, setWebListAllData] = useState<string | null>(null);
  const [selectedSite, setSelectedSite] = useState<Site | null>(null);
  const [FilterData, setFilterData] = useState<any>({});
  const [selectedDeviceType, setSelectedDeviceType] =
    useState<string>("All");
  const [selectedSearchType, setSelectedSearchType] = useState<string>("web");
  const [selectedCountry, setSelectedCountry] = useState<string>("All");
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [SearchConsole, setSearchConsole] = useState<any>({});
  const [RankingKeyword, setRankingKeyword] = useState<any>({});
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [BrandedWordAnalysis, setBrandedWordAnalysis] = useState<any>({});
  const [BrandTags, setBrandTags] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [selectedMetric, setSelectedMetric] = useState<
    "clicks" | "impressions" | "ctr" | "position"
  >("clicks");
const initialLoadRef = useRef(false);
  const today = new Date();
  const sixMonthsAgo = subMonths(today, 6);
  const threeMonthsAgo = subMonths(today, 3);
  const [range, setRange] = useState([
    {
      startDate: threeMonthsAgo,
      endDate: today,
      key: "selection",
    },
  ]);

  useEffect(() => {
    fetchWebListDetails();
  }, []);

  const fetchWebListDetails = async () => {
    try {
      setIsLoading(true);
      const response = await GetWebListDetails();
      const responseFilterData = await GetFilterData();
      if (response?.status === 200 || response?.status === 201) {
        setWebList(response?.data?.sites || []);
        setWebListAllData(response?.data?.selected_site);
        setFilterData(responseFilterData.data);
      }
    } catch (error: any) {
      console.error("Error fetchWebList:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (selectedSite) {
      handleCloseModal(BrandTags);
    }
    initialLoadRef.current = true;
  }, [
    selectedSearchType,
    selectedCountry,
    selectedDeviceType,
    range,
    selectedSite,
    BrandTags,
  ]);

  const setBrandTagsAndFetch = (tags: string[]) => {
    console.log(setBrandTags, "setBrandTags");
    setBrandTags(tags)
    handleCloseModal(tags);
  };

  // const handleCloseModal = async (BrandTags: any) => {
  //   try {
  //     setIsLoading(true);
  //     const payload = {
  //       site_url: selectedSite?.siteUrl,
  //       search_type: selectedSearchType,
  //       country: selectedCountry === "All" ? null : selectedCountry,
  //       device_type: selectedDeviceType === "All" ? null : selectedDeviceType,
  //       start_date: formatDateToYYYYMMDD(range[0]?.startDate),
  //       end_date: formatDateToYYYYMMDD(range[0]?.endDate),
  //     };
  //     const payloadNewBranch = {
  //       site_url: selectedSite?.siteUrl,
  //       search_type: selectedSearchType,
  //       country: selectedCountry === "All" ? null : selectedCountry,
  //       device_type: selectedDeviceType === "All" ? null : selectedDeviceType,
  //       start_date: formatDateToYYYYMMDD(range[0]?.startDate),
  //       end_date: formatDateToYYYYMMDD(range[0]?.endDate),
  //       branded_words: BrandTags,
  //     };

  //     const responseSearchConsole = await AddSearchConsole(payload);
  //     const responseRankingKeyword = await AddRankingKeyword(payload);
  //     const responseBrandedWordanalysis = await AddBrandedWordanalysis(
  //       payloadNewBranch
  //     );
  //     if (
  //       responseSearchConsole.status === 200 ||
  //       responseRankingKeyword.status === 200 ||
  //       responseBrandedWordanalysis.status === 200
  //     ) {
  //       setSearchConsole(responseSearchConsole?.data);
  //       setRankingKeyword(responseRankingKeyword?.data);
  //       setBrandedWordAnalysis(responseBrandedWordanalysis?.data);
  //       // console.log(responseSearchConsole.data, "responseSearchConsole");
  //       // console.log(responseRankingKeyword.data, "responseRankingKeyword");
  //       // console.log(
  //       //   responseBrandedWordanalysis.data,
  //       //   "responseBrandedWordanalysis"
  //       // );
  //       setIsModalOpen(false);
  //     }
  //   } catch (error: any) {
  //     console.error("Error fetchWebList:", error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  
  const handleCloseModal = async (BrandTags: any) => {
  try {
    setIsLoading(true);

    const payload = {
      site_url: selectedSite?.siteUrl,
      search_type: selectedSearchType,
      country: selectedCountry === "All" ? null : selectedCountry,
      device_type: selectedDeviceType === "All" ? null : selectedDeviceType,
      start_date: formatDateToYYYYMMDD(range[0]?.startDate),
      end_date: formatDateToYYYYMMDD(range[0]?.endDate),
    };

    const payloadNewBranch = {
      ...payload,
      branded_words: BrandTags,
    };

 
    const results = await Promise.allSettled([
      AddSearchConsole(payload),
      AddRankingKeyword(payload),
      AddBrandedWordanalysis(payloadNewBranch),
    ]);

  
    results.forEach((res, index) => {
      if (res.status === "fulfilled") {
        switch (index) {
          case 0:
            setSearchConsole(res.value.data);
            break;
          case 1:
            setRankingKeyword(res.value.data);
            break;
          case 2:
            setBrandedWordAnalysis(res.value.data);
            break;
        }
      } else {
        console.error(
          `API call ${index + 1} failed:`,
          res.reason?.message || res.reason
        );
      }
    });


    if (results.some((res) => res.status === "fulfilled")) {
      setIsModalOpen(false);
    }

  } catch (error: any) {
    console.error("Error in handleCloseModal:", error);
  } finally {
    setIsLoading(false);
  }
};

  const cardMatrix: CardMatrix | undefined = SearchConsole?.card_matrix;

  const excludeTitles = ["Ranking_Keywords", "Ranking_URLs"];

  const displayItems: DisplayItem[] = cardMatrix
    ? Object.entries(cardMatrix)
      .filter(([key]) => !excludeTitles.includes(key)) // exclude these keys
      .map(([key, value]) => {
        const percent =
          value["Change (%)"] ?? value["Relative_Change (%)"] ?? 0;
        const isDown = percent < 0;
        return {
          title: key,
          value: value.Current,
          percent: `${percent}%`,
          isDown,
        };
      })
    : [];

  const excludedItems = cardMatrix
    ? Object.entries(cardMatrix)
      .filter(([key]) => excludeTitles.includes(key))
      .map(([key, value]) => {
        const percent =
          value["Change (%)"] ?? value["Relative_Change (%)"] ?? 0;
        const isDown = percent < 0;
        return {
          title: key.replace(/_/g, " "), // nicer display
          value: value.Current,
          percent: `${percent}%`,
          isDown,
        };
      })
    : [];

  // Safe access with default empty array to avoid errors
  const keywordRankingData: any[] = SearchConsole?.keywords_ranking ?? [];

  return (
    <>
      {isLoading && <Loading />}
      <Header />
      <main className="main_wrapper">
        <SideBar />
        <div className="inner_content ">
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
                Organic reports <span className="text_blue">/ {activeTab === "overview" ? "Overview" : activeTab === "brand" ? "Brand vs Generic" : "Rankings"}</span>
              </h2>

              {webList?.length > 0 && !isModalOpen && (
                <select
                  className="form-select"
                  style={{ width: "auto" }}
                  value={selectedSite?.siteUrl || ""}
                  onChange={(e) => {
                    const selected = webList.find(
                      (site) => site.siteUrl === e.target.value
                    );
                    if (selected) {
                      setSelectedSite(selected);
                    }
                  }}
                >
                  {webList.map((item, index) => (
                    <option key={index} value={item.siteUrl}>
                      {item.siteUrl}
                    </option>
                  ))}
                </select>
              )}
            </div>
            {isModalOpen ? (
              <>
                <SelectSiteModal
                  isOpen={isModalOpen}
                  sites={webList}
                  onSelect={(site) => {
                    setSelectedSite(site);
                  }}
                  selectedSite={selectedSite}
                  webListAllData={webListAllData}
                  isLoading={isLoading}
                />
              </>
            ) : (
              <div className="profile_settings_wrapper">
                <div className="row gy-3">
                  <div className="col-12 col-xl-3 col-xxl-2">
                    <div className="settings_tabs_wrapper previously_created_warpper">
                      <ul
                        className="nav nav-pills flex-column nav-pills"
                        id="pills-tab"
                        role="tablist"
                      >
                        <li className="nav-item" role="presentation">
                          <button
                            // className="nav-link active"
                            className={`nav-link ${activeTab === "overview" ? "active" : ""
                              }`}
                            onClick={() => setActiveTab("overview")}
                            id="pills-overview-tab"
                            data-bs-toggle="pill"
                            data-bs-target="#pills-overview"
                            type="button"
                            role="tab"
                            aria-controls="pills-overview"
                            aria-selected="true"
                          >
                            Overview{" "}
                            <span>
                              <i className="bi bi-chevron-right"></i>
                            </span>
                          </button>
                        </li>
                        <li className="nav-item" role="presentation">
                          <button
                            // className="nav-link"
                            className={`nav-link ${activeTab === "brand" ? "active" : ""
                              }`}
                            onClick={() => setActiveTab("brand")}
                            id="pills-brand-tab"
                            data-bs-toggle="pill"
                            data-bs-target="#pills-brand"
                            type="button"
                            role="tab"
                            aria-controls="pills-brand"
                            aria-selected="false"
                          >
                            Brand vs Generic
                            <span>
                              <i className="bi bi-chevron-right"></i>
                            </span>
                          </button>
                        </li>
                        <li className="nav-item" role="presentation">
                          <button
                            // className="nav-link"
                            className={`nav-link ${activeTab === "rankings" ? "active" : ""
                              }`}
                            onClick={() => setActiveTab("rankings")}
                            id="pills-rankings-tab"
                            data-bs-toggle="pill"
                            data-bs-target="#pills-rankings"
                            type="button"
                            role="tab"
                            aria-controls="pills-rankings"
                            aria-selected="false"
                          >
                            Rankings{" "}
                            <span>
                              <i className="bi bi-chevron-right"></i>
                            </span>
                          </button>
                        </li>
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
                        id="pills-overview"
                        role="tabpanel"
                        aria-labelledby="pills-overview-tab"
                      >
                        <div className="seo_report_content overview_content">
                          <form className="row">
                            <div className="col-12">
                              <FilterComponent
                                FilterData={FilterData}
                                selectedSearchType={selectedSearchType}
                                setSelectedSearchType={setSelectedSearchType}
                                selectedCountry={selectedCountry}
                                setSelectedCountry={setSelectedCountry}
                                selectedDeviceType={selectedDeviceType}
                                setSelectedDeviceType={setSelectedDeviceType}
                                range={range}
                                setRange={setRange}
                                showCalendar={showCalendar}
                                setShowCalendar={setShowCalendar}
                                today={today}
                                brandTags={BrandTags}
                                onSaveBrandTags={setBrandTagsAndFetch}
                                activeTab={activeTab}
                                minDate={sixMonthsAgo}
                              />
                            </div>

                            <div className="col-12">
                              <div className="row overview_cards">
                                {excludedItems?.map((item, index) => (
                                  <div
                                    className="col-12 col-sm-6 col-xxl-3"
                                    key={index}
                                  >
                                    <div className="card_box">
                                      <h3 className="font_20 font_300 mb-1">
                                        {item.title}
                                      </h3>
                                      <h4 className="font_20 font_500 mb-1">
                                        {item.value}
                                      </h4>
                                      <p
                                        className={`font_14 ${item.isDown
                                            ? "text-danger"
                                            : "text-success"
                                          } mb-1`}
                                      >
                                        <i
                                          className={`bi ${item.isDown
                                              ? "bi-arrow-down-short"
                                              : "bi-arrow-up-short"
                                            }`}
                                        ></i>{" "}
                                        {item.percent}
                                      </p>
                                    </div>
                                  </div>
                                ))}

                                <div className="col-12 col-sm-12 col-xxl-6">
                                  <div className="row mx-0 card_box">
                                    {displayItems?.map(
                                      (item: any, index: any) => (
                                        <div
                                          className="col-12 col-sm-6 col-md-3"
                                          key={index}
                                        >
                                          <h3 className="font_16 font_300 mb-1">
                                            {item.title}
                                          </h3>
                                          <h4 className="font_20 font_600 mb-1">
                                            {item.value}
                                          </h4>
                                          <p
                                            className={`font_14 ${item.isDown
                                                ? "text-danger"
                                                : "text-success"
                                              } mb-1`}
                                          >
                                            <i
                                              className={`bi ${item.isDown
                                                  ? "bi-arrow-down-short"
                                                  : "bi-arrow-up-short"
                                                }`}
                                            ></i>{" "}
                                            {item.percent}
                                          </p>
                                        </div>
                                      )
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>

                            <LineChartGraph
                              period1={SearchConsole?.line_plot_data?.period1}
                              period2={SearchConsole?.line_plot_data?.period2}
                              selectedMetric={selectedMetric}
                              setSelectedMetric={setSelectedMetric}
                            />

                            <div className="col-12">
                              {/* <div className="row gy-3">
                                {[
                                  { title: "Keyword Rankings" },
                                  { title: "Brand vs Non-brand" },
                                  {
                                    title: "Device Performance",
                                    isDevice: true,
                                  },
                                ].map((card, index) => (
                                  <div
                                    className="col-12 col-md-6 col-lg-4"
                                    key={index}
                                  >
                                    <div
                                      className={`card keyword_data_card ${
                                        card.isDevice ? "device_perfomance" : ""
                                      }`}
                                    >
                                      <div className="card-header bg-white border-0">
                                        <h3 className="font_16 mb-0">
                                          {card.title}
                                        </h3>
                                      </div>
                                      <div className="card-body">
                                        <img
                                          src="https://img.freepik.com/free-photo/flat-lay-statistics-presentation-with-chart_23-2149023811.jpg?ga=GA1.1.834203240.1748513601&semt=ais_items_boosted&w=740"
                                          className="img-fluid"
                                          alt="graph"
                                        />
                                      </div>

                                      <div className="card-footer">
                                        <div className="row">
                                          {[1, 2, 3].map((_, idx) => (
                                            <div
                                              className="col-12 col-sm-4"
                                              key={idx}
                                            >
                                              {card.isDevice ? (
                                                <>
                                                  <span>
                                                    <i
                                                      className={`bi ${
                                                        idx === 0
                                                          ? "bi-display"
                                                          : idx === 1
                                                          ? "bi-phone"
                                                          : "bi-phone-landscape"
                                                      }`}
                                                    ></i>
                                                  </span>
                                                  <div>
                                                    <p className="font_14 my-1">
                                                      {idx === 0
                                                        ? "953"
                                                        : idx === 1
                                                        ? "1,975"
                                                        : "1,851"}
                                                    </p>
                                                    <p
                                                      className={`font_12 ${
                                                        idx === 2
                                                          ? "text-danger"
                                                          : "text-success"
                                                      } mb-0`}
                                                    >
                                                      <i className="bi bi-arrow-up-short"></i>{" "}
                                                      {idx === 0
                                                        ? "28.3%"
                                                        : idx === 1
                                                        ? "14.6%"
                                                        : "18.4%"}
                                                    </p>
                                                  </div>
                                                </>
                                              ) : (
                                                <>
                                                  <p className="font_12 mb-0">
                                                    Top 3
                                                  </p>
                                                  <p className="font_14 my-1">
                                                    953
                                                  </p>
                                                  <p className="font_12 text-success mb-0">
                                                    <i className="bi bi-arrow-up-short"></i>
                                                    4.8%
                                                  </p>
                                                </>
                                              )}
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div> */}
                              <div className="row gy-3">
                                <div className="col-md-6 col-lg-4 ">
                                  <div className={`card keyword_data_card`}>
                                    <div className="card-header bg-white border-0">
                                      <h3 className="font_16 mb-0">
                                        Keyword Rankings
                                      </h3>
                                    </div>
                                    <div className="card-body">
                                      <KeywordRankingChart
                                        data={keywordRankingData}
                                      />
                                    </div>
                                    <div className="card-footer">
                                      <div className="row">
                                        {RankingKeyword?.bucket_matrix
                                          ?.filter(
                                            (item: any) =>
                                              item.rank_bucket !== "Pos 21+"
                                          )
                                          ?.map((item: any, index: any) => {
                                            const isPositive =
                                              item.delta_abs >= 0;
                                            const arrowClass = isPositive
                                              ? "bi-arrow-up-short text-success"
                                              : "bi-arrow-down-short text-danger";
                                            const textClass = isPositive
                                              ? "text-success"
                                              : "text-danger";

                                            return (
                                              <div
                                                className="col-12 col-sm-4"
                                                key={index}
                                              >
                                                <>
                                                  <p className="font_12 mb-0">
                                                    {item.rank_bucket}
                                                  </p>
                                                  <p className="font_14 my-1">
                                                    {item.current_count}
                                                  </p>
                                                  <p
                                                    className={`font_12 ${textClass} mb-0`}
                                                  >
                                                    <i
                                                      className={`bi ${arrowClass}`}
                                                    ></i>
                                                    {Math.abs(item.delta_pct)}%
                                                  </p>
                                                </>
                                              </div>
                                            );
                                          })}
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="col-md-6 col-lg-4  ">
                                  {/* <div className={`card keyword_data_card`}>
                                    <div className="card-header bg-white border-0">
                                      <h3 className="font_16 mb-0">
                                        Brand vs Non-Brand
                                      </h3>
                                      

                                    </div>
                                    <div className="card-body"></div>
                                    <div className="card-footer">
                                      <div className="row"></div>
                                    </div>
                                  </div> */}
                                  <BrandVsNonBrandChart
                                    title="Brand vs. Non-brand"
                                    data={BrandedWordAnalysis?.pie_chart_data}
                                    selectedMetric={selectedMetric}
                                  />
                                </div>

                                <div className="col-md-6 col-lg-4  ">
                                  <div className={`card keyword_data_card`}>
                                    <div className="card-header bg-white border-0">
                                      <h3 className="font_16 mb-2">
                                        Device Performance
                                      </h3>
                                      <p
                                        style={{
                                          color: "#aeb4bf",
                                          fontSize: "12px",
                                        }}
                                      >
                                        {selectedMetric}
                                      </p>
                                    </div>
                                    <div className="card-body">
                                      <CircleGraph
                                        data={
                                          SearchConsole?.device_performance
                                            ?.device_comparisons
                                        }
                                        metric={selectedMetric}
                                      />
                                    </div>
                                    <div className="card-footer">
                                      <div className="row"></div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>

                      <div
                        className="tab-pane fade"
                        id="pills-brand"
                        role="tabpanel"
                        aria-labelledby="pills-brand-tab"
                      >
                        <div className="seo_report_content brand_content">
                          <form action="" className="row">
                            <div className="col-12">
                              <FilterComponent
                                FilterData={FilterData}
                                selectedSearchType={selectedSearchType}
                                setSelectedSearchType={setSelectedSearchType}
                                selectedCountry={selectedCountry}
                                setSelectedCountry={setSelectedCountry}
                                selectedDeviceType={selectedDeviceType}
                                setSelectedDeviceType={setSelectedDeviceType}
                                range={range}
                                setRange={setRange}
                                showCalendar={showCalendar}
                                setShowCalendar={setShowCalendar}
                                today={today}
                                brandTags={BrandTags}
                                onSaveBrandTags={setBrandTagsAndFetch}
                                activeTab={activeTab}
                                minDate={sixMonthsAgo}
                              />
                            </div>

                            <div className="col-12">
                              <div className="row">
                                <div className="col-12 col-lg-3">
                                  <div className=" border-0 mb-3">
                                    <PieChartGraph
                                      data={
                                        BrandedWordAnalysis?.click_percentage
                                      }
                                      title="Clicks"
                                    />
                                  </div>

                                  <PieChartGraph
                                    data={
                                      BrandedWordAnalysis?.impression_percentage
                                    }
                                    title="Impressions"
                                  />
                                </div>
                                <div className="col-12 col-lg-9">
                                  <div className="card_box click_chart h-100 border-0">
                                    <BrandedGenericAreaChart
                                      data={
                                        BrandedWordAnalysis?.daily_metrics || []
                                      }
                                      selectedMetric={selectedMetric}
                                      setSelectedMetric={setSelectedMetric}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="col-12">
                              <div className="row">
                                <div className="col-12 col-xxl-6">
                                  <div className="card_box">
                                    <h3 className="font_20 font_400 mb-2">
                                      Branded traffic
                                    </h3>
                                    <div className="grid_outer">
                                      {[
                                        {
                                          label: "Impressions",
                                          key: "impressions",
                                        },
                                        { label: "Clicks", key: "clicks" },
                                        {
                                          label: "No. Keywords",
                                          key: "no_of_keywords",
                                        },
                                        { label: "CTR", key: "ctr" },
                                        {
                                          label: "Avg. position",
                                          key: "avg_position",
                                        },
                                      ].map(({ label, key }) => {
                                        const data =
                                          BrandedWordAnalysis
                                            ?.branded_keywords?.[key];
                                        const actual = data?.Actual ?? 0;
                                        const fluctuationStr =
                                          data?.fluctuation ?? "0";
                                        const fluctuationNum =
                                          parseFloat(fluctuationStr);
                                        const isPositive = fluctuationNum >= 0;
                                        const fluctuationClass = isPositive
                                          ? "text-success"
                                          : "text-danger";
                                        const iconClass = isPositive
                                          ? "bi-arrow-up-short"
                                          : "bi-arrow-down-short";

                                        return (
                                          <div className="grid_part" key={key}>
                                            <h3 className="font_16 font_300 mb-1">
                                              {label}
                                            </h3>
                                            <h4 className="font_20 font_600 mb-1">
                                              {actual}
                                            </h4>
                                            <p
                                              className={`font_14 ${fluctuationClass} mb-1`}
                                            >
                                              <i
                                                className={`bi ${iconClass}`}
                                              ></i>{" "}
                                              {fluctuationNum > 0
                                                ? `${fluctuationStr}`
                                                : fluctuationStr}
                                              %
                                            </p>
                                          </div>
                                        );
                                      })}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="col-12 col-xxl-6">
                              <div className="card_box">
                                <h3 className="font_20 font_400 mb-2">
                                  Generic traffic
                                </h3>
                                <div className="grid_outer">
                                  {[
                                    {
                                      label: "Impressions",
                                      key: "impressions",
                                    },
                                    { label: "Clicks", key: "clicks" },
                                    {
                                      label: "No. Keywords",
                                      key: "no_of_keywords",
                                    },
                                    { label: "CTR", key: "ctr" },
                                    {
                                      label: "Avg. position",
                                      key: "avg_position",
                                    },
                                  ].map(({ label, key }) => {
                                    const data =
                                      BrandedWordAnalysis
                                        ?.non_branded_keywords?.[key];
                                    const actual = data?.Actual ?? 0;
                                    const fluctuation =
                                      data?.fluctuation ?? "0";
                                    const fluctuationNum =
                                      parseFloat(fluctuation);
                                    const isPositive = fluctuationNum > 0;
                                    const fluctuationClass = isPositive
                                      ? "text-success"
                                      : "text-danger";
                                    const icon = isPositive
                                      ? "bi-arrow-up-short"
                                      : "bi-arrow-down-short";

                                    return (
                                      <div className="grid_part" key={key}>
                                        <h3 className="font_16 font_300 mb-1">
                                          {label}
                                        </h3>
                                        <h4 className="font_20 font_600 mb-1">
                                          {actual}
                                        </h4>
                                        <p
                                          className={`font_14 ${fluctuationClass} mb-1`}
                                        >
                                          <i className={`bi ${icon}`}></i>{" "}
                                          {fluctuationNum > 0
                                            ? `${fluctuation}`
                                            : fluctuation}
                                          %
                                        </p>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            </div>

                            <div className="col-12 text-end">
                              <ChartFilter
                                selectedMetric={selectedMetric}
                                setSelectedMetric={setSelectedMetric}
                                showDropdown={showDropdown}
                                setShowDropdown={setShowDropdown}
                              />
                            </div>

                            <div className="col-12">
                              <div className="row gy-2">
                                <GenericKeywordsTable
                                  keywordList={
                                    BrandedWordAnalysis?.branded_keyword_list?.[
                                    selectedMetric
                                    ] ?? []
                                  }
                                  message="Branded Keywords"
                                  selectedMetric={selectedMetric}
                                />
                                <GenericKeywordsTable
                                  keywordList={
                                    BrandedWordAnalysis?.generic_keyword_list?.[
                                    selectedMetric
                                    ] ?? []
                                  }
                                  message="Generic Keywords"
                                  selectedMetric={selectedMetric}
                                />
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>

                      <div
                        className="tab-pane fade"
                        id="pills-rankings"
                        role="tabpanel"
                        aria-labelledby="pills-rankings-tab"
                      >
                        <div className="seo_report_content brand_content">
                          <form action="" className="row">
                            <div className="col-12">
                              <FilterComponent
                                FilterData={FilterData}
                                selectedSearchType={selectedSearchType}
                                setSelectedSearchType={setSelectedSearchType}
                                selectedCountry={selectedCountry}
                                setSelectedCountry={setSelectedCountry}
                                selectedDeviceType={selectedDeviceType}
                                setSelectedDeviceType={setSelectedDeviceType}
                                range={range}
                                setRange={setRange}
                                showCalendar={showCalendar}
                                setShowCalendar={setShowCalendar}
                                today={today}
                                brandTags={BrandTags}
                                onSaveBrandTags={setBrandTagsAndFetch}
                                activeTab={activeTab}
                                minDate={sixMonthsAgo}
                              />
                            </div>

                            <div className="col-12">
                              <div className="row">
                                <div className="col-12 col-lg-3">
                                  <div className="ranking_left_cards">
                                    {RankingKeyword?.bucket_matrix?.map(
                                      (item: any, index: any) => {
                                        const isPositive = item.delta_abs >= 0;

                                        return (
                                          <div
                                            className="card_box border-0"
                                            key={index}
                                          >
                                            <p className="font_14 font_300 mb-1">
                                              {getTitle(item.rank_bucket)}
                                            </p>
                                            <h4 className="font_20 font_500 mb-1">
                                              {item.current_count}
                                            </h4>
                                            <p
                                              className={`font_14 mb-0 ${isPositive
                                                  ? "text-success"
                                                  : "text-danger"
                                                }`}
                                            >
                                              <i
                                                className={`bi ${isPositive
                                                    ? "bi-arrow-up-short"
                                                    : "bi-arrow-down-short"
                                                  }`}
                                              ></i>{" "}
                                              {Math.abs(item.delta_abs)}
                                            </p>
                                          </div>
                                        );
                                      }
                                    )}
                                  </div>
                                </div>
                                <div className="col-12 col-lg-9">
                                  <div className="card_box click_chart h-100 border-0">
                                    <RankingAreaChart
                                      data={
                                        RankingKeyword?.daily_time_series || []
                                      }
                                      selectedMetric={selectedMetric}
                                      setSelectedMetric={setSelectedMetric}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="col-12 text-end">
                              <ChartFilter
                                selectedMetric={selectedMetric}
                                setSelectedMetric={setSelectedMetric}
                                showDropdown={showDropdown}
                                setShowDropdown={setShowDropdown}
                              />
                            </div>

                            <div className="col-12">
                              <div className="row gy-2">
                                <div className="col-12 col-xxl-6">
                                  <div className="card_box">
                                    <h3 className="font_20 font_400 ps-1">
                                      Improved Keywords{" "}
                                      <span className="font_12 gray_clr ps-1">
                                        {capitalizeFirstLetter(selectedMetric)}
                                      </span>
                                    </h3>
                                    <div className="branded_keywords table-responsive">
                                      <ImprovedAndDeclinedTable
                                        data={RankingKeyword?.improved_keywords}
                                        selectedMetric={selectedMetric}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="col-12 col-xxl-6">
                                  <div className="card_box">
                                    <h3 className="font_20 font_400 ps-1">
                                      Declined Keywords{" "}
                                      <span className="font_12 gray_clr ps-1">
                                        {capitalizeFirstLetter(selectedMetric)}
                                      </span>
                                    </h3>
                                    <div className="branded_keywords table-responsive">
                                      <ImprovedAndDeclinedTable
                                        data={RankingKeyword?.declined_keywords}
                                        selectedMetric={selectedMetric}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
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

export default Reports;

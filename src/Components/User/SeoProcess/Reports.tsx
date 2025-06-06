import { useEffect, useState } from "react";
import Header from "../Header/Header";
import SideBar from "../SideBar/SideBar";
import { GetFilterData, GetWebListDetails } from "./SeoServices";
import Loading from "../../Page/Loading/Loading";
import SelectSiteModal from "./SelectSiteModal";

export interface Site {
  siteUrl: string;
  permissionLevel: string;
}

const getDateRange = () => {
  const today = new Date();
  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(today.getMonth() - 3);

  const formatDate = (date: Date) => date.toISOString().split("T")[0];

  return {
    startDate: formatDate(threeMonthsAgo),
    endDate: formatDate(today),
  };
};

const Reports = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [webList, setWebList] = useState<Site[]>([]);
  const [selectedSite, setSelectedSite] = useState<Site | null>(null);
  const [FilterData, setFilterData] = useState<any>({});
  const [selectedDeviceType, setSelectedDeviceType] =
    useState<string>("mobile");
  const [selectedSearchType, setSelectedSearchType] = useState<string>("web");
  const [selectedCountry, setSelectedCountry] = useState<string>("UK");
  const { startDate, endDate } = getDateRange();
  const [selectedDate, setSelectedDate] = useState<string>(endDate);

  //   console.log(FilterData, "FilterData");

  useEffect(() => {
    fetchWebListDetails();
  }, []);

  const fetchWebListDetails = async () => {
    try {
      setIsLoading(true);
      const response = await GetWebListDetails();
      const responseFilterData = await GetFilterData();
      if (response.status === 200 || response.status === 201) {
        setWebList(response?.data?.sites || []);
        setFilterData(responseFilterData.data);
      }
    } catch (error: any) {
      console.error("Error fetchWebList:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseModal = () => {
    try {
      setIsLoading(true);
      // const payload = {
      //   site_url: selectedSite?.siteUrl,
      //   search_type: selectedSearchType,
      //   country: selectedCountry,
      //   device_type: selectedDeviceType,
      //   start_date: startDate,
      //   end_date: endDate
      // };
      // const responseSearchConsole = await AddSearchConsole(payload);
      // const responseRankingKeyword = await AddRankingKeyword(payload);
      // const responseBrandedWordanalysis = await AddBrandedWordanalysis(payload);
      //   if (response.status === 200 || response.status === 201) {

      setIsModalOpen(false);
      //   }
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
        <div className="inner_content ">
          <div className="keyword_tool_content  generate_post create_content">
            <div className="content_header mb-4">
              <h2 className="font_25 font_600 mb-2">
                <img
                  src="/assets/images/seo_report_icon.png"
                  className="heading_icon me-1"
                  alt="heading icon"
                />
                Organic reports <span className="text_blue">/ Overview</span>
              </h2>
            </div>
            {isModalOpen ? (
              <>
                <SelectSiteModal
                  isOpen={isModalOpen}
                  onClose={handleCloseModal}
                  sites={webList}
                  onSelect={(site) => {
                    setSelectedSite(site);
                  }}
                  selectedSite={selectedSite}
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
                            className="nav-link active"
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
                            className="nav-link"
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
                            className="nav-link"
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
                              <ul className="oraganic_report_filter list-unstyled">
                                <li>
                                  <div className="form_input">
                                    <select
                                      className="form-select"
                                      id="webType"
                                      aria-label="Search type"
                                      value={selectedSearchType}
                                      onChange={(e) =>
                                        setSelectedSearchType(e.target.value)
                                      }
                                    >
                                      <option value="web">
                                        Search type: {selectedSearchType}
                                      </option>
                                      {FilterData.search_types?.[0]?.map(
                                        (type: string, idx: number) => (
                                          <option key={idx} value={type}>
                                            {type}
                                          </option>
                                        )
                                      )}
                                    </select>
                                  </div>
                                </li>
                                <li>
                                  <div className="form_input">
                                    <select
                                      className="form-select"
                                      id="countryType"
                                      aria-label="Country"
                                      value={selectedCountry}
                                      onChange={(e) =>
                                        setSelectedCountry(e.target.value)
                                      }
                                    >
                                      <option value="UK">
                                        Country: {selectedCountry}
                                      </option>
                                      {FilterData.countries?.map(
                                        (country: any, idx: number) => (
                                          <option
                                            key={idx}
                                            value={country.code}
                                          >
                                            {country.name}
                                          </option>
                                        )
                                      )}
                                    </select>
                                  </div>
                                </li>
                                <li>
                                  <div className="form_input">
                                    <select
                                      className="form-select"
                                      id="mobileType"
                                      aria-label="Device type"
                                      value={selectedDeviceType}
                                      onChange={(e) =>
                                        setSelectedDeviceType(e.target.value)
                                      }
                                    >
                                      <option value="mobile">
                                        Device type: {selectedDeviceType}
                                      </option>
                                      {FilterData.device_types?.map(
                                        (device: string, idx: number) => (
                                          <option key={idx} value={device}>
                                            {device}
                                          </option>
                                        )
                                      )}
                                    </select>
                                  </div>
                                </li>

                                <li>
                                  <div className="form_input d-flex align-items-center gap-2">
                                    <label
                                      htmlFor="selectedDate"
                                      className="form-label mb-0"
                                    >
                                      Select Date:
                                    </label>
                                    <input
                                      type="date"
                                      id="selectedDate"
                                      className="form-control"
                                      value={selectedDate}
                                      min={startDate}
                                      max={endDate}
                                      onChange={(e) =>
                                        setSelectedDate(e.target.value)
                                      }
                                    />
                                  </div>
                                </li>
                              </ul>
                            </div>

                            <div className="col-12">
                              <div className="row overview_cards">
                                {[1, 2].map((_, index) => (
                                  <div
                                    className="col-12 col-sm-6 col-xxl-3"
                                    key={index}
                                  >
                                    <div className="card_box">
                                      <h3 className="font_20 font_300 mb-1">
                                        Ranking Keywords
                                      </h3>
                                      <h4 className="font_20 font_500 mb-1">
                                        1,398
                                      </h4>
                                      <p className="font_14 text-success mb-1">
                                        <i className="bi bi-arrow-up-short"></i>{" "}
                                        4.8%
                                      </p>
                                    </div>
                                  </div>
                                ))}

                                <div className="col-12 col-sm-12 col-xxl-6">
                                  <div className="row mx-0 card_box">
                                    {[
                                      {
                                        title: "Impressions",
                                        value: "386,254",
                                        percent: "33.9%",
                                      },
                                      {
                                        title: "Clicks",
                                        value: "7,022",
                                        percent: "68.4%",
                                      },
                                      {
                                        title: "CTR",
                                        value: "1.82%",
                                        percent: "25.8%",
                                        isDown: true,
                                      },
                                      {
                                        title: "Avg. position",
                                        value: "30.46",
                                        percent: "8%",
                                      },
                                    ].map((item, index) => (
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
                                          className={`font_14 ${
                                            item.isDown
                                              ? "text-danger"
                                              : "text-success"
                                          } mb-1`}
                                        >
                                          <i className="bi bi-arrow-up-short"></i>{" "}
                                          {item.percent}
                                        </p>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="col-12">
                              <div className="card_box click_chart">
                                <img
                                  src="https://courses.spatialthoughts.com/images/gee_charts/no2_time_series.png"
                                  alt="click chart"
                                  className="img-fluid"
                                />
                              </div>
                            </div>

                            <div className="col-12">
                              <div className="row gy-3">
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
                              <ul className="oraganic_report_filter list-unstyled">
                                <li>
                                  <div className="form_input">
                                    <select
                                      className="form-select"
                                      id="webType"
                                      aria-label="Default select example"
                                    >
                                      <option selected>Search type: web</option>
                                      <option value="1">Option 1</option>
                                      <option value="2">Option 2</option>
                                      <option value="3">Option 3</option>
                                    </select>
                                  </div>
                                </li>
                                <li>
                                  <div className="form_input">
                                    <select
                                      className="form-select"
                                      id="countryType"
                                      aria-label="Default select example"
                                    >
                                      <option selected>Country: UK</option>
                                      <option value="1">Option 1</option>
                                      <option value="2">Option 2</option>
                                      <option value="3">Option 3</option>
                                    </select>
                                  </div>
                                </li>
                                <li>
                                  <div className="form_input">
                                    <select
                                      className="form-select"
                                      id="mobileType"
                                      aria-label="Default select example"
                                    >
                                      <option selected>
                                        {" "}
                                        Device type: mobile
                                      </option>
                                      <option value="1">Option 1</option>
                                      <option value="2">Option 2</option>
                                      <option value="3">Option 3</option>
                                    </select>
                                  </div>
                                </li>
                                <li>
                                  <div className="form_input">
                                    <select
                                      className="form-select"
                                      id="monthType"
                                      aria-label="Default select example"
                                    >
                                      <option selected>
                                        Date: last 3 months
                                      </option>
                                      <option value="1">Option 1</option>
                                      <option value="2">Option 2</option>
                                      <option value="3">Option 3</option>
                                    </select>
                                  </div>
                                </li>
                              </ul>
                            </div>

                            <div className="col-12">
                              <div className="row">
                                <div className="col-12 col-lg-3">
                                  <div className="card_box border-0 mb-3">
                                    <h3 className="font_16 font_300">Clicks</h3>
                                    <div className="pie_graph">
                                      <img
                                        src="/assets/images/pie_graph.png"
                                        className="img-fluid pie_chart"
                                        alt="pie chart"
                                      />
                                    </div>
                                  </div>
                                  <div className="card_box border-0">
                                    <h3 className="font_16 font_300">
                                      Impressions
                                    </h3>
                                    <div className="pie_graph">
                                      <img
                                        src="/assets/images/pie_graph.png"
                                        className="img-fluid pie_chart"
                                        alt="pie chart"
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="col-12 col-lg-9">
                                  <div className="card_box click_chart h-100 border-0">
                                    <img
                                      src="https://courses.spatialthoughts.com/images/gee_charts/no2_time_series.png"
                                      alt="click chart"
                                      className="img-fluid h-100"
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
                                      <div className="grid_part">
                                        <h3 className="font_16 font_300 mb-1">
                                          Impressions
                                        </h3>
                                        <h4 className="font_20 font_600 mb-1">
                                          186,254
                                        </h4>
                                        <p className="font_14 text-success mb-1">
                                          <i className="bi bi-arrow-up-short"></i>{" "}
                                          33.9%
                                        </p>
                                      </div>
                                      <div className="grid_part">
                                        <h3 className="font_16 font_300 mb-1">
                                          Clicks
                                        </h3>
                                        <h4 className="font_20 font_600 mb-1">
                                          7,022
                                        </h4>
                                        <p className="font_14 text-success mb-1">
                                          <i className="bi bi-arrow-up-short"></i>{" "}
                                          68.4%
                                        </p>
                                      </div>
                                      <div className="grid_part">
                                        <h3 className="font_16 font_300 mb-1">
                                          No. Keywords
                                        </h3>
                                        <h4 className="font_20 font_600 mb-1">
                                          51
                                        </h4>
                                        <p className="font_14 text-success mb-1">
                                          <i className="bi bi-arrow-up-short"></i>{" "}
                                          8.3%
                                        </p>
                                      </div>
                                      <div className="grid_part">
                                        <h3 className="font_16 font_300 mb-1">
                                          CTR
                                        </h3>
                                        <h4 className="font_20 font_600 mb-1">
                                          5.14%
                                        </h4>
                                        <p className="font_14 text-danger mb-1">
                                          <i className="bi bi-arrow-up-short"></i>{" "}
                                          25.8%
                                        </p>
                                      </div>
                                      <div className="grid_part">
                                        <h3 className="font_16 font_300 mb-1">
                                          Avg. position
                                        </h3>
                                        <h4 className="font_20 font_600 mb-1">
                                          12.93
                                        </h4>
                                        <p className="font_14 text-danger mb-1">
                                          <i className="bi bi-arrow-up-short"></i>{" "}
                                          -8%
                                        </p>
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
                                      <div className="grid_part">
                                        <h3 className="font_16 font_300 mb-1">
                                          Impressions
                                        </h3>
                                        <h4 className="font_20 font_600 mb-1">
                                          186,254
                                        </h4>
                                        <p className="font_14 text-success mb-1">
                                          <i className="bi bi-arrow-up-short"></i>{" "}
                                          33.9%
                                        </p>
                                      </div>
                                      <div className="grid_part">
                                        <h3 className="font_16 font_300 mb-1">
                                          Clicks
                                        </h3>
                                        <h4 className="font_20 font_600 mb-1">
                                          7,022
                                        </h4>
                                        <p className="font_14 text-success mb-1">
                                          <i className="bi bi-arrow-up-short"></i>{" "}
                                          68.4%
                                        </p>
                                      </div>
                                      <div className="grid_part">
                                        <h3 className="font_16 font_300 mb-1">
                                          No. Keywords
                                        </h3>
                                        <h4 className="font_20 font_600 mb-1">
                                          51
                                        </h4>
                                        <p className="font_14 text-success mb-1">
                                          <i className="bi bi-arrow-up-short"></i>{" "}
                                          8.3%
                                        </p>
                                      </div>
                                      <div className="grid_part">
                                        <h3 className="font_16 font_300 mb-1">
                                          CTR
                                        </h3>
                                        <h4 className="font_20 font_600 mb-1">
                                          5.14%
                                        </h4>
                                        <p className="font_14 text-danger mb-1">
                                          <i className="bi bi-arrow-up-short"></i>{" "}
                                          25.8%
                                        </p>
                                      </div>
                                      <div className="grid_part">
                                        <h3 className="font_16 font_300 mb-1">
                                          Avg. position
                                        </h3>
                                        <h4 className="font_20 font_600 mb-1">
                                          12.93
                                        </h4>
                                        <p className="font_14 text-danger mb-1">
                                          <i className="bi bi-arrow-up-short"></i>{" "}
                                          -8%
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="col-12">
                              <div className="row gy-2">
                                <div className="col-12 col-xxl-6">
                                  <div className="card_box">
                                    <h3 className="font_20 font_400 ps-1">
                                      Branded Keywords
                                    </h3>
                                    <div className="branded_keywords table-responsive">
                                      <table className="table">
                                        <thead>
                                          <tr>
                                            <th scope="col">Keywords</th>
                                            <th scope="col">
                                              Pos. last 30 days
                                            </th>
                                            <th scope="col">Pos. before</th>
                                            <th scope="col">Change</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          <tr>
                                            <td>seo looker studio</td>
                                            <td>15</td>
                                            <td>19</td>
                                            <td>
                                              <i className="bi bi-arrow-up-short"></i>{" "}
                                              65
                                            </td>
                                          </tr>
                                          <tr>
                                            <td>seo looker</td>
                                            <td>19</td>
                                            <td>33</td>
                                            <td>
                                              <i className="bi bi-arrow-up-short"></i>{" "}
                                              17
                                            </td>
                                          </tr>
                                          <tr>
                                            <td>kpi in google</td>
                                            <td>15</td>
                                            <td>19</td>
                                            <td>
                                              <i className="bi bi-arrow-up-short"></i>{" "}
                                              65
                                            </td>
                                          </tr>
                                          <tr>
                                            <td>
                                              google optimisation template
                                            </td>
                                            <td>19</td>
                                            <td>33</td>
                                            <td>
                                              <i className="bi bi-arrow-up-short"></i>{" "}
                                              17
                                            </td>
                                          </tr>
                                          <tr>
                                            <td>google ads report</td>
                                            <td>15</td>
                                            <td>19</td>
                                            <td>
                                              <i className="bi bi-arrow-up-short"></i>{" "}
                                              65
                                            </td>
                                          </tr>
                                          <tr>
                                            <td>seo agency</td>
                                            <td>19</td>
                                            <td>33</td>
                                            <td>
                                              <i className="bi bi-arrow-up-short"></i>{" "}
                                              17
                                            </td>
                                          </tr>
                                          <tr>
                                            <td>facebook looker</td>
                                            <td>15</td>
                                            <td>19</td>
                                            <td>
                                              <i className="bi bi-arrow-up-short"></i>{" "}
                                              65
                                            </td>
                                          </tr>
                                          <tr>
                                            <td>best looker studio</td>
                                            <td>19</td>
                                            <td>33</td>
                                            <td>
                                              <i className="bi bi-arrow-up-short"></i>{" "}
                                              17
                                            </td>
                                          </tr>
                                          <tr>
                                            <td>best adwords</td>
                                            <td>15</td>
                                            <td>19</td>
                                            <td>
                                              <i className="bi bi-arrow-up-short"></i>{" "}
                                              65
                                            </td>
                                          </tr>
                                          <tr>
                                            <td>seo looker studio</td>
                                            <td>19</td>
                                            <td>33</td>
                                            <td>
                                              <i className="bi bi-arrow-up-short"></i>{" "}
                                              17
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-12 col-xxl-6">
                                  <div className="card_box">
                                    <h3 className="font_20 font_400 ps-1">
                                      Generic Keywords
                                    </h3>
                                    <div className="branded_keywords table-responsive">
                                      <table className="table">
                                        <thead>
                                          <tr>
                                            <th scope="col">Keywords</th>
                                            <th scope="col">
                                              Pos. last 30 days
                                            </th>
                                            <th scope="col">Pos. before</th>
                                            <th scope="col">Change</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          <tr>
                                            <td>seo looker studio</td>
                                            <td>15</td>
                                            <td>19</td>
                                            <td>
                                              <i className="bi bi-arrow-up-short"></i>{" "}
                                              65
                                            </td>
                                          </tr>
                                          <tr>
                                            <td>seo looker</td>
                                            <td>19</td>
                                            <td>33</td>
                                            <td>
                                              <i className="bi bi-arrow-up-short"></i>{" "}
                                              17
                                            </td>
                                          </tr>
                                          <tr>
                                            <td>kpi in google</td>
                                            <td>15</td>
                                            <td>19</td>
                                            <td>
                                              <i className="bi bi-arrow-up-short"></i>{" "}
                                              65
                                            </td>
                                          </tr>
                                          <tr>
                                            <td>
                                              google optimisation template
                                            </td>
                                            <td>19</td>
                                            <td>33</td>
                                            <td>
                                              <i className="bi bi-arrow-up-short"></i>{" "}
                                              17
                                            </td>
                                          </tr>
                                          <tr>
                                            <td>google ads report</td>
                                            <td>15</td>
                                            <td>19</td>
                                            <td>
                                              <i className="bi bi-arrow-up-short"></i>{" "}
                                              65
                                            </td>
                                          </tr>
                                          <tr>
                                            <td>seo agency</td>
                                            <td>19</td>
                                            <td>33</td>
                                            <td>
                                              <i className="bi bi-arrow-up-short"></i>{" "}
                                              17
                                            </td>
                                          </tr>
                                          <tr>
                                            <td>facebook looker</td>
                                            <td>15</td>
                                            <td>19</td>
                                            <td>
                                              <i className="bi bi-arrow-up-short"></i>{" "}
                                              65
                                            </td>
                                          </tr>
                                          <tr>
                                            <td>best looker studio</td>
                                            <td>19</td>
                                            <td>33</td>
                                            <td>
                                              <i className="bi bi-arrow-up-short"></i>{" "}
                                              17
                                            </td>
                                          </tr>
                                          <tr>
                                            <td>best adwords</td>
                                            <td>15</td>
                                            <td>19</td>
                                            <td>
                                              <i className="bi bi-arrow-up-short"></i>{" "}
                                              65
                                            </td>
                                          </tr>
                                          <tr>
                                            <td>seo looker studio</td>
                                            <td>19</td>
                                            <td>33</td>
                                            <td>
                                              <i className="bi bi-arrow-up-short"></i>{" "}
                                              17
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
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
                        id="pills-rankings"
                        role="tabpanel"
                        aria-labelledby="pills-rankings-tab"
                      >
                        <div className="seo_report_content brand_content">
                          <form action="" className="row">
                            <div className="col-12">
                              <ul className="oraganic_report_filter list-unstyled">
                                <li>
                                  <div className="form_input">
                                    <select
                                      className="form-select"
                                      id="webType"
                                      aria-label="Default select example"
                                    >
                                      <option selected>Search type: web</option>
                                      <option value="1">Option 1</option>
                                      <option value="2">Option 2</option>
                                      <option value="3">Option 3</option>
                                    </select>
                                  </div>
                                </li>
                                <li>
                                  <div className="form_input">
                                    <select
                                      className="form-select"
                                      id="countryType"
                                      aria-label="Default select example"
                                    >
                                      <option selected>Country: UK</option>
                                      <option value="1">Option 1</option>
                                      <option value="2">Option 2</option>
                                      <option value="3">Option 3</option>
                                    </select>
                                  </div>
                                </li>
                                <li>
                                  <div className="form_input">
                                    <select
                                      className="form-select"
                                      id="mobileType"
                                      aria-label="Default select example"
                                    >
                                      <option selected>
                                        {" "}
                                        Device type: mobile
                                      </option>
                                      <option value="1">Option 1</option>
                                      <option value="2">Option 2</option>
                                      <option value="3">Option 3</option>
                                    </select>
                                  </div>
                                </li>
                                <li>
                                  <div className="form_input">
                                    <select
                                      className="form-select"
                                      id="monthType"
                                      aria-label="Default select example"
                                    >
                                      <option selected>
                                        Date: last 3 months
                                      </option>
                                      <option value="1">Option 1</option>
                                      <option value="2">Option 2</option>
                                      <option value="3">Option 3</option>
                                    </select>
                                  </div>
                                </li>
                              </ul>
                            </div>

                            <div className="col-12">
                              <div className="row">
                                <div className="col-12 col-lg-3">
                                  <div className="ranking_left_cards">
                                    <div className="card_box border-0">
                                      <p className="font_14 font_300 mb-1">
                                        Top 3 (# 1-3)
                                      </p>
                                      <h4 className="font_20 font_500 mb-1">
                                        328
                                      </h4>
                                      <p className="font_14 text-success mb-0">
                                        <i className="bi bi-arrow-up-short"></i>{" "}
                                        171
                                      </p>
                                    </div>
                                    <div className="card_box border-0">
                                      <p className="font_14 font_300 mb-1">
                                        Top 10 (# 4-10)
                                      </p>
                                      <h4 className="font_20 font_500 mb-1">
                                        1730
                                      </h4>
                                      <p className="font_14 text-success mb-0">
                                        <i className="bi bi-arrow-up-short"></i>{" "}
                                        57
                                      </p>
                                    </div>
                                    <div className="card_box border-0">
                                      <p className="font_14 font_300 mb-1">
                                        Top 20 (# 11-20)
                                      </p>
                                      <h4 className="font_20 font_500 mb-1">
                                        328
                                      </h4>
                                      <p className="font_14 text-success mb-0">
                                        <i className="bi bi-arrow-up-short"></i>{" "}
                                        276
                                      </p>
                                    </div>
                                    <div className="card_box border-0">
                                      <p className="font_14 font_300 mb-1">
                                        Top 10 (# 21+)
                                      </p>
                                      <h4 className="font_20 font_600 mb-1">
                                        1730
                                      </h4>
                                      <p className="font_14 text-danger mb-0">
                                        <i className="bi bi-arrow-down-short"></i>{" "}
                                        846
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-12 col-lg-9">
                                  <div className="card_box click_chart h-100 border-0">
                                    <img
                                      src="https://courses.spatialthoughts.com/images/gee_charts/no2_time_series.png"
                                      alt="click chart"
                                      className="img-fluid h-100"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="col-12">
                              <div className="row gy-2">
                                <div className="col-12 col-xxl-6">
                                  <div className="card_box">
                                    <h3 className="font_20 font_400 ps-1">
                                      Improved Keywords
                                    </h3>
                                    <div className="branded_keywords table-responsive">
                                      <table className="table">
                                        <thead>
                                          <tr>
                                            <th scope="col">Keywords</th>
                                            <th scope="col">
                                              Pos. last 30 days
                                            </th>
                                            <th scope="col">Pos. before</th>
                                            <th scope="col">Change</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          <tr>
                                            <td>seo looker studio</td>
                                            <td>15</td>
                                            <td>19</td>
                                            <td>
                                              <i className="bi bi-arrow-up-short"></i>{" "}
                                              65
                                            </td>
                                          </tr>
                                          <tr>
                                            <td>seo looker</td>
                                            <td>19</td>
                                            <td>33</td>
                                            <td>
                                              <i className="bi bi-arrow-up-short"></i>{" "}
                                              17
                                            </td>
                                          </tr>
                                          <tr>
                                            <td>kpi in google</td>
                                            <td>15</td>
                                            <td>19</td>
                                            <td>
                                              <i className="bi bi-arrow-up-short"></i>{" "}
                                              65
                                            </td>
                                          </tr>
                                          <tr>
                                            <td>
                                              google optimisation template
                                            </td>
                                            <td>19</td>
                                            <td>33</td>
                                            <td>
                                              <i className="bi bi-arrow-up-short"></i>{" "}
                                              17
                                            </td>
                                          </tr>
                                          <tr>
                                            <td>google ads report</td>
                                            <td>15</td>
                                            <td>19</td>
                                            <td>
                                              <i className="bi bi-arrow-up-short"></i>{" "}
                                              65
                                            </td>
                                          </tr>
                                          <tr>
                                            <td>seo agency</td>
                                            <td>19</td>
                                            <td>33</td>
                                            <td>
                                              <i className="bi bi-arrow-up-short"></i>{" "}
                                              17
                                            </td>
                                          </tr>
                                          <tr>
                                            <td>facebook looker</td>
                                            <td>15</td>
                                            <td>19</td>
                                            <td>
                                              <i className="bi bi-arrow-up-short"></i>{" "}
                                              65
                                            </td>
                                          </tr>
                                          <tr>
                                            <td>best looker studio</td>
                                            <td>19</td>
                                            <td>33</td>
                                            <td>
                                              <i className="bi bi-arrow-up-short"></i>{" "}
                                              17
                                            </td>
                                          </tr>
                                          <tr>
                                            <td>best adwords</td>
                                            <td>15</td>
                                            <td>19</td>
                                            <td>
                                              <i className="bi bi-arrow-up-short"></i>{" "}
                                              65
                                            </td>
                                          </tr>
                                          <tr>
                                            <td>seo looker studio</td>
                                            <td>19</td>
                                            <td>33</td>
                                            <td>
                                              <i className="bi bi-arrow-up-short"></i>{" "}
                                              17
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-12 col-xxl-6">
                                  <div className="card_box">
                                    <h3 className="font_20 font_400 ps-1">
                                      Declined Keywords{" "}
                                      <span className="font_12 gray_clr ps-1">
                                        clicks
                                      </span>
                                    </h3>
                                    <div className="branded_keywords table-responsive">
                                      <table className="table">
                                        <thead>
                                          <tr>
                                            <th scope="col">Keywords</th>
                                            <th scope="col">
                                              Pos. last 30 days
                                            </th>
                                            <th scope="col">Pos. before</th>
                                            <th scope="col">Change</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          <tr>
                                            <td>seo looker studio</td>
                                            <td>15</td>
                                            <td>19</td>
                                            <td>
                                              <i className="bi bi-arrow-up-short"></i>{" "}
                                              65
                                            </td>
                                          </tr>
                                          <tr>
                                            <td>seo looker</td>
                                            <td>19</td>
                                            <td>33</td>
                                            <td>
                                              <i className="bi bi-arrow-up-short"></i>{" "}
                                              17
                                            </td>
                                          </tr>
                                          <tr>
                                            <td>kpi in google</td>
                                            <td>15</td>
                                            <td>19</td>
                                            <td>
                                              <i className="bi bi-arrow-up-short"></i>{" "}
                                              65
                                            </td>
                                          </tr>
                                          <tr>
                                            <td>
                                              google optimisation template
                                            </td>
                                            <td>19</td>
                                            <td>33</td>
                                            <td>
                                              <i className="bi bi-arrow-up-short"></i>{" "}
                                              17
                                            </td>
                                          </tr>
                                          <tr>
                                            <td>google ads report</td>
                                            <td>15</td>
                                            <td>19</td>
                                            <td>
                                              <i className="bi bi-arrow-up-short"></i>{" "}
                                              65
                                            </td>
                                          </tr>
                                          <tr>
                                            <td>seo agency</td>
                                            <td>19</td>
                                            <td>33</td>
                                            <td>
                                              <i className="bi bi-arrow-up-short"></i>{" "}
                                              17
                                            </td>
                                          </tr>
                                          <tr>
                                            <td>facebook looker</td>
                                            <td>15</td>
                                            <td>19</td>
                                            <td>
                                              <i className="bi bi-arrow-up-short"></i>{" "}
                                              65
                                            </td>
                                          </tr>
                                          <tr>
                                            <td>best looker studio</td>
                                            <td>19</td>
                                            <td>33</td>
                                            <td>
                                              <i className="bi bi-arrow-up-short"></i>{" "}
                                              17
                                            </td>
                                          </tr>
                                          <tr>
                                            <td>best adwords</td>
                                            <td>15</td>
                                            <td>19</td>
                                            <td>
                                              <i className="bi bi-arrow-up-short"></i>{" "}
                                              65
                                            </td>
                                          </tr>
                                          <tr>
                                            <td>seo looker studio</td>
                                            <td>19</td>
                                            <td>33</td>
                                            <td>
                                              <i className="bi bi-arrow-up-short"></i>{" "}
                                              17
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
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

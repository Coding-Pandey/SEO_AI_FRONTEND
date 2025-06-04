import ConnectModal from "./ConnectModal ";

const integrationsList = [
  {
    name: "Search console",
    img: "search-console.png",
    category: "google_search_console",
  },
  {
    name: "Google Analytics",
    img: "google-analytics.png",
    category: "google_analytics",
  },
  {
    name: "Google Ads",
    img: "google-ads.png",
    category: "google_ads",
  },
  {
    name: "LinkedIn",
    img: "linkedin.png",
    category: "linkedin",
  },
  {
    name: "Twitter",
    img: "X.png",
    category: "twitter",
  },
  {
    name: "Instagram",
    img: "insta.png",
    category: "instagram",
  },
  {
    name: "Tiktok",
    img: "tiktok.png",
    category: "tiktok",
  },
  {
    name: "Chrome UX Report",
    img: "chrome-ux.png",
    category: "google_chrome_ux_report",
  },
  {
    name: "Facebook",
    img: "facebook.png",
    category: "facebook",
  },
];

const IntegrationsTab = ({
  IntegratedData,
  setSelectedCategory,
  handleConnect,
}: {
  IntegratedData: any;
  setSelectedCategory: (category: string) => void;
  handleConnect: () => void;
}) => {
  return (
    <div
      className="tab-pane fade"
      id="pills-integration"
      role="tabpanel"
      aria-labelledby="pills-integration-tab"
    >
      <div className="profile_content Integrations_settings">
        <div className="row">
          <div className="col-12">
            <h3 className="font_20 font_600 mb-2">Integrations</h3>
            <p className="font_16">
              Enable connections for performance reporting, social media
              scheduling, and data-driven recommendations.
            </p>

            <ul className="list-unstyled integration_card_wrapper row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xxl-4 g-3">
              {integrationsList.map((item, index) => {
                const isConnected =
                  IntegratedData?.find(
                    (integration: any) => integration.provider === item.category
                  )?.connected || false;

                return (
                  <li className="col" key={index}>
                    <div
                      className="intergration_card card_box"
                      onClick={() => {
                        setSelectedCategory(item.category);
                      }}
                      data-bs-toggle={
                        item.name === "Search console" ? "modal" : ""
                      }
                      data-bs-target={
                        item.name === "Search console" ? "#integratedCard" : ""
                      }
                    >
                      <div className="left_part">
                        <img
                          src={`/assets/images/${item.img}`}
                          className="img-fluid integrated_icon"
                          alt="integrated icon"
                        />
                      </div>
                      <div className="right_part">
                        <h4 className="font_16 font_700 text_blue">
                          {item.name}
                        </h4>
                        <p className="font_14 mb-0">
                          Connect to access performance report data
                        </p>
                      </div>
                      <button type="button" className="integrate_btn">
                        <span>
                          <i
                            className={`bi bi-${
                              isConnected ? "check" : "x"
                            }-circle-fill ${
                              isConnected ? "text-success" : "text-danger"
                            }`}
                          ></i>
                        </span>
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

       <ConnectModal onConnect={handleConnect} />
    </div>
  );
};

export default IntegrationsTab;

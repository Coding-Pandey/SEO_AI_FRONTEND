import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { GetUserDetails } from "../Services/Services";

const Header = () => {
  const [userDetails, setUserDetails] = useState<any>({});
  const location = useLocation(); 
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
      const response = await GetUserDetails();
      if (response.status === 200 || response.status === 201) {
        setUserDetails(response.data);
      }
    } catch (error: any) {
      console.error("Error fetchUserDetails:", error);
    }
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <header>
      <nav className="navbar navbar-expand-md">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/dashboard">
            <img
              src="/assets/images/logo.svg"
              className="img-fluid main-logo"
              alt="logo"
            />
          </Link>

          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li>
              <button
                className="navbar-toggler"
                type="button"
                onClick={() => setSidebarOpen(true)}
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#">
                <i className="bi bi-envelope"></i>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#">
                <i className="bi bi-bell"></i>
              </Link>
            </li>
            <li>
              <Link
                to="/ProfileSetting"
                className={`nav-link ${
                  isActive("/ProfileSetting") ? "active" : ""
                }`}
              >
                <i className="bi bi-gear" aria-label="settings_icons"></i>
              </Link>
            </li>
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                to="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
             {userDetails?.image_url ? <img
                  src={userDetails?.image_url}
                  className="img-fluid profile-icon"
                  alt="profile-icon"
                /> :  <img
                  src="/assets/images/profile-pic1.jpg"
                  className="img-fluid profile-icon"
                  alt="profile-icon"
                />}
                {userDetails?.username &&
                  userDetails?.username.charAt(0).toUpperCase() +
                    userDetails?.username.slice(1)}
              </Link>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to="#">
                    My Account
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/Logout">
                    Logout
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
     
            <div className={`custom-sidebar-overlay d-block d-md-none ${sidebarOpen ? "open" : ""}`}>
              <div className="custom-sidebar">
                <div className="custom-sidebar-header">
                  <img
                    src="/assets/images/logo.svg"
                    className="img-fluid main-logo"
                    alt="logo"
                  />

                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setSidebarOpen(false)}
                  ></button>
                </div>

                <div className="sidebar">
                  <ul className="nav flex-column sidebar-top">
                    {/* Dashboard */}
                    <li className="nav-item dropdown">
                      <Link
                        className="nav-link dropdown-toggle"
                        to="#"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <i className="bi bi-grid"></i> Dashboard{" "}
                        <i className="bi bi-chevron-down dropdown_icon"></i>
                      </Link>
                      <ul className="dropdown-menu">
                        <li className="dropdown-item">
                          <Link
                            className={`submenu-link ${
                              isActive("#") ? "active" : ""
                            }`}
                            to="#"
                          >
                            Overview
                          </Link>
                        </li>
                        <li className="dropdown-item">
                          <Link
                            className={`submenu-link ${
                              isActive("#") ? "active" : ""
                            }`}
                            to="#"
                          >
                            List
                          </Link>
                        </li>
                        <li className="dropdown-item">
                          <Link
                            className={`submenu-link ${
                              isActive("#") ? "active" : ""
                            }`}
                            to="#"
                          >
                            Scheduled
                          </Link>
                        </li>
                        <li className="dropdown-item">
                          <Link
                            className={`submenu-link ${
                              isActive("#") ? "active" : ""
                            }`}
                            to="#"
                          >
                            Comment
                          </Link>
                        </li>
                      </ul>
                    </li>

                    {/* SEO */}
                    <li className="nav-item dropdown">
                      <Link
                        className="nav-link dropdown-toggle"
                        to="#"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <i className="bi bi-bar-chart"></i> SEO{" "}
                        <i className="bi bi-chevron-down dropdown_icon"></i>
                      </Link>
                      <ul className="dropdown-menu">
                        <li className="dropdown-item">
                          <Link
                            className={`submenu-link ${
                              isActive("#") ? "active" : ""
                            }`}
                            to="#"
                          >
                            Overview
                          </Link>
                        </li>
                        <li className="dropdown-item">
                          <Link
                            className={`submenu-link ${
                              isActive("/seo/keywordTool") ? "active" : ""
                            }`}
                            to="/seo/keywordTool"
                          >
                            Keyword tool
                          </Link>
                        </li>
                        <li className="dropdown-item">
                          <Link
                            className={`submenu-link ${
                              isActive("/seo/Reports") ? "active" : ""
                            }`}
                            to="/seo/Reports"
                          >
                            Reports
                          </Link>
                        </li>
                        <li className="dropdown-item">
                          <Link
                            className={`submenu-link ${
                              isActive("/seo/SeoAudit") ? "active" : ""
                            }`}
                            to="/seo/SeoAudit"
                          >
                            SEO Audit
                          </Link>
                        </li>
                       
                      </ul>
                    </li>

                    {/* PPC */}
                    <li className="nav-item dropdown">
                      <Link
                        className="nav-link dropdown-toggle"
                        to="#"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <i className="bi bi-bullseye"></i> PPC{" "}
                        <i className="bi bi-chevron-down dropdown_icon"></i>
                      </Link>
                      <ul className="dropdown-menu">
                        <li className="dropdown-item">
                          <Link
                            className={`submenu-link ${
                              isActive("#") ? "active" : ""
                            }`}
                            to="#"
                          >
                            Overview
                          </Link>
                        </li>
                        <li className="dropdown-item">
                          <Link
                            className={`submenu-link ${
                              isActive("/ppc/CreateCampaign") ? "active" : ""
                            }`}
                            to="/ppc/CreateCampaign"
                          >
                            Create Campaign
                          </Link>
                        </li>
                        <li className="dropdown-item">
                          <Link
                            className={`submenu-link ${
                              isActive("#") ? "active" : ""
                            }`}
                            to="#"
                          >
                            Scheduled
                          </Link>
                        </li>
                        <li className="dropdown-item">
                          <Link
                            className={`submenu-link ${
                              isActive("#") ? "active" : ""
                            }`}
                            to="#"
                          >
                            Comment
                          </Link>
                        </li>
                      </ul>
                    </li>

                    {/* Social Media Post */}
                    <li className="nav-item dropdown">
                      <Link
                        className="nav-link dropdown-toggle"
                        to="#"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <i className="bi bi-chat-dots"></i> Social Media Post{" "}
                        <i className="bi bi-chevron-down dropdown_icon"></i>
                      </Link>
                      <ul className="dropdown-menu">
                        <li className="dropdown-item">
                          <Link
                            className={`submenu-link ${
                              isActive("#") ? "active" : ""
                            }`}
                            to="#"
                          >
                            Overview
                          </Link>
                        </li>
                        <li className="dropdown-item">
                          <Link
                            className={`submenu-link ${
                              isActive("/social/Planner") ? "active" : ""
                            }`}
                            to="/social/Planner"
                          >
                            Planner
                          </Link>
                        </li>
                        <li className="dropdown-item">
                          <Link
                            className={`submenu-link ${
                              isActive("/social/GeneratePost") ? "active" : ""
                            }`}
                            to="/social/GeneratePost"
                          >
                            Generate Post
                          </Link>
                        </li>
                        <li className="dropdown-item">
                          <Link
                            className={`submenu-link ${
                              isActive("#") ? "active" : ""
                            }`}
                            to="#"
                          >
                            Report
                          </Link>
                        </li>
                      </ul>
                    </li>

                    {/* Content */}
                    <li className="nav-item dropdown">
                      <Link
                        className="nav-link dropdown-toggle"
                        to="#"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <i className="bi bi-pencil-square"></i> Content{" "}
                        <i className="bi bi-chevron-down dropdown_icon"></i>
                      </Link>
                      <ul className="dropdown-menu">
                        <li className="dropdown-item">
                          <Link
                            className={`submenu-link ${
                              isActive("#") ? "active" : ""
                            }`}
                            to="#"
                          >
                            Overview
                          </Link>
                        </li>
                        <li className="dropdown-item">
                          <Link
                            className={`submenu-link ${
                              isActive("/content/ContentGeneration")
                                ? "active"
                                : ""
                            }`}
                            to="/content/ContentGeneration"
                          >
                            Content Generation
                          </Link>
                        </li>
                        <li className="dropdown-item">
                          <Link
                            className={`submenu-link ${
                              isActive("#") ? "active" : ""
                            }`}
                            to="#"
                          >
                            Scheduled
                          </Link>
                        </li>
                        <li className="dropdown-item">
                          <Link
                            className={`submenu-link ${
                              isActive("#") ? "active" : ""
                            }`}
                            to="#"
                          >
                            Comment
                          </Link>
                        </li>
                      </ul>
                    </li>
                  </ul>

                  <ul className="nav flex-column sidebar-bottom">
                    <li className="sidebar-item">
                      <Link
                        className={`nav-link ${
                          isActive("/ProfileSetting") ? "active" : ""
                        }`}
                        to="/ProfileSetting"
                      >
                        <i className="bi bi-gear"></i> Settings
                      </Link>
                    </li>
                    <li className="sidebar-item">
                      <Link className="nav-link" to="/Logout">
                        <i className="bi bi-box-arrow-in-right"></i> Logout
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
         
        </div>
      </nav>
    </header>
  );
};

export default Header;

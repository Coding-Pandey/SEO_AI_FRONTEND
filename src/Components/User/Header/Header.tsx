import { Link } from "react-router-dom";
import { useAuth } from "../../../ContextApi/AuthContext/AuthContext";

const Header = () => {
  const { users } = useAuth();
  return (
    <header>
      <nav className="navbar navbar-expand-md">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/dashboard">
            <img  src="/assets/images/logo.svg" className="img-fluid main-logo" alt="logo" />
          </Link>

          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasExample"
                aria-controls="offcanvasExample"
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
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                to="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src="/assets/images/profile-pic1.jpg"
                  className="img-fluid profile-icon"
                  alt="profile-icon"
                />
                {users?.user?.username &&
                  users.user.username.charAt(0).toUpperCase() +
                    users.user.username.slice(1)}
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

          <div
            className="offcanvas offcanvas-start sidebar_wrapper d-block d-md-none"
            tabIndex={-1}
            id="offcanvasExample"
            aria-labelledby="offcanvasExampleLabel"
          >
            <div className="offcanvas-header">
              <img src="/assets/images/logo.svg" className="img-fluid main-logo" alt="logo" />
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>

            <div className="sidebar">
              <ul className="nav flex-column sidebar-top">
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle"
                    to="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="bi bi-grid"></i> Dashboard
                    <i className="bi bi-chevron-down dropdown_icon"></i>
                  </Link>
                  <ul className="dropdown-menu">
                    <li className="dropdown-item">
                      <Link className="submenu-link" to="#">
                        Overview
                      </Link>
                    </li>
                    <li className="dropdown-item">
                      <Link className="submenu-link active" to="#">
                        List
                      </Link>
                    </li>
                    <li className="dropdown-item">
                      <Link className="submenu-link" to="#">
                        Scheduled
                      </Link>
                    </li>
                    <li className="dropdown-item">
                      <Link className="submenu-link" to="#">
                        Comment
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle"
                    to="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="bi bi-bar-chart"></i> SEO
                    <i className="bi bi-chevron-down dropdown_icon"></i>
                  </Link>
                  <ul className="dropdown-menu">
                    <li className="dropdown-item">
                      <Link className="submenu-link" to="#">
                        Overview
                      </Link>
                    </li>
                    <li className="dropdown-item">
                      <Link className="submenu-link active" to="/seo/keywordTool">
                        Keyword tool
                      </Link>
                    </li>
                    <li className="dropdown-item">
                      <Link className="submenu-link" to="#">
                        Scheduled
                      </Link>
                    </li>
                    <li className="dropdown-item">
                      <Link className="submenu-link" to="#">
                        Comment
                      </Link>
                    </li>
                  </ul>
                </li>

                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle"
                    to="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="bi bi-bullseye"></i> PPC
                    <i className="bi bi-chevron-down dropdown_icon"></i>
                  </Link>
                  <ul className="dropdown-menu">
                    <li className="dropdown-item">
                      <Link className="submenu-link" to="#">
                        Overview
                      </Link>
                    </li>
                    {/* <li className="dropdown-item">
                      <Link className="submenu-link active" to="/PpcProcess">
                      PPC Process
                      </Link>
                    </li> */}
                    <li className="dropdown-item">
                      <Link className="submenu-link" to="/ppc/CreateCampaign">
                        Create Campaign
                      </Link>
                    </li>
                    <li className="dropdown-item">
                      <Link className="submenu-link" to="#">
                        Scheduled
                      </Link>
                    </li>
                    <li className="dropdown-item">
                      <Link className="submenu-link" to="#">
                        Comment
                      </Link>
                    </li>
                  </ul>
                </li>

                <li className="nav-item dropdown">
                  <Link
                    className={`nav-link dropdown-toggle  `}
                    aria-current="page"
                    to="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="bi bi-chat-dots"></i> Social Media Post
                    <i className="bi bi-chevron-down dropdown_icon"></i>
                  </Link>
                  <ul className="dropdown-menu">
                    <li className="dropdown-item">
                      <Link className="submenu-link" to="#">
                        Overview
                      </Link>
                    </li>
                    <li className="dropdown-item">
                      <Link className="submenu-link" to="/social/Planner">
                        Planner
                      </Link>
                    </li>
                    <li className="dropdown-item">
                      <Link className="submenu-link" to="/social/GeneratePost">
                        Generate Post
                      </Link>
                    </li>
                    <li className="dropdown-item">
                      <Link className="submenu-link" to="#">
                        Report
                      </Link>
                    </li>
                  </ul>
                </li>

                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle"
                    to="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="bi bi-pencil-square"></i> Content
                  </Link>
                  <ul className="dropdown-menu">
                    <li className="dropdown-item">
                      <Link className="submenu-link" to="#">
                        Overview
                      </Link>
                    </li>
                    <li className="dropdown-item">
                      <Link className="submenu-link" to="/content/ContentGeneration">
                        Content Generation
                      </Link>
                    </li>
                    <li className="dropdown-item">
                      <Link className="submenu-link" to="#">
                        Scheduled
                      </Link>
                    </li>
                    <li className="dropdown-item">
                      <Link className="submenu-link" to="#">
                        Comment
                      </Link>
                    </li>
                  </ul>
                </li>

                {/* <li className="nav-item">
                  <Link className="nav-link" to="/KeywordsSuggestions">
                    <i className="bi bi-lightbulb"></i> Keywords Suggestions
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/UploadDocument">
                    <i className="bi bi-cloud-arrow-up"></i> Upload Document
                  </Link>
                </li> */}
              </ul>

              <ul className="nav flex-column sidebar-bottom">
                <li className="sidebar-item">
                  <Link className="nav-link" to="#">
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
      </nav>
    </header>
  );
};

export default Header;

import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { GetUserDetails } from "../../../User/Services/Services";

export const capitalizeFirstLetter = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);

type MenuItem = {
  title: string;
  icon: string;
  to: string; // direct link only
};

const menuItems: MenuItem[] = [
  {
    title: "Admin Dashboard",
    icon: "bi-grid",
    to: "/admin-dashboard",
  },
  {
    title: "User Management",
    icon: "bi-people",
    to: "/users-organization",
  },
  {
    title: "Organizations",
    icon: "bi-people",
    to: "/organization-management",
  },
  {
    title: "Active Session",
    icon: "bi-people-fill",
    to: "/active-session",
  },

  {
    title: "Security Logs",
    icon: "bi-shield-lock",
    to: "/security_logs",
  },
];

const AdminHeader = () => {
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
          <Link className="navbar-brand" to="/admin-dashboard">
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
            {userDetails?.role && (
              <li className="nav-item hide-on-mobile">
                <button
                  className="primary_btn"
                  style={{
                    backgroundColor: "rgb(72, 114, 183)",
                    border: "none",
                  }}
                >
                  {capitalizeFirstLetter(userDetails.role)}
                </button>
              </li>
            )}

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
                to="/admin-profile"
                className={`nav-link ${
                  isActive("admin-profile") ? "active" : ""
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
                {userDetails?.image_url ? (
                  <img
                    src={userDetails?.image_url}
                    className="img-fluid profile-icon"
                    alt="profile-icon"
                  />
                ) : (
                  <img
                    src="/assets/images/profile-pic1.jpg"
                    className="img-fluid profile-icon"
                    alt="profile-icon"
                  />
                )}
                {userDetails?.username &&
                  userDetails?.username.charAt(0).toUpperCase() +
                    userDetails?.username.slice(1)}
              </Link>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to="/admin-profile">
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
            className={`custom-sidebar-overlay d-block d-md-none ${
              sidebarOpen ? "open" : ""
            }`}
          >
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
                  {menuItems.map((item) => (
                    <li className="nav-item" key={item.title}>
                      <Link
                        className={`nav-link ${
                          isActive(item.to) ? "active" : ""
                        }`}
                        to={item.to}
                      >
                        <i className={`bi ${item.icon}`}></i> {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default AdminHeader;

import { Link, useLocation } from "react-router-dom";

const AdminSideBar = () => {
  const { pathname } = useLocation();

  const menuItems = [
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

  const isActive = (to: string) => pathname.startsWith(to);

  return (
    <div className="sidebar d-none d-md-flex">
      <ul className="nav flex-column sidebar-top">
        {menuItems.map((item) => (
          <li className="nav-item" key={item.title}>
            <Link
              className={`nav-link ${isActive(item.to) ? "active" : ""}`}
              to={item.to}
            >
              <i className={`bi ${item.icon}`}></i> {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminSideBar;

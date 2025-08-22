import { Link, useLocation } from "react-router-dom";

const AdminSideBar = () => {
  const { pathname } = useLocation();

  const menuItems = [
    {
      title: "Admin Dashboard",
      icon: "bi-grid",
      to: "/adminDashBoard",  
    },
    {
      title: "User Management",
      icon: "bi-people",
      to: "/users-organization",
    },
    {
    title: "Active Session",
    icon: "bi-people-fill",
    to: "/active-session",
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

      <ul className="nav flex-column sidebar-bottom">
        <li className="sidebar-item">
          <Link className="nav-link" to="/Admin-Profile">
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
  );
};

export default AdminSideBar;

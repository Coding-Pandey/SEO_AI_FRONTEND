import { Link, useLocation } from 'react-router-dom';

const SideBar = () => {
  const { pathname } = useLocation();

  const menuItems = [
    {
      title: 'Dashboard',
      icon: 'bi-grid',
      submenu: [
        { title: 'Overview', to: '#' },
        { title: 'List', to: '#' },
        { title: 'Scheduled', to: '#' },
        { title: 'Comment', to: '#' },
      ],
    },
    {
      title: 'SEO',
      icon: 'bi-bar-chart-line',
      submenu: [
        { title: 'Overview', to: '#' },
        { title: 'Keyword tool', to: '/seo/keywordTool' },
        { title: 'Scheduled', to: '#' },
        { title: 'Comment', to: '#' },
      ],
    },
    {
      title: 'PPC',
      icon: 'bi-coin',
      submenu: [
        { title: 'Overview', to: '#' },
        { title: 'Create Campaign', to: '/ppc/CreateCampaign' },
        { title: 'Scheduled', to: '#' },
        { title: 'Comment', to: '#' },
      ],
    },
    {
      title: 'Social Media',
      icon: 'bi-person-plus',
      submenu: [
        { title: 'Overview', to: '#' },
        { title: 'Planner', to: '/social/Planner' },
        { title: 'Generate Post', to: '/social/GeneratePost' },
        { title: 'Report', to: '#' },
      ],
    },
    {
      title: 'Content',
      icon: 'bi-pencil-square',
      submenu: [
        { title: 'Overview', to: '#' },
        { title: 'Content Generation', to: '/content/ContentGeneration' },
        { title: 'Scheduled', to: '#' },
        { title: 'Comment', to: '#' },
      ],
    },
  ];

  const isActive = (to: string) => pathname.startsWith(to);

  const renderDropdown = (item: any) => {
    const isAnySubActive = item.submenu.some((sub: any) => isActive(sub.to));
    return (
      <li className={`nav-item dropdown ${isAnySubActive ? 'show' : ''}`} key={item.title}>
        <Link
          className="nav-link dropdown-toggle"
          to="#"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded={isAnySubActive}
        >
          <i className={`bi ${item.icon}`}></i> {item.title}
          <i className="bi bi-chevron-down dropdown_icon"></i>
        </Link>
        <ul className={`dropdown-menu ${isAnySubActive ? 'show' : ''}`}>
          {item.submenu.map((sub: any) => (
            <li className="dropdown-item" key={sub.title}>
              <Link
                className={`submenu-link ${isActive(sub.to) ? 'active' : ''}`}
                to={sub.to}
              >
                {sub.title}
              </Link>
            </li>
          ))}
        </ul>
      </li>
    );
  };

  return (
    <div className="sidebar d-none d-md-flex">
      <ul className="nav flex-column sidebar-top">
        {menuItems.map(renderDropdown)}

        {/* <li className="nav-item">
          <Link className={`nav-link ${isActive('/KeywordsSuggestions') ? 'active' : ''}`} to="/KeywordsSuggestions">
            <i className="bi bi-lightbulb"></i> Keywords Suggestions
          </Link>
        </li>

        <li className="nav-item">
          <Link className={`nav-link ${isActive('/UploadDocument') ? 'active' : ''}`} to="/UploadDocument">
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
  );
};

export default SideBar;

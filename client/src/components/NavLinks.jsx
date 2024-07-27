import { NavLink } from "react-router-dom";
import links from "../utils/links";
import { useContext } from "react";
import { dashboardContext } from "../pages/DashboardLayout";

const NavLinks = ({ isBigSidebar }) => {
  const { toggleSidebar } = useContext(dashboardContext);

  return (
    <div className="nav-links">
      {links.map(({ text, path, icon }) => (
        <NavLink
          to={path}
          key={text}
          className="nav-link"
          onClick={isBigSidebar ? null : toggleSidebar}
          end
        >
          <span className="icon">{icon}</span>
          {text}
        </NavLink>
      ))}
    </div>
  );
};

export default NavLinks;

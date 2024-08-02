import { NavLink } from "react-router-dom";
import links from "../utils/links";
import { useContext } from "react";
import { dashboardContext } from "../pages/DashboardLayout";

const NavLinks = ({ isBigSidebar }) => {
  const { toggleSidebar, user } = useContext(dashboardContext);

  return (
    <div className="nav-links">
      {links.map(({ text, path, icon }) => {
        if (path === "admin" && user.role !== "admin") return;
        return (
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
        );
      })}
    </div>
  );
};

export default NavLinks;

import Wrapper from "../assets/wrappers/Navbar";
import { MdMenu } from "react-icons/md";
import Logo from "./Logo";
import { useContext } from "react";
import LogoutContainer from "./LogoutContainer";
import ThemeToggle from "./ThemeToggle";
import { dashboardContext } from "../pages/DashboardLayout";

const Navbar = () => {
  const { toggleSidebar } = useContext(dashboardContext);

  return (
    <Wrapper>
      <div className="nav-center">
        <button className="toggle-btn" onClick={toggleSidebar}>
          <MdMenu />
        </button>
        <div>
          <Logo />
          <h4 className="logo-text">dashboard</h4>
        </div>
        <div className="btn-container">
          <ThemeToggle />
          <LogoutContainer />
        </div>
      </div>
    </Wrapper>
  );
};

export default Navbar;

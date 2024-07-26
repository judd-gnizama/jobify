import Wrapper from "../assets/wrappers/Navbar";
import { MdMenu } from "react-icons/md";
import Logo from "./Logo";
import { useContext } from "react";
import { DashboardContext } from "../contexts/DashboardContext";
import LogoutContainer from "./LogoutContainer";
import ThemeToggle from "./ThemeToggle";
const Navbar = () => {
  const { toggleSidebar } = useContext(DashboardContext);

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

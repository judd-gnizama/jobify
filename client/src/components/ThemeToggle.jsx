import { useContext } from "react";
import Wrapper from "../assets/wrappers/ThemeToggle";
import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs";
import { dashboardContext } from "../pages/DashboardLayout";

const ThemeToggle = () => {
  const { isDarkTheme, toggleDarkTheme } = useContext(dashboardContext);

  return (
    <Wrapper onClick={toggleDarkTheme}>
      {isDarkTheme ? (
        <BsFillSunFill className="toggle-icon" />
      ) : (
        <BsFillMoonFill className="toggle-icon" />
      )}
    </Wrapper>
  );
};

export default ThemeToggle;

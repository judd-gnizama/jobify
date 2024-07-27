import React, { useContext, useState } from "react";
import Wrapper from "../assets/wrappers/LogoutContainer";
import { FaCaretDown, FaUserCircle } from "react-icons/fa";
import { dashboardContext } from "../pages/DashboardLayout";

const LogoutContainer = () => {
  const [showLogout, setShowLogout] = useState(false);
  const { user, logoutUser } = useContext(dashboardContext);

  return (
    <Wrapper>
      <button
        type="button"
        className="btn logout-btn"
        onClick={() => setShowLogout(!showLogout)}
      >
        <FaUserCircle />
        {user?.name}
        <FaCaretDown />
      </button>
      <div className={`dropdown ${showLogout ? "show-dropdown" : ""}`}>
        <button className="dropdown-btn" onClick={logoutUser}>
          logout
        </button>
      </div>
    </Wrapper>
  );
};

export default LogoutContainer;

import React from "react";
import "./sidebar.css";
import { Link } from "react-router-dom";

const SidebarAdmin = () => {
  return (
    <>
      <div className="sidebar">
        <div className="sidebarwrapper">
          <div className="sidebarMenu">
            <h3 className="sidebarTitle text-dark">Dashboard</h3>
            <ul className="sidebarList bg-light mb-3 ">
              <Link to="/admin" className="text-dark">
                {" "}
                <li className="sidebarListItem active">
                  {/* <LineStyle className="sidebarIcon" /> */}
                  All Tours
                </li>
              </Link>
              <Link to="/admin/profile" className="text-dark">
                <li className="sidebarListItem">
                  {/* <Timeline className="sidebarIcon" /> */}
                  Profile
                </li>
              </Link>
              <li className="sidebarListItem">
                {/* <TrendingUp className="sidebarIcon" /> */}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default SidebarAdmin;

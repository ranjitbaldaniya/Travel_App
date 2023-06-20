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
              <Link to="/admin/users" className="text-dark">
                <li className="sidebarListItem">
                  {/* <Timeline className="sidebarIcon" /> */}
                  Users
                </li>
              </Link>
              <Link to="/admin/inquiries" className="text-dark">
                <li className="sidebarListItem">
                  {/* <Timeline className="sidebarIcon" /> */}
                  Inquiries
                </li>
              </Link>
              <Link to="/admin/viewbookings" className="text-dark">
                <li className="sidebarListItem">
                  {/* <Timeline className="sidebarIcon" /> */}
                  Bookings
                </li>
              </Link>
              <Link to="/admin/profile" className="text-dark">
                <li className="sidebarListItem">
                  {/* <Timeline className="sidebarIcon" /> */}
                  Profile
                </li>
              </Link>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default SidebarAdmin;

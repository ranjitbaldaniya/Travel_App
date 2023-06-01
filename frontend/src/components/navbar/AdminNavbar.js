import React, { useEffect, useState } from "react";
import "./admin.css";
import { Link, useNavigate } from "react-router-dom";
import { PopupMenu } from "react-simple-widgets";
import { Button } from "reactstrap";

const AdminNavbar = () => {
  const [userName, setUserName] = useState("");
  const [userData, setUserData] = useState("");

  const navigate = useNavigate();
  // console.log(userName)

  //handle for getting credencials
  const handleGetAdminDetails = () => {
    const userDetails = sessionStorage.getItem("user");
    // console.log("123" , JSON.parse(userDetails));
    return JSON.parse(userDetails);
  };

  //handlelogout
  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/");
  };

  useEffect(() => {
    const data = handleGetAdminDetails();
    setUserData(data);
    setUserName(data.firstName);
  }, [sessionStorage.getItem("user")]);

  return (
    <div className="topbar bg-primary">
      <div className="topbarWrapper">
        <div className="topLeft">
          <Link to="/admin" className="">
            <h4 className="logo text-light">Admin Penal</h4>
          </Link>
        </div>
        <div className="topRight">
          {/* <div className="topbarIconContainer">
            Nav
            <span className="topIconBadge">2</span>
          </div> */}
          {/* <div className="topbarIconContainer">
            Mark
            <span className="topIconBadge">2</span>
          </div> */}
          {/* <div className="topbarIconContainer">Inquiry</div> */}
          <h2 className="me-5 text-light">Welcome {userName}</h2>
          <PopupMenu>
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
              alt="avatar"
              className="rounded-circle img-fluid"
              style={{ width: "35px" }}
            />

            <div className="card text-start">
              <div className="card-body px-4 py-4">
                <div id="circle-avatar" className="text-center mx-auto mb-4">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                    alt="avatar"
                    className="rounded-circle img-fluid"
                    style={{ width: "50px" }}
                  />
                </div>

                <h5 className="text-center mb-0">{userName}</h5>
                <p className="text-center mb-2">{userData.email}</p>

                <hr />

                <p
                  className="mb-0"
                  style={{ color: "#bebebe", fontWeight: "bold", fontSize: 12 }}
                >
                  Role
                </p>
                <p style={{ fontSize: 12 }}>{userData.role}</p>

                <hr className="mb-0" style={{ margin: "0 -24px 0" }} />
                {/* 
                <div
                  className="list-group list-group-flush"
                  style={{ margin: "0 -24px 0" }}
                >
                  <button className="list-group-item list-group-item-action px-4">
                    <small>Change Requests</small>
                  </button>
                  <button className="list-group-item list-group-item-action px-4">
                    <small>Pending Requests</small>
                  </button>
                  <button className="list-group-item list-group-item-action px-4">
                    <small>Other Requests</small>
                  </button>
                </div> */}

                <hr style={{ margin: "0 -24px 24px" }} />

                <div className="d-grid">
                  <Button
                    className="btn btn-secondary"
                    onClick={handleLogout}
                  >Logout</Button>
                </div>
              </div>
            </div>
          </PopupMenu>
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
// import 'bootstrap/dist/js/bootstrap.bundle.min';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./views/home/Home";
import Login from "./views/authpage/Login";
import Register from "./views/authpage/Register";
import AdminDashboard from "./views/dashboard/AdminDashboard";
import UserDashboard from "./views/dashboard/UserDashboard";
import Auth from "./layouts/Auth";
import Admin from "./layouts/Admin";
import Profile from "./components/profile/Profile";
import UserLayout from "./layouts/UserLayout";
import EditTour from "./components/tour/EditTour";
import AddTour from "./components/tour/AddTour";
import EditProfile from "./components/profile/EditProfile";
import UserListing from "./components/user/UserListing";
import AddUser from "./components/user/AddUser";
import EditUser from "./components/user/EditUser";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route path="/admin" element={<Admin />}>
          <Route index element={<AdminDashboard />} />
          {/* <Route path="/admin/tourlist" element={<AdminDashboard />} /> */}
          <Route path="/admin/addtour" element={<AddTour />} />
          <Route path="/admin/edittour/:id" element={<EditTour />} />
          <Route path="/admin/profile" element={<Profile />} />
          <Route path="/admin/editprofile" element={<EditProfile />} />
          <Route path="/admin/users" element={<UserListing />} />
          <Route path="/admin/adduser" element={<AddUser />} />
          <Route path="/admin/edituser/:id" element={<EditUser/>} />

        </Route>
        <Route path="/user" element={<UserLayout />}>
          <Route index element={<UserDashboard />} />
        </Route>
        <Route path="*" element={<>Page Not-Found - 404</>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

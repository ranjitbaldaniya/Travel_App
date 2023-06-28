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
import TourDetails from "./components/tour/TourDetails";
import Inquiry from "./components/inquiry/Inquiry";
import AddInquiry from "./components/inquiry/AddInquiry";
import EditInquiry from "./components/inquiry/EditInquiry";
import MainDashBoard from "./views/home/MainDashBoard";
import Booking from "./components/booking/Booking";
import ViewBookings from "./components/booking/ViewBookings";
import EditBookings from "./components/booking/EditBookings";
import AddBookings from "./components/booking/AddBookings";
import UserBookings from "./components/booking/UserBookings";
import Payment from "./components/paymentPage/Payment";
import SuccessPage from "./components/paymentPage/SuccessPage";
// import dotenv from 'dotenv';

function App() {
  // dotenv.config();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />}>
          <Route index element={<MainDashBoard />} />
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
          <Route path="/admin/edituser/:id" element={<EditUser />} />
          <Route path="/admin/inquiries" element={<Inquiry />} />
          <Route path="/admin/addinquiries" element={<AddInquiry />} />
          <Route path="/admin/editinquiries/:id" element={<EditInquiry />} />
          <Route path="/admin/viewbookings" element={<ViewBookings />} />
          <Route path="/admin/addbookings" element={<AddBookings />} />
          <Route path="/admin/editbookings/:id" element={<EditBookings />} />
        </Route>
        <Route path="/user" element={<UserLayout />}>
          <Route index element={<MainDashBoard />} />
          <Route path="/user/booking" element={<UserBookings />} />

          <Route path="/user/book/:id" element={<Booking />} />
          <Route path="/user/tour/:id" element={<TourDetails />} />
          <Route path="/user/payment/:id" element={<Payment />} />

          <Route path="/user/success/:id" element={<SuccessPage/>} />
          <Route path="/user/error" element={<>Error</>} />

          {/* <Route path="/user/tour/inquiry" element={<Inquiry/>} /> */}
        </Route>
        <Route path="*" element={<>Page Not-Found - 404</>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


import DashBoard from "../layOuts/DashBoard";
import AboutUs from "../pages/aboutUs/AboutUs";
import Login from "../pages/CommonPages/Login";
import Registration from "../pages/CommonPages/Registration";
import ContactUs from "../pages/contactUs/ContactUs";
import Bookings from "../pages/Dashboard/bookings/Bookings";
import Home from "../pages/home/Home";
import MeetingRooms from "../pages/meetingRooms/MeetingRooms";
import RoomDetails from "../pages/meetingRooms/RoomDetails";
import PrivacyPolicy from "../pages/privacyandTerm/PrivacyPolicy";
import { adminDashDashboarditmes } from "./adminDashboardpath";
import TermsAndConditions from "../pages/privacyandTerm/Term&Condition";
import ProtectedRoute from "../routes/ProtectedRoute";
import CheckOutPage from "../pages/CommonPages/CheckOutPage";

export const NavItemsPath = [
  {
    name: "Home",
    path: "/",
    element: <Home />,
  },
  {
    name: "Meeting Room",
    path: "meeting-rooms",
    element: <MeetingRooms />,
  },
  {
    name: "About Us",
    path: "about-us",
    element: <AboutUs />,
  },
  {
    name: "Contact Us",
    path: "contact-us",
    element: <ContactUs />,
  },
  {
    path: "login",
    element: <Login />
  },
  {
    path: "register",
    element: <Registration />
  },
  {
    path: "myBookings",
    element: <Bookings />
  },
  {
    path: "/admin/dashboard",
    element: <DashBoard />,
    children: adminDashDashboarditmes
  },

  {
    path: "/room-details/:id",
    element: <ProtectedRoute><RoomDetails /></ProtectedRoute>
  },
  {
    path: "/privacy-policy",
    element: <PrivacyPolicy />
  },
  {
    path: "/terms-of-service",
    element: <TermsAndConditions />
  },
  {
    path: "/checkout",
    element: <CheckOutPage />
  }

];
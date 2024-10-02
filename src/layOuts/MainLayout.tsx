import { Outlet } from "react-router-dom";
import Navbar from "../pages/CommonPages/Navbar";
import Gotop from "../components/common/GoTopBtn";
import ScrollToTop from "../components/common/ScrollToTop";
import BookifyFooter from "../pages/CommonPages/BookifyFooter";

const MainLayout = () => {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Outlet />
      <BookifyFooter />
      <Gotop />
    </>
  );
};

export default MainLayout;

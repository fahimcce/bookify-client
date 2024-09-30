import { Outlet } from "react-router-dom"
import Navbar from "../pages/CommonPages/Navbar"
import RoomifyFooter from "../pages/CommonPages/Footer"
import Gotop from "../components/common/GoTopBtn"
import ScrollToTop from "../components/common/ScrollToTop"


const MainLayout = () => {
    return (
        <>
            <ScrollToTop />
            <Navbar />
            <Outlet />
            <RoomifyFooter />
            <Gotop />
        </>
    )
}

export default MainLayout
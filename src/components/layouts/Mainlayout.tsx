import { Outlet } from "react-router-dom";

import Navbar from "../../pages/NavBar/Navbar";
import { Layout } from "antd";
import Footers from "../ui/Footers";

const Mainlayout = () => {
  return (
    <Layout>
      <Navbar />
      <Layout.Content>
        <Outlet />
      </Layout.Content>
      <Footers />
    </Layout>
  );
};

export default Mainlayout;

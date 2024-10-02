import React, { useState } from "react";
import { Layout, Menu, Button, Drawer } from "antd";
import { Outlet } from "react-router-dom";
import { MenuOutlined } from "@ant-design/icons"; // Drawer toggle icon
import { useAppSelector } from "../redux/hooks";
import { adminDashDashboarditmes } from "../lib/adminDashboardpath";
import { ItemType, MenuItemType } from "antd/es/menu/interface";
import { navbarGenerator } from "../utils/navbarGenerator";
import NoDataFound from "../components/common/NoDataFound";
import { verifiyToken } from "../utils/VerifyToken";

const { Content, Sider } = Layout;

const DashBoard: React.FC = () => {
  const [drawerVisible, setDrawerVisible] = useState(false); // State to handle drawer visibility
  const token = useAppSelector((state) => state.auth.token);
  let loggeduser;
  if (token) {
    loggeduser = verifiyToken(token);
  }

  let items: ItemType<MenuItemType>[] = [];
  switch (loggeduser?.role) {
    case "admin":
      items = navbarGenerator(adminDashDashboarditmes);
      break;
  }

  if (loggeduser?.role !== "admin") {
    return <NoDataFound />;
  }

  return (
    <Layout>
      {/* Drawer button for mobile */}
      <Button
        className="lg:hidden fixed top-16 left-4 z-50"
        icon={<MenuOutlined />}
        onClick={() => setDrawerVisible(true)}
      />

      {/* Sider for larger screens */}
      <Sider
        className="hidden lg:block fixed top-14 h-[calc(100vh-56px)]" // Adjust height to leave space for the navbar
        breakpoint="lg"
        collapsedWidth="0"
      >
        <Menu
          theme="dark"
          mode="inline"
          items={items}
          style={{ fontSize: "16px", marginTop: "25px" }}
        />
      </Sider>

      {/* Drawer for mobile screens */}
      <Drawer
        title="Navigation"
        placement="left"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        className="lg:hidden"
      >
        <Menu theme="dark" mode="inline" items={items} />
      </Drawer>

      {/* Main content area */}
      <Layout>
        <Content style={{ margin: "10px 10px 0", paddingTop: "56px" }}>
          <div className="min-h-screen overflow-y-scroll lg:ml-[200px]">
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashBoard;

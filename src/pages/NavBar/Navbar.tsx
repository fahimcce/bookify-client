import { useState } from "react";
import { Menu, Button, Drawer, Dropdown } from "antd";
import { Header } from "antd/es/layout/layout";
import { NavLink } from "react-router-dom";
import { MenuOutlined, LoginOutlined, UserOutlined } from "@ant-design/icons";
import logoImage from "../../assets/logo/logo.png"; // Adjust the path as necessary
import "./Navbar.css";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { logout } from "../../redux/features/auth/authSlice";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const dispatch = useAppDispatch();

  // Get the authentication state and user role from Redux
  const token = useAppSelector((state) => state.auth.token);
  const userRole = useAppSelector((state) => state.auth.user?.role); // Assuming user role is stored in the state

  // Toggle the mobile drawer visibility
  const showDrawer = () => {
    setVisible(true);
  };

  const closeDrawer = () => {
    setVisible(false);
  };

  // Handle user logout
  const handleLogout = () => {
    dispatch(logout()); // Clear user state in Redux
    closeDrawer(); // Close drawer if open (mobile view)
  };

  // Define menu items for authenticated users
  const userMenuItems = (
    <Menu>
      <Menu.Item key="my-bookings">
        <NavLink to="/my-bookings">My Bookings</NavLink>
      </Menu.Item>
      <Menu.Item key="logout" onClick={handleLogout}>
        <span style={{ color: "red" }}>Logout</span>
      </Menu.Item>
    </Menu>
  );

  // Define menu items for admins
  const adminMenuItems = (
    <Menu>
      <Menu.Item key="dashboard">
        <NavLink to="/dashboard">Dashboard</NavLink>
      </Menu.Item>
      <Menu.Item key="logout" onClick={handleLogout}>
        <span style={{ color: "red" }}>Logout</span>
      </Menu.Item>
    </Menu>
  );

  // Define the main menu items
  const menuItems = [
    {
      key: "Home",
      label: <NavLink to="/">Home</NavLink>,
    },
    {
      key: "Meeting Rooms",
      label: <NavLink to="/meeting-room">Meeting Rooms</NavLink>,
    },
    {
      key: "About Us",
      label: <NavLink to="/about">About Us</NavLink>,
    },
    {
      key: "Contact Us",
      label: <NavLink to="/contact">Contact Us</NavLink>,
    },
    // Conditionally render Login or User Icon
    token
      ? {
          key: "user-dropdown",
          label: (
            <Dropdown
              overlay={userRole === "admin" ? adminMenuItems : userMenuItems}
              trigger={["click"]}
            >
              <Button
                type="link"
                icon={<UserOutlined />}
                style={{ color: "white" }}
              >
                User
              </Button>
            </Dropdown>
          ),
        }
      : {
          key: "Login",
          label: (
            <NavLink to="/login">
              <LoginOutlined /> Login
            </NavLink>
          ),
        },
  ];

  return (
    <div>
      <Header className="navbar">
        <div className="navbar-container">
          <div className="logo">
            <img src={logoImage} alt="Logo" />
          </div>
          {/* Desktop Menu */}
          <div className="menu-desktop">
            <Menu
              theme="dark"
              mode="horizontal"
              items={menuItems}
              className="custom-menu"
            />
          </div>
          {/* Mobile Menu - Toggle Button */}
          <div className="menu-mobile">
            <Button
              type="primary"
              icon={<MenuOutlined />}
              onClick={showDrawer}
            />
          </div>
        </div>
      </Header>

      {/* Drawer for Mobile Menu */}
      <Drawer
        title="Menu"
        placement="right"
        onClose={closeDrawer}
        open={visible}
      >
        <Menu mode="inline" items={menuItems} onClick={closeDrawer} />
      </Drawer>
    </div>
  );
};

export default Navbar;

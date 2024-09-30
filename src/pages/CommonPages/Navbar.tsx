import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, Button, Drawer, MenuProps, Dropdown } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import logo from "../../assets/logo.png";
import { navbarGenerator } from "../../utils/navbarGenerator";
import { NavItemsPath } from "../../lib/routerAndNavItemsPath";
import { FaUser } from "react-icons/fa";
import { BiBox, BiExit } from "react-icons/bi";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logOut } from "../../redux/features/auth/authSlice";
import { toast } from "sonner";
import { verifiyToken } from "../../utils/VerifyToken";
type MenuItem = Required<MenuProps>["items"][number];

const Navbar = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.auth.token);
  let user;
  if (token) {
    user = verifiyToken(token);
  }
  const [visible, setVisible] = useState(false);

  const navigate = useNavigate();
  const showDrawer = () => {
    setVisible(true);
  };
  const closeDrawer = () => {
    setVisible(false);
  };

  const items: MenuItem[] = navbarGenerator(NavItemsPath);
  if (!user) {
    items.push({
      key: "Login",
      label: <NavLink to="/login">Sign In</NavLink>,
    });
  }
  const UserdropDownItems: MenuItem[] = [
    {
      key: "bookings-or-dashboard",
      label: (
        <NavLink to={user?.role === "user" ? `/myBookings` : "admin/dashboard"}>
          <Button className="px-2">
            {user?.role === "user" ? "My Reservations" : "Admin Panel"}
            <BiBox size={16} />
          </Button>
        </NavLink>
      ),
    },
    {
      key: "Logout",
      label: (
        <Button
          onClick={() => handleLogout()}
          className="px-2 w-full justify-start"
        >
          Sign Out <BiExit size={16} />
        </Button>
      ),
    },
  ];
  const handleLogout = () => {
    const toastId = toast.loading("Logging out...");
    dispatch(logOut());
    toast.success("Successfully Logged Out", { id: toastId });
    navigate("/");
  };

  return (
    <nav className="shadow-lg sticky top-0 bg-gray-800 bg-opacity-80 backdrop-blur z-50 py-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-white">
              <img src={logo} alt="Logo" className="max-w-[150px]" />
            </Link>
          </div>
          <div className="hidden md:flex space-x-6 items-center w-full">
            <Menu
              mode="horizontal"
              style={{
                width: "100%",
                justifyContent: "end",
                border: "0",
                fontSize: "18px",
              }}
              items={items}
              className="font-poppins font-medium bg-transparent"
            />
            {/* user icon and dropdown based on user */}
            {user && (
              <Dropdown
                trigger={["click"]}
                menu={{ items: UserdropDownItems }}
                arrow={true}
                overlayStyle={{ border: "1px solid #bbb", borderRadius: "8px" }}
              >
                <Button className="px-6 font-semibold text-white">
                  Profile <FaUser size={15} />
                </Button>
              </Dropdown>
            )}
          </div>
          <div className="flex md:hidden items-center">
            <Button
              type="primary"
              icon={<MenuOutlined />}
              onClick={showDrawer}
              className="bg-blue-500 text-white"
            />
          </div>
        </div>
      </div>
      <Drawer
        title="Navigation Menu"
        placement="right"
        onClose={closeDrawer}
        open={visible}
        headerStyle={{ backgroundColor: "#444", color: "white" }}
        bodyStyle={{ backgroundColor: "#333", color: "white" }}
      >
        <Menu
          mode="inline"
          onClick={closeDrawer}
          items={items}
          style={{ backgroundColor: "#333", color: "white" }}
        />
        {user && (
          <Dropdown
            className="ml-7"
            trigger={["click"]}
            menu={{ items: UserdropDownItems }}
            arrow={true}
            overlayStyle={{ border: "1px solid #bbb", borderRadius: "8px" }}
          >
            <Button className="px-6 font-semibold text-white">
              Profile <FaUser size={15} />
            </Button>
          </Dropdown>
        )}
      </Drawer>
    </nav>
  );
};

export default Navbar;

/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button } from "antd";
import { motion } from "framer-motion";
import { Typography } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import RoomForm from "../../components/forms/RoomForm";
import RoomInput from "../../components/forms/RoomInput";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLogInMutation } from "../../redux/features/auth/auth.api";
import { toast } from "sonner";
import { useAppDispatch } from "../../redux/hooks";
import { setUser } from "../../redux/features/auth/authSlice";

import { zodResolver } from "@hookform/resolvers/zod";
import { logiValidationSchema } from "../../schemaValidation/LoginRegistrationValidation";
import { verifiyToken } from "../../utils/VerifyToken";

const { Title } = Typography;

const Login = () => {
  const [loginUser] = useLogInMutation();
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dynamicNavigateLink = location?.state?.from?.pathname || "/";

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    const toastId = toast.loading("Signing In...");
    try {
      const res: any = await loginUser(values);

      if (res?.data?.success) {
        const token = res?.data?.token;
        const user = verifiyToken(token);
        dispatch(setUser({ user, token }));
        navigate(dynamicNavigateLink, { replace: true });
        toast.success(res?.data?.message, { id: toastId });
      }
      if (res.error) {
        toast.error(res?.error?.message || res?.error?.data?.message, {
          id: toastId,
        });
      }
    } catch (error: any) {
      toast.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-400 to-green-600 bg-opacity-30">
      <motion.div
        className="p-10 bg-gray-100 shadow-md rounded-xl w-full max-w-lg"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Title level={2} className="text-center mb-6 text-green-800 font-sans">
          Sign In
        </Title>
        <RoomForm
          onSubmit={onSubmit}
          resolver={zodResolver(logiValidationSchema)}
        >
          <RoomInput
            name="email"
            label="Your Email"
            placeholder="Enter your email"
            className="text-green-600 font-semibold text-base"
          />
          <div className="relative text-green-600 h-[85px]">
            <RoomInput
              name="password"
              label="Your Password"
              placeholder="Enter your password"
              type={showPassword ? "text" : "password"}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 bottom-[30px] cursor-pointer"
            >
              {showPassword ? (
                <FaEye size={20} className="text-green-600" />
              ) : (
                <FaEyeSlash size={20} className="text-green-600" />
              )}
            </span>
          </div>
          <Button
            type="primary"
            htmlType="submit"
            className="mt-6 bg-green-600 hover:bg-green-700"
          >
            Log In
          </Button>
        </RoomForm>
        <div className="mt-7 flex-wrap flex sm:gap-6">
          <p>Don't have an account yet?</p>
          <Link to="/register" className="text-green-600 font-semibold">
            Create an Account
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;

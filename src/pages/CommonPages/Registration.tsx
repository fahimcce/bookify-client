/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button } from "antd";
import { motion } from "framer-motion";
import { Typography } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import RoomForm from "../../components/forms/RoomForm";
import RoomInput from "../../components/forms/RoomInput";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import RoomTextArea from "../../components/forms/RoomTextArea";
import { ReagistrationSCema } from "../../schemaValidation/LoginRegistrationValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegisterMutation } from "../../redux/features/auth/auth.api";
import { TResponse } from "../../types/ResponseType";
import { toast } from "sonner";
import { regiResponse } from "../../types/registerResponse";

const { Title } = Typography;

const Registration = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [registration] = useRegisterMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    const id = toast.loading("Creating your account...");
    try {
      const res = (await registration(values)) as TResponse<regiResponse>;
      if (res.error) {
        toast.error(res.error?.data?.message, { id });
      } else {
        toast.success(res?.data?.message, { id, duration: 5000 });
        navigate("/login");
      }
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  return (
    <div className="py-10 min-h-screen flex items-center justify-center bg-gradient-to-br from-green-300 to-blue-500 bg-opacity-30">
      <motion.div
        className="p-10 bg-gray-50 shadow-md rounded-lg w-full max-w-lg"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Title level={2} className="text-center mb-6 text-teal-600">
          Create Account
        </Title>
        <RoomForm
          onSubmit={onSubmit}
          resolver={zodResolver(ReagistrationSCema)}
        >
          <RoomInput
            name="name"
            label="Full Name"
            placeholder="Enter your name"
          />

          <div className="relative text-teal-500 h-[85px]">
            <RoomInput
              name="password"
              label="Choose a Password"
              placeholder="Password"
              type={showPassword ? "text" : "password"}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 bottom-[30px] cursor-pointer"
            >
              {showPassword ? (
                <FaEye size={20} className="text-teal-500" />
              ) : (
                <FaEyeSlash size={20} className="text-teal-500" />
              )}
            </span>
          </div>

          <RoomInput
            name="email"
            label="Email Address"
            placeholder="example@mail.com"
          />
          <RoomInput
            name="phone"
            label="Contact Number"
            type="number"
            placeholder="Your phone number"
            className="remove-control"
          />
          <RoomTextArea
            name="address"
            label="Home Address"
            placeholder="Enter your address"
          ></RoomTextArea>

          <Button
            type="primary"
            htmlType="submit"
            block
            className="bg-teal-600 hover:bg-teal-700 transition duration-200"
          >
            Sign Up
          </Button>
        </RoomForm>

        <div className="mt-7 flex-wrap flex sm:gap-6">
          <p>Already have an account?</p>
          <Link to="/login" className="text-teal-500 font-semibold">
            Login Here
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Registration;

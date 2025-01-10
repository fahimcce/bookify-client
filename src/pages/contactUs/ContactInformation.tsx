import React from "react";
import { MailOutlined, PhoneOutlined, HomeOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";

const ContactInformation: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="p-10 bg-gray-800 text-gray-800 shadow-lg  backdrop-blur-md"
    >
      <h2 className="text-3xl text-white font-semibold mb-6 text-center">
        Get in Touch with Us
      </h2>
      <div className="flex items-center mb-4">
        <MailOutlined className="text-white text-2xl mr-3" />
        <p className="text-lg text-white font-medium">fahimcce@gmail.com</p>
      </div>
      <div className="flex items-center mb-4">
        <PhoneOutlined className="text-white text-2xl mr-3" />
        <p className="text-lg text-white font-medium">+8801868-174998</p>
      </div>
      <div className="flex items-center">
        <HomeOutlined className="text-white text-2xl mr-3" />
        <p className="text-lg font-medium text-white">
          Panslaish, Chittagong, Bangladesh
        </p>
      </div>
    </motion.div>
  );
};

export default ContactInformation;

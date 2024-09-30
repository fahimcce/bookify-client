import React from "react";
import { MailOutlined, PhoneOutlined, HomeOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";

const ContactInformation: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="p-10 bg-gradient-to-br from-green-400 to-blue-500 text-gray-800 shadow-lg rounded-lg backdrop-blur-md"
    >
      <h2 className="text-4xl font-extrabold mb-6 text-center">
        Get in Touch with Us
      </h2>
      <div className="flex items-center mb-4">
        <MailOutlined className="text-white text-2xl mr-3" />
        <p className="text-lg font-medium">contact@yourdomain.com</p>
      </div>
      <div className="flex items-center mb-4">
        <PhoneOutlined className="text-white text-2xl mr-3" />
        <p className="text-lg font-medium">+1 (234) 567-8900</p>
      </div>
      <div className="flex items-center">
        <HomeOutlined className="text-white text-2xl mr-3" />
        <p className="text-lg font-medium">456 New Address, City, Country</p>
      </div>
    </motion.div>
  );
};

export default ContactInformation;

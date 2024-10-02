import React from "react";
import { motion } from "framer-motion";

const OurVision: React.FC = () => {
  return (
    <motion.div
      className="bg-[#00152a] text-white py-20 px-10"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <div className="container mx-auto text-center">
        <h2 className="text-5xl font-extrabold mb-8">Our Vision</h2>
        <p className="text-xl leading-relaxed">
          At Bookify, we envision a world where booking meeting rooms is a
          seamless experience. Our goal is to create a powerful yet
          user-friendly platform that empowers organizations to enhance
          collaboration and creativity.
        </p>
        <p className="text-xl leading-relaxed mt-5">
          We are committed to transforming every meeting into a productive
          experience. By offering state-of-the-art facilities, an intuitive user
          interface, and a reliable infrastructure, we aim to meet the evolving
          needs of modern workplaces. Our dedication to continuous improvement
          ensures that we consistently deliver exceptional value to our users.
        </p>
      </div>
    </motion.div>
  );
};

export default OurVision;

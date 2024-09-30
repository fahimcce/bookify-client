import React from "react";
import { motion } from "framer-motion";

const OurVision: React.FC = () => {
  return (
    <motion.div
      className="bg-green-600 text-white py-20 px-10"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <div className="container mx-auto text-center">
        <h2 className="text-5xl font-extrabold mb-8">Our Vision</h2>
        <p className="text-xl leading-relaxed">
          At Roomify, we envision a world where booking meeting rooms is a
          hassle-free experience. Our aim is to create a powerful yet
          easy-to-navigate platform that supports organizations in fostering
          collaboration and creativity.
        </p>
        <p className="text-xl leading-relaxed mt-5">
          We are dedicated to transforming every meeting into a meaningful
          experience. By providing state-of-the-art facilities, an intuitive
          user experience, and a dependable infrastructure, we strive to meet
          the dynamic demands of contemporary workplaces. Our commitment to
          ongoing development ensures that we stay ahead in delivering
          exceptional value to our users.
        </p>
      </div>
    </motion.div>
  );
};

export default OurVision;

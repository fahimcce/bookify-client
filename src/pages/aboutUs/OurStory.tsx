import React from "react";
import { motion } from "framer-motion";
import aboutStory from "../../assets/contact.jpg";

const OurStory: React.FC = () => {
  return (
    <motion.div
      className="bg-gradient-to-r from-teal-400 to-blue-600 text-gray-800 py-24 px-10"
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7 }}
    >
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-10">
          <div className="flex-1">
            <h2 className="text-5xl font-extrabold mb-5">Our Narrative</h2>
            <div className="space-y-5 text-lg leading-relaxed">
              <p>
                Established on the belief that an inspiring environment nurtures
                innovation, Bookify embarked on its mission to revolutionize the
                management of meeting spaces. Founded in 2020, we recognized the
                challenges organizations face in efficiently booking and
                utilizing these areas. Since then, we have evolved into a
                versatile platform designed to address the ever-changing needs
                of today’s workplaces.
              </p>
              <p>
                Our mission is centered around providing a seamless user
                experience that prioritizes flexibility and trustworthiness. We
                acknowledge that every organization encounters distinct
                obstacles, and we deliver customized solutions to ensure that
                every meeting space is optimized for success.
              </p>
              <p>
                As we continue to grow, our commitment remains steadfast in
                delivering outstanding service and innovative solutions. We
                envision a future where every meeting is effortless, empowering
                teams to collaborate freely. Join us in redefining the standards
                for meeting spaces and enhancing the way the world connects and
                collaborates.
              </p>
            </div>
          </div>
          <div className="flex justify-center">
            <img
              src={aboutStory} // Replace with the actual image path
              alt="Our Story Image"
              className="lg:max-w-[450px] rounded-lg shadow-xl w-full object-cover"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default OurStory;

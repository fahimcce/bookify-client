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
                Founded on the principle that the right environment fosters
                creativity, Roomify began its journey to reshape how
                organizations manage their meeting spaces. Established in 2020,
                we identified the complexities involved in booking and utilizing
                meeting areas effectively. Since then, we’ve transformed into a
                dynamic platform designed to meet the evolving needs of modern
                workplaces.
              </p>
              <p>
                Our mission revolves around creating a user-friendly experience
                that emphasizes adaptability and reliability. We understand that
                each organization has its unique challenges, and we offer
                tailored solutions to ensure that every meeting space is
                optimized for success.
              </p>
              <p>
                As we continue to expand, our focus remains on delivering
                exceptional service and innovative solutions. We envision a
                future where every meeting is seamless, empowering teams to
                collaborate without limitations. Join us as we redefine the
                standards for meeting spaces and enhance how the world connects
                and collaborates.
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

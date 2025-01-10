import React from "react";
import { motion } from "framer-motion";
import {
  FaHeadset,
  FaNetworkWired,
  FaMapPin,
  FaTools,
  FaClock,
  FaChair,
} from "react-icons/fa";
import Section from "../../components/common/Section";

const WhyChooseUs: React.FC = () => {
  const features = [
    {
      icon: <FaClock className="text-5xl mb-4" />,
      title: "Flexible Scheduling",
      description:
        "Easily reserve meeting rooms by the hour or for longer durations, giving you total flexibility.",
    },
    {
      icon: <FaHeadset className="text-5xl mb-4" />,
      title: "24/7 Assistance",
      description:
        "Our round-the-clock support team is always available to assist you with any concerns.",
    },
    {
      icon: <FaNetworkWired className="text-5xl mb-4" />,
      title: "Fast Connectivity",
      description:
        "Enjoy high-speed internet access across all rooms for seamless collaboration.",
    },
    {
      icon: <FaMapPin className=" text-5xl mb-4" />,
      title: "Prime Locations",
      description:
        "Located at key spots in the city, our rooms offer the convenience of easy access.",
    },
    {
      icon: <FaChair className=" text-5xl mb-4" />,
      title: "Premium Facilities",
      description:
        "Our spaces are furnished with top-tier amenities including ergonomic seating and high-end technology.",
    },
    {
      icon: <FaTools className=" text-5xl mb-4" />,
      title: "Customizable Spaces",
      description:
        "Tailor the room setup to fit your event needs with our adjustable layout options.",
    },
  ];

  return (
    <Section className="py-24 px-4 md:px-0 bg-gradient-to-br from-green-100 via-white to-green-50">
      <div className="mx-auto text-center max-w-screen-lg">
        <motion.h2
          className="text-4xl font-bold mb-12"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Why Choose Our Spaces?
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col items-center">
                {feature.icon}
                <h3 className="text-2xl font-semibold mt-4 mb-3">
                  {feature.title}
                </h3>
                <p className="text-center">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default WhyChooseUs;

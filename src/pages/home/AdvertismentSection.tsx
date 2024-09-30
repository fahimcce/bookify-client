import { motion } from "framer-motion";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CalendarOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import Section from "../../components/common/Section";

const services = [
  {
    icon: (
      <CheckCircleOutlined style={{ fontSize: "3rem", color: "#00A6FB" }} />
    ), // Changed icon color
    title: "Live Room Tracking",
    description:
      "Access real-time updates on room availability, ensuring a hassle-free experience.",
  },
  {
    icon: (
      <ClockCircleOutlined style={{ fontSize: "3rem", color: "#00A6FB" }} />
    ),
    title: "Quick Reservations",
    description:
      "Reserve rooms instantly with a few clicks, and receive immediate confirmations.",
  },
  {
    icon: <CalendarOutlined style={{ fontSize: "3rem", color: "#00A6FB" }} />,
    title: "Dynamic Rescheduling",
    description:
      "Change your bookings effortlessly with our easy-to-use rescheduling features.",
  },
  {
    icon: <PhoneOutlined style={{ fontSize: "3rem", color: "#00A6FB" }} />,
    title: "Round-the-Clock Assistance",
    description:
      "Our support team is available 24/7 to assist with any inquiries or issues.",
  },
];

const ServiceAdvertisement = () => {
  return (
    <Section className="py-16 bg-gradient-to-r from-blue-50 via-blue-100 to-blue-50 px-6 text-center">
      {" "}
      {/* Updated background and padding */}
      <div className="container mx-auto">
        <motion.h2
          className="text-3xl md:text-5xl font-extrabold text-blue-900 mb-10" // Changed text size and color
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          Discover Our Unique Benefits
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {" "}
          {/* Changed grid layout and gap */}
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="p-8 bg-white rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300" // Changed card styling
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.2 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="flex justify-center mb-5">{service.icon}</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                {service.title}
              </h3>{" "}
              {/* Changed title style */}
              <p className="text-gray-600">{service.description}</p>{" "}
              {/* Changed text color */}
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default ServiceAdvertisement;

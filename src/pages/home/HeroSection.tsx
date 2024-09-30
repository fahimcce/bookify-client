import { Button } from "antd";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import banner from "../../assets/images/heroBg.jpg";

const HeroSection = () => {
  return (
    <div
      className="relative flex items-center h-full md:h-[80vh] bg-cover bg-fixed bg-center"
      style={{
        backgroundImage: `linear-gradient(to bottom right, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4)), url(${banner})`,
      }} // Updated with a new image path and gradient overlay
    >
      <div className="container mx-auto z-10">
        <div className="p-4 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              className="text-white space-y-6 md:px-10 text-left"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              <h1 className="sm:text-3xl md:text-5xl font-bold font-poppins leading-tight">
                Book Your Meeting Room Effortlessly
              </h1>
              <p className="text-base md:text-lg font-roboto text-gray-300 max-w-[90%]">
                Find the perfect space for your meetings with just a few clicks.
                Our platform offers instant room availability and hassle-free
                reservations for any event or gathering.
              </p>
              <Link to="/meeting-rooms">
                <Button
                  type="primary"
                  className="mt-6 py-2 px-6 bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md"
                  size="large"
                >
                  Reserve Now
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

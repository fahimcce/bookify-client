import React from "react";
import ContactForm from "./ContactForm";
import ContactInformation from "./ContactInformation";
import {
  FacebookOutlined,
  TwitterOutlined,
  LinkedinOutlined,
  InstagramOutlined,
} from "@ant-design/icons";

const ContactUs: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 to-indigo-600">
      <div
        className="py-24 flex items-center justify-center"
        style={{
          background: "url(contact.jpg)",
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <ContactInformation />
          <ContactForm />
        </div>
      </div>
      <div className="container mx-auto bg-gray-900 bg-opacity-90 mt-16 py-12 rounded-lg shadow-lg">
        <div className="mt-5 p-4 text-center">
          <h2 className="text-2xl lg:text-4xl font-extrabold mb-6 text-white">
            Stay Connected with Us
          </h2>
          <div className="flex justify-center space-x-8 mt-8">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-3xl hover:text-blue-500 transition"
            >
              <FacebookOutlined />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-3xl hover:text-blue-400 transition"
            >
              <TwitterOutlined />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-3xl hover:text-blue-600 transition"
            >
              <LinkedinOutlined />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-3xl hover:text-pink-400 transition"
            >
              <InstagramOutlined />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;

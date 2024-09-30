import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";

const RoomifyFooter = () => {
  const thisYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-bold mb-4">Get in Touch</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <FaEnvelope className="mr-2" />
                <span>contact@roomify.com</span>
              </li>
              <li className="flex items-center">
                <FaPhoneAlt className="mr-2" />
                <span>+880-123-456-7890</span>
              </li>
              <li className="flex items-center">
                <FaMapMarkerAlt className="mr-2" />
                <span>456 Office Rd, Dhaka, Bangladesh</span>
              </li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div className="text-center">
            <h3 className="text-lg font-bold mb-4">Connect With Us</h3>
            <div className="flex justify-center space-x-6">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl hover:text-blue-600 transition"
              >
                <FaFacebook />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl hover:text-blue-400 transition"
              >
                <FaTwitter />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl hover:text-pink-500 transition"
              >
                <FaInstagram />
              </a>
            </div>
          </div>

          {/* Additional Links */}
          <div className="text-right">
            <h3 className="text-lg font-bold mb-4">Useful Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/privacy-policy"
                  className="hover:text-gray-400 transition"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms-of-service"
                  className="hover:text-gray-400 transition"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          © {thisYear} Roomify. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default RoomifyFooter;

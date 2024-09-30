import React from "react";
import { motion } from "framer-motion";

const teamMembers = [
  {
    name: "Amina Rahman",
    role: "Chief Executive Officer",
    imageUrl: "https://i.postimg.cc/sx6VyXZZ/girl.jpg",
    bio: "Amina is a visionary leader dedicated to driving innovation and growth. With over 10 years of experience in the tech industry, she inspires her team to achieve excellence.",
  },
  {
    name: "Rafiq Ahmed",
    role: "Chief Technology Officer",
    imageUrl: "https://i.postimg.cc/bw2zcqYs/man.jpg",
    bio: "Rafiq is the technical mastermind behind Roomify. His expertise in software development and AI ensures that our platform remains cutting-edge and efficient.",
  },
  {
    name: "Nabila Sultana",
    role: "Head of Marketing",
    imageUrl: "https://i.ibb.co/TqLjCmy/jhon-dow.jpg",
    bio: "Nabila is a creative force in marketing, adept at crafting compelling brand stories. She focuses on connecting with customers through innovative campaigns.",
  },
  {
    name: "Shakib Hossain",
    role: "Operations Director",
    imageUrl: "https://i.ibb.co/p1ytD5N/me.png",
    bio: "Shakib oversees Roomify’s daily operations, ensuring efficiency and effectiveness. His keen eye for detail helps optimize our processes for better outcomes.",
  },
  {
    name: "Sara Khan",
    role: "Customer Support Lead",
    imageUrl: "https://i.ibb.co/cDpRQrp/authorimg-1.jpg",
    bio: "Sara is committed to enhancing the user experience. She leads a dedicated support team, focusing on providing timely solutions and exceptional service.",
  },
  {
    name: "Farhan Islam",
    role: "Chief Product Officer",
    imageUrl: "https://i.ibb.co/311WBhy/images.jpg",
    bio: "Farhan drives product innovation at Roomify. He combines user insights with design thinking to create features that meet the evolving needs of our clients.",
  },
];

const MeetTheTeam: React.FC = () => {
  return (
    <div className="py-24 px-6 bg-gradient-to-br from-gray-100 to-gray-300">
      <div className="container mx-auto text-center">
        <h2 className="text-5xl font-extrabold text-gray-800 mb-12">
          Get to Know Our Team
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              className="bg-white p-8 rounded-lg shadow-lg transform transition-all duration-300 hover:shadow-xl hover:scale-105"
              whileHover={{ scale: 1.05 }}
            >
              <img
                src={member.imageUrl}
                alt={member.name}
                className="w-28 h-28 rounded-full mx-auto mb-4 object-cover border-4 border-gray-300"
              />
              <h3 className="text-2xl font-bold text-gray-800">
                {member.name}
              </h3>
              <p className="text-lg text-blue-600 mb-2">{member.role}</p>
              <p className="text-gray-700">{member.bio}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MeetTheTeam;

import React from "react";
import { motion } from "framer-motion";

const teamMembers = [
  {
    name: "Forhadul Islam Fahim",
    role: "Managing Director",
    imageUrl: "https://i.ibb.co.com/gvspQ9D/c-1.jpg",
    bio: "Fahim is a passionate leader dedicated to transforming the tech industry in Bangladesh. With a strong background in business development, she drives strategic initiatives at Bookify.",
  },
  {
    name: "Md Tanvir Patwary",
    role: "Head of Technology",
    imageUrl: "https://i.ibb.co.com/ySZnD9k/tanvir.jpg",
    bio: "Tanvir is a tech enthusiast with extensive experience in software architecture. He ensures that Bookify leverages the latest technologies for an exceptional user experience.",
  },
  {
    name: "Delwar Hossain",
    role: "Director of Communications",
    imageUrl: "https://i.ibb.co.com/pJSgprD/dell.jpg",
    bio: "Delwar is a communication specialist focused on building strong relationships with customers and stakeholders. Her innovative strategies enhance Bookify's brand presence.",
  },
  {
    name: "Abu Bakkar Riki",
    role: "Operations Manager",
    imageUrl: "https://i.ibb.co.com/347sNhS/riki.jpg",
    bio: "Bakkar manages the operational activities at Bookify, ensuring smooth processes and efficiency. His analytical skills contribute to the overall success of the company.",
  },
  {
    name: "Abdullah Al mamun",
    role: "Lead Customer Success Manager",
    imageUrl: "https://i.ibb.co.com/Z870YM6/mamun.jpg",
    bio: "Mamun is dedicated to ensuring client satisfaction. She leads the customer success team to provide timely support and build lasting relationships with users.",
  },
  {
    name: "Sabit Hossain",
    role: "Product Development Manager",
    imageUrl: "https://i.ibb.co.com/0ZXK8fK/sabit.jpg",
    bio: "Sabit spearheads product development at Bookify, collaborating with teams to innovate and enhance our offerings based on user feedback and market trends.",
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

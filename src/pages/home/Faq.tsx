import React, { useState } from "react";
import { motion } from "framer-motion";
import Section from "../../components/common/Section";
import faqImage from "../../assets/images/executive.jpg";

const faqs = [
  {
    question: "How do I reserve a space?",
    answer:
      "Reserving a space is easy! Just pick the room, select a time, and confirm. An email will be sent with your booking details.",
  },
  {
    question: "Can I make changes or cancel my reservation?",
    answer:
      'Yes, you can update or cancel your reservation up to 24 hours before the event. Head to "My Reservations" in your account to make changes.',
  },
  {
    question: "What features are included with the rooms?",
    answer:
      "Our rooms come with high-speed Wi-Fi, projectors, and conference equipment. Additional features can be found in each room’s details.",
  },
  {
    question: "How can I check the availability of rooms?",
    answer:
      "Room availability is displayed in real-time. Navigate to your desired room to view available slots instantly.",
  },
  {
    question: "Is there a minimum reservation duration?",
    answer:
      "The minimum reservation time is usually one hour, but this can vary by room. Specific details will be shown during booking.",
  },
  {
    question: "How is the pricing calculated?",
    answer:
      "Pricing varies based on room features and time. Discounts are available for longer bookings, and the price is shown when selecting a room.",
  },
];

const Faq: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <Section className="py-24 px-6 bg-gradient-to-b from-gray-50 to-gray-200">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-extrabold text-center mb-16 text-purple-900">
          Your Questions, Answered
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                onClick={() => toggleFAQ(index)}
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 250 }}
              >
                <h3 className="text-2xl font-medium text-purple-800 cursor-pointer flex justify-between items-center">
                  {faq.question}
                  <span className="text-purple-600">
                    {activeIndex === index ? "-" : "+"}
                  </span>
                </h3>
                {activeIndex === index && (
                  <motion.p
                    className="mt-4 text-gray-700 leading-relaxed"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.4 }}
                  >
                    {faq.answer}
                  </motion.p>
                )}
              </motion.div>
            ))}
          </div>
          <div>
            <img
              src={faqImage}
              alt="Frequently Asked Questions"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Faq;

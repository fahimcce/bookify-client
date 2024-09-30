import React from "react";
import { Form, Input, Button } from "antd";
import { motion } from "framer-motion";

const ContactForm: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="p-10 bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-md rounded-lg backdrop-blur-lg"
    >
      <h2 className="text-4xl font-extrabold mb-6 text-center">
        Reach Out to Us
      </h2>
      <Form layout="vertical">
        <Form.Item label="Full Name" name="name">
          <Input
            placeholder="Enter Your Full Name"
            className="rounded-md shadow-inner"
          />
        </Form.Item>
        <Form.Item label="Email Address" name="email">
          <Input
            type="email"
            placeholder="Enter Your Email"
            className="rounded-md shadow-inner"
          />
        </Form.Item>
        <Form.Item label="Subject of Inquiry" name="subject">
          <Input
            placeholder="What is this about?"
            className="rounded-md shadow-inner"
          />
        </Form.Item>
        <Form.Item label="Your Message" name="message">
          <Input.TextArea
            rows={5}
            placeholder="Type your message here..."
            className="rounded-md shadow-inner"
          />
        </Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 transition duration-300"
        >
          Submit Your Message
        </Button>
      </Form>
    </motion.div>
  );
};

export default ContactForm;

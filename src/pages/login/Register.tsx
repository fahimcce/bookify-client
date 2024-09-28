import { useEffect, useState } from "react";
import { useSignUpMutation } from "../../redux/features/auth/authApi";
import { toast } from "react-toastify";
import { Form, Input, Button } from "antd";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import "./Register.css"; // Optional for additional custom styles
import Swal from "sweetalert2";

const Register = () => {
  const [signUp, { isLoading, isSuccess, isError, error }] =
    useSignUpMutation();
  const navigate = useNavigate(); // Initialize navigate hook

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });

  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });

  // Handling form changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Form validation logic
  const validateForm = () => {
    const errors = {
      name: "",
      email: "",
      password: "",
      phone: "",
      address: "",
    };

    if (!form.name) errors.name = "Name is required";
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email))
      errors.email = "Invalid email";
    if (!form.password || form.password.length < 6)
      errors.password = "Password must be at least 6 characters";
    if (!form.phone) errors.phone = "Phone number is required";
    if (!form.address) errors.address = "Address is required";

    setFormErrors(errors);
    return Object.values(errors).every((error) => error === "");
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (validateForm()) {
      await signUp(form);
    }
  };

  // Handle side effects based on API response
  useEffect(() => {
    if (isSuccess) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Registration SuccessFully,Go to Login",
        showConfirmButton: false,
        timer: 1500,
      }); // Success notification

      // Reset form
      setForm({
        name: "",
        email: "",
        password: "",
        phone: "",
        address: "",
      });

      // Redirect to login page after 2 seconds
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }

    if (isError && error) {
      toast.error(error?.data?.message || "Sign-up failed"); // Error notification
    }
  }, [isSuccess, isError, error, navigate]);

  return (
    <div className="register-container">
      <h2 className="register-heading">Sign Up</h2>
      <Form layout="vertical" className="register-form" onFinish={handleSubmit}>
        {/* Name Field */}
        <Form.Item
          label="Name"
          validateStatus={formErrors.name ? "error" : ""}
          help={formErrors.name}
        >
          <Input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={form.name}
            onChange={handleChange}
          />
        </Form.Item>

        {/* Email Field */}
        <Form.Item
          label="Email"
          validateStatus={formErrors.email ? "error" : ""}
          help={formErrors.email}
        >
          <Input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
          />
        </Form.Item>

        {/* Password Field */}
        <Form.Item
          label="Password"
          validateStatus={formErrors.password ? "error" : ""}
          help={formErrors.password}
        >
          <Input.Password
            name="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={handleChange}
          />
        </Form.Item>

        {/* Phone Field */}
        <Form.Item
          label="Phone"
          validateStatus={formErrors.phone ? "error" : ""}
          help={formErrors.phone}
        >
          <Input
            type="text"
            name="phone"
            placeholder="Enter your phone number"
            value={form.phone}
            onChange={handleChange}
          />
        </Form.Item>

        {/* Address Field */}
        <Form.Item
          label="Address"
          validateStatus={formErrors.address ? "error" : ""}
          help={formErrors.address}
        >
          <Input
            type="text"
            name="address"
            placeholder="Enter your address"
            value={form.address}
            onChange={handleChange}
          />
        </Form.Item>

        {/* Submit Button */}
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={isLoading}
            className="register-button"
          >
            {isLoading ? "Signing Up..." : "Sign Up"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;

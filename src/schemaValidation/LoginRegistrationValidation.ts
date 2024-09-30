import { z } from "zod";

export const ReagistrationSCema = z.object({
  name: z.string({ required_error: "Name is Required" }).min(1, "Name is required"),
  email: z.string({ invalid_type_error: "Please provide an valid email", required_error: "Email is required" }).email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phone: z
    .string({ required_error: "Phone number is required" })
    .min(11, "Phone number must be at least 11 digits")
    .regex(/^\d+$/, "Phone number must be numeric"),
  address: z.string().min(1, "Address is required"),
});

export const logiValidationSchema = z.object({
  email: z.string({ invalid_type_error: "Valid Email please", required_error: "Email Required" }).email(),
  password: z.string({ required_error: "Please provide password" }),
});

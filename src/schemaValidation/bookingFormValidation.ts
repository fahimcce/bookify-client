import { z } from "zod";

// Define the Zod schema
export const bookingValidation = z.object({
  address: z.string().min(10, "Address should more than 10 character"), // Ensure address is a non-empty string
  phone: z.number(),
  room: z.string().min(1, "Room is required"), // Ensure room is a non-empty string
  slots: z.array(z.string({ required_error: "required" })), // Ensure slots is an array of strings
  user: z.string().min(1, "User is required"), // Ensure user is a non-empty string
});

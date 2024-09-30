import { z } from "zod";

export const createRoomValidation = z.object({
  name: z
    .string({
      required_error: "Room name is required",
    })
    .max(100, "Room name cannot exceed 100 characters"),

  roomNo: z
    .string({
      required_error: "Room number is required",
    })
    .refine((value) => !isNaN(parseInt(value)), {
      message: "Room number must be a valid number",
    })
    .transform((value) => parseInt(value)),

  floorNo: z
    .string({
      required_error: "Floor number is required",
    })
    .refine((value) => !isNaN(parseInt(value)), {
      message: "Floor number must be a valid number",
    })
    .transform((value) => parseInt(value)),

  capacity: z
    .string({
      required_error: "Capacity is required",
    })
    .refine((value) => !isNaN(parseInt(value)), {
      message: "Capacity must be a valid number",
    })
    .transform((value) => parseInt(value)),

  pricePerSlot: z
    .string({
      required_error: "Price per slot is required",
    })
    .refine((value) => !isNaN(parseInt(value)), {
      message: "Price per slot must be a valid number",
    })
    .transform((value) => parseInt(value)),

  amenities: z
    .array(z.string(), {
      required_error: "At least one amenity is required",
    })
    .min(1, "At least one amenity is required"),

  imageUrl: z.array(z.string().url("Invalid image URL")).optional(),
});

export const updateRoomValidation = z.object({
  name: z
    .string({
      required_error: "Room name is required",
    })
    .max(100, "Room name cannot exceed 100 characters")
    .optional(), // Make the field optional

  roomNo: z
    .string({
      required_error: "Room number is required",
    })
    .refine((value) => !isNaN(parseInt(value)), {
      message: "Room number must be a valid number",
    })
    .transform((value) => parseInt(value))
    .optional(), // Make the field optional

  floorNo: z
    .string({
      required_error: "Floor number is required",
    })
    .refine((value) => !isNaN(parseInt(value)), {
      message: "Floor number must be a valid number",
    })
    .transform((value) => parseInt(value))
    .optional(), // Make the field optional

  capacity: z
    .string({
      required_error: "Capacity is required",
    })
    .refine((value) => !isNaN(parseInt(value)), {
      message: "Capacity must be a valid number",
    })
    .transform((value) => parseInt(value))
    .optional(), // Make the field optional

  pricePerSlot: z
    .string({
      required_error: "Price per slot is required",
    })
    .refine((value) => !isNaN(parseInt(value)), {
      message: "Price per slot must be a valid number",
    })
    .transform((value) => parseInt(value))
    .optional(), // Make the field optional

  amenities: z
    .array(z.string(), {
      required_error: "At least one amenity is required",
    })
    .min(1, "At least one amenity is required")
    .optional(), // Make the field optional

  imageUrl: z.array(z.string().url("Invalid image URL")).optional(), // Already optional
});

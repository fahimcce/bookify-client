import { z } from "zod";
export const slotValidationSchema = z.object({
  room: z
    .string({
      required_error: "Room ID is required",
    })
    .regex(/^[a-f\d]{24}$/i, "Room ID must be a valid MongoDB ObjectId"),

  startTime: z
    .string({
      required_error: "Start time is required",
    })
    .regex(/^([0-1]\d|2[0-3]):([0-5]\d)$/, "Start time must be in HH:mm format"),

  endTime: z
    .string({
      required_error: "End time is required",
    })
    .regex(/^([0-1]\d|2[0-3]):([0-5]\d)$/, "End time must be in HH:mm format"),
});

export default slotValidationSchema;

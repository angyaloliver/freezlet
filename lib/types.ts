import { z } from "zod";

export const SetSchema = z.object({
  name: z.string().min(1, {
    message: "name must be at least 1 character",
  }),
  description: z.string().optional(),
});

export type Set = z.infer<typeof SetSchema>;

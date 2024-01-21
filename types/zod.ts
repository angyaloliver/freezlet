import { z } from "zod";

export const SetSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, {
    message: "name must be at least 1 character",
  }),
  description: z.string().optional(),
});

export type Set = z.infer<typeof SetSchema>;

export const CardSchema = z.object({
  front: z.string().min(1, {
    message: "front must be at least 1 character",
  }),
  back: z.string().min(1, {
    message: "back must be at least 1 character",
  }),
  image_url: z.string().optional(),
});

export type Card = z.infer<typeof CardSchema>;

import { z } from "zod";

export const SetSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, {
    message: "name must be at least 1 character",
  }),
  description: z.string().optional(),
});

export type Set = z.infer<typeof SetSchema>;

export const CardSchema = z.object({
  id: z.string().optional(),
  front: z.string(),
  back: z.string(),
  set_id: z.string(),
  image_url: z.string().optional(),
});

export type Card = z.infer<typeof CardSchema>;

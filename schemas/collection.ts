import { z } from "zod";

const collectionSchema = z.object({
  title: z.string().min(1, "Title is required").max(255, "Title is too long"),
  description: z.string(),
  tags: z.array(z.string()),
  links: z
    .array(z.string().url("Each link must be a valid URL"))
    .min(1, "At least one link is required"),
});

export default collectionSchema;

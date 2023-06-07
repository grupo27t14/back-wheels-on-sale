import { z } from "zod";

const commentSchema = z.object({
  id: z.string(),
  description: z.string(),
  create_date: z.string(),
  car: z.string(),
  user: z.string(),
});

const commentSchemaRequest = commentSchema.pick({
  description: true,
});

const commentSchemaResponse = z.array(commentSchema);

export { commentSchema, commentSchemaRequest, commentSchemaResponse };

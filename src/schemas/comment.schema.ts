import { z } from "zod";
const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  is_admin: z.boolean().default(false),
  is_seller: z.boolean().default(false),
});

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

const commentSchemaResponse = commentSchema.extend({});

export { commentSchema, commentSchemaRequest, commentSchemaResponse };

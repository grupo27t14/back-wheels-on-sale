import { z } from "zod";

const commentSchema = z.object({
  id: z.string(),
  description: z.string(),
  create_date: z.string(),
  car: z.string(),
  user: z.string(),
});

const commentSchemaResponse = z.object({
  id: z.string(),
  description: z.string(),
  create_date: z.string().or(z.instanceof(Date)),
  car: z.object({
    id: z.string(),
    brand: z.string(),
    model: z.string(),
    year: z.string(),
    fuel: z.string(),
    km: z.string(),
    color: z.string(),
    fipe: z.string(),
    price: z.string(),
    description: z.string(),
    is_published: z.boolean(),
    created_at: z.date(),
    is_promo: z.boolean(),
  }),
  user: z.object({
    id: z.string(),
    name: z.string(),
    email: z.string().email(),
    is_admin: z.boolean(),
    is_seller: z.boolean(),
    created_at: z.date(),
    avatar_bg: z.string(),
  }),
});

const commentSchemaRequest = commentSchema.pick({
  description: true,
});

const commentsSchema = commentSchemaResponse.omit({
  car: true,
});

const commentsSchemaResponse = z.array(commentsSchema);

export {
  commentSchema,
  commentSchemaRequest,
  commentSchemaResponse,
  commentsSchemaResponse,
};

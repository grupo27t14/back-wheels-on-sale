import { z } from "zod";

const carSchema = z.object({
  id: z.string(),
  brand: z.string(),
  model: z.string(),
  spec: z.string(),
  year: z.string(),
  fuel: z.string(),
  km: z.number(),
  color: z.string(),
  fipe: z.string(),
  price: z.number(),
  is_promo: z.boolean(),
  description: z.string(),
  is_published: z.boolean().default(false),
});

const carSchemaRes = carSchema.extend({
  created_at: z.date(),
  user: z.object({
    id: z.string(),
    name: z.string(),
    avatar_bg: z.string(),
    personalInformation: z
      .object({
        description: z.string().nullable().optional(),
      })
      .optional(),
  }),
  images: z
    .object({
      id: z.string(),
      url: z.string(),
    })
    .array()
    .optional(),
});

const carSchemaRequest = carSchema.omit({
  id: true,
  is_promo: true,
});

const carSchemaUpdate = carSchemaRequest.partial();

const carsSchemaResponse = z.array(carSchemaRes);

export {
  carSchema,
  carSchemaRequest,
  carSchemaUpdate,
  carsSchemaResponse,
  carSchemaRes,
};

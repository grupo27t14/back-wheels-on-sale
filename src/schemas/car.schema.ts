import { z } from "zod";

const carSchema = z.object({
  id: z.string(),
  brand: z.string(),
  model: z.string(),
  year: z.string(),
  fuel: z.string(),
  km: z.string(),
  color: z.string(),
  fipe: z.string(),
  price: z.string(),
  is_promo: z.boolean(),
  description: z.string(),
  is_published: z.boolean(),
});

const carSchemaRes = carSchema.extend({
  created_at: z.date(),
  user: z.object({
    id: z.string(),
    name: z.string(),
  }),
  images: z.object({
    id: z.string(),
    url: z.string()
  }).array().optional()
});

const carSchemaRequest = carSchema.omit({
  id: true,
  is_promo: true,
  is_published: true
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

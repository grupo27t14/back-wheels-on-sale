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
  description: z.string(),
});

const carSchemaRequest = carSchema.omit({
  id: true,
});

const carSchemaUpdate = carSchemaRequest.partial();

const carsSchemaResponse = z.array(carSchema);

export { carSchema, carSchemaRequest, carSchemaUpdate, carsSchemaResponse };

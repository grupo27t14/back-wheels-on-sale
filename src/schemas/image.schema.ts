import { z } from "zod";

const imageSchema = z.object({
  id: z.string(),
  url: z.string(),
});

const imageSchemaRes = imageSchema;

const imageSchemaReq = z.object({
  image: z.unknown(),
});

const imagesSchemaRes = z.array(imageSchemaRes);

export { imageSchema, imageSchemaRes, imageSchemaReq, imagesSchemaRes };

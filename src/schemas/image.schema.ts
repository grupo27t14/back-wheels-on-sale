import { z } from "zod";

const imageSchema = z.object({
  id: z.string(),
  url: z.string(),
});

const imageSchemaRes = imageSchema

const imageSchemaReq = imageSchema.omit({
    id: true,
  });

const imagesSchemaRes = z.array(imageSchemaRes);

export { imageSchema, imageSchemaRes, imageSchemaReq, imagesSchemaRes };

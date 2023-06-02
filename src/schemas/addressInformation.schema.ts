import { z } from "zod";

const addressInformationSchemaReq = z.object({
  cep: z.string(),
  state: z.string(),
  city: z.string(),
  street: z.string(),
  number: z.string(),
  complement: z.string(),
});

const addressInformationSchemaRes = addressInformationSchemaReq.extend({
  id: z.string(),
});

const addressInformationSchemaUpdate = addressInformationSchemaReq.partial()

export { addressInformationSchemaReq, addressInformationSchemaRes, addressInformationSchemaUpdate };

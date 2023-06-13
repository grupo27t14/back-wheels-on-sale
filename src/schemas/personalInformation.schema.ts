import { z } from "zod";

const personalInformationSchemaReq = z.object({
  cpf: z.string(),
  phone: z.string(),
  birth_date: z.string(),
  description: z.string().nullish().optional(),
});

const personalInformationSchemaRes = personalInformationSchemaReq.extend({
  id: z.string(),
});

const personalInformationSchemaUpdate = personalInformationSchemaReq.partial();

export {
  personalInformationSchemaReq,
  personalInformationSchemaRes,
  personalInformationSchemaUpdate,
};

import { z } from "zod";

const personalInformationSchema = z.object({
  cpf: z.string(),
  phone: z.string(),
  birth_date: z.string(),
  description: z.string(),
});

const addressInformationSchema = z.object({
  cep: z.string(),
  state: z.string(),
  city: z.string(),
  street: z.string(),
  number: z.string(),
  complement: z.string(),
});

const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  is_admin: z.boolean().default(false),
  is_seller: z.boolean().default(false),
  personalInformationData: personalInformationSchema.optional(),
  addressInformationData: addressInformationSchema.optional(),
});

const userSchemaRequest = userSchema.omit({
  id: true,
});

const userSchemaUpdate = userSchema
  .omit({
    id: true,
  })
  .partial();

const userSchemaResponse = userSchema
  .omit({
    password: true,
  })
  .extend({
    personalInformation: personalInformationSchema.optional(),
    addressInformation: addressInformationSchema.optional(),
  });

const usersResponse = z.array(userSchemaResponse)

const usersManySchema = z.array(userSchema);

export {
  userSchema,
  userSchemaRequest,
  userSchemaUpdate,
  userSchemaResponse,
  usersManySchema,
  usersResponse
};

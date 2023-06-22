import { z } from "zod";
import {
  personalInformationSchemaReq,
  personalInformationSchemaRes,
  personalInformationSchemaUpdate,
} from "./personalInformation.schema";
import {
  addressInformationSchemaReq,
  addressInformationSchemaRes,
  addressInformationSchemaUpdate,
} from "./addressInformation.schema";

const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  is_admin: z.boolean().default(false),
  is_seller: z.boolean().default(false),
  avatar_bg: z.string(),
  reset_password: z.string().nullable()
});

const userSchemaRes = userSchema
  .extend({
    created_at: z.date(),
    personalInformation: personalInformationSchemaRes,
    addressInformation: addressInformationSchemaRes,
  })
  .omit({
    password: true,
    reset_password: true,
  });

const userSchemaReq = userSchema
  .extend({
    personalInformation: personalInformationSchemaReq,
    addressInformation: addressInformationSchemaReq,
  })
  .omit({
    id: true,
    reset_password: true,
  });

const userSchemaUpdate = userSchema
  .extend({
    personalInformation: personalInformationSchemaUpdate,
    addressInformation: addressInformationSchemaUpdate,
  })
  .omit({
    id: true,
    reset_password: true,
  })
  .partial();

const usersSchemaRes = z.array(userSchemaRes);

const emailReq = z.object({
  to: z.string(),
  subject: z.string(),
  text: z.string()
})

export { userSchemaRes, userSchemaReq, userSchemaUpdate, usersSchemaRes, userSchema, emailReq };

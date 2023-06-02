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
});

const userSchemaRes = userSchema
  .extend({
    personalInformation: personalInformationSchemaRes,
    addressInformation: addressInformationSchemaRes,
  })
  .omit({
    password: true,
  });

const userSchemaReq = userSchema
  .extend({
    personalInformation: personalInformationSchemaReq,
    addressInformation: addressInformationSchemaReq,
  })
  .omit({
    id: true,
  });

const userSchemaUpdate = userSchema
  .extend({
    personalInformation: personalInformationSchemaUpdate,
    addressInformation: addressInformationSchemaUpdate,
  })
  .omit({
    id: true,
  })
  .partial();

const usersSchemaRes = z.array(userSchemaRes);

export { userSchemaRes, userSchemaReq, userSchemaUpdate, usersSchemaRes };

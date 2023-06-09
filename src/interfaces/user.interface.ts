import { z } from "zod";
import {
  userSchemaRes,
  userSchemaReq,
  usersSchemaRes,
  emailReq,
} from "../schemas/user.schema";
import { DeepPartial } from "typeorm";

type TUserReq = z.infer<typeof userSchemaReq>;
type TUserRes = z.infer<typeof userSchemaRes>;
type TUsersRes = z.infer<typeof usersSchemaRes>;
type TUserUpdate = DeepPartial<TUserReq>;
type TEmailReq = z.infer<typeof emailReq>

export { TUserReq, TUserRes, TUserUpdate, TUsersRes, TEmailReq };

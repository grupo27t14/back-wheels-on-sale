import { z } from "zod";
import {
  userSchema,
  userSchemaRequest,
  userSchemaResponse,
  usersManySchema,
  usersResponse,
} from "../schemas/user.schema";
import { DeepPartial } from "typeorm";

type TUser = z.infer<typeof userSchema>;
type TUserRequest = z.infer<typeof userSchemaRequest>;
type TUserResponse = z.infer<typeof userSchemaResponse>;
type TUsersMany = z.infer<typeof usersResponse>;
type TUserUpdateRequest = DeepPartial<TUserRequest>;

export { TUser, TUserRequest, TUserResponse, TUserUpdateRequest, TUsersMany };

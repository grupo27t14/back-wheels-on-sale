import { Router } from "express";
import {
  createUserController,
  deleteUserController,
  findUserController,
  listUserController,
  updateUserController,
} from "../controllers/user.controller";
import {
  ensureAuthMiddleware,
  ensureDataIsValidMiddleware,
  ensureIsOwnerMiddlewareUser,
} from "../middlewares";
import { userSchemaRequest, userSchemaUpdate } from "../schemas/user.schema";
import { ensureUuidIsValidMiddlewareUser } from "../middlewares/ensureUuidIsValid.middleware";

const userRoutes = Router();

userRoutes.post(
  "",
  ensureDataIsValidMiddleware(userSchemaRequest),
  createUserController
);

userRoutes.get("", listUserController);

userRoutes.get("/:id", ensureUuidIsValidMiddlewareUser, findUserController);

userRoutes.patch(
  "/:id",
  ensureAuthMiddleware,
  ensureUuidIsValidMiddlewareUser,
  ensureIsOwnerMiddlewareUser,
  ensureDataIsValidMiddleware(userSchemaUpdate),
  updateUserController
);
userRoutes.delete(
  "/:id",
  ensureAuthMiddleware,
  ensureUuidIsValidMiddlewareUser,
  ensureIsOwnerMiddlewareUser,
  deleteUserController
);

export { userRoutes };

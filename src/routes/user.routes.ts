import { Router } from "express";
import {
  createUserController,
  deleteUserController,
  listUserController,
  updateUserController,
} from "../controllers/user.controller";
import {
  ensureAuthMiddleware,
  ensureDataIsValidMiddleware,
  ensureIsOwnerMiddlewareUser,
} from "../middlewares";
import { userSchemaRequest, userSchemaUpdate } from "../schemas/user.schema";

const userRoutes = Router();

userRoutes.get("", listUserController);
userRoutes.post(
  "",
  ensureDataIsValidMiddleware(userSchemaRequest),
  createUserController
);
userRoutes.patch(
  "/:id",
  ensureAuthMiddleware,
  ensureIsOwnerMiddlewareUser,
  ensureDataIsValidMiddleware(userSchemaUpdate),
  updateUserController
);
userRoutes.delete(
  "/:id",
  ensureAuthMiddleware,
  ensureIsOwnerMiddlewareUser,
  deleteUserController
);

export { userRoutes };

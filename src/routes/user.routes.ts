import { Router } from "express";
import {
  createUserController,
  deleteUserController,
  findUserController,
  listUserCarsController,
  listUserController,
  updateUserController,
} from "../controllers/user.controller";
import {
  ensureAuthMiddleware,
  ensureDataIsValidMiddleware,
  ensureIsOwnerMiddlewareUser,
  ensureUuidIsValidMiddleware,
} from "../middlewares";
import { userSchemaReq, userSchemaUpdate } from "../schemas/user.schema";

const userRoutes = Router();

userRoutes.post(
  "",
  ensureDataIsValidMiddleware(userSchemaReq),
  createUserController
);

userRoutes.get("", listUserController);

userRoutes.get("/:id", ensureUuidIsValidMiddleware, findUserController);

userRoutes.get("/:id/cars", listUserCarsController);

userRoutes.patch(
  "/:id",
  ensureAuthMiddleware,
  ensureUuidIsValidMiddleware,
  ensureIsOwnerMiddlewareUser,
  ensureDataIsValidMiddleware(userSchemaUpdate),
  updateUserController
);
userRoutes.delete(
  "/:id",
  ensureAuthMiddleware,
  ensureUuidIsValidMiddleware,
  ensureIsOwnerMiddlewareUser,
  deleteUserController
);

export { userRoutes };

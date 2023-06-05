import { Router } from "express";
import { createTokenController } from "../controllers/login.controller";
import { loginSchema } from "../schemas/login.schema";
import { ensureDataIsValidMiddleware } from "../middlewares";

const loginRoutes = Router();

loginRoutes.post(
  "",
  ensureDataIsValidMiddleware(loginSchema),
  createTokenController
);

export { loginRoutes };

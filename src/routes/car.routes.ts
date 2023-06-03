import { Router } from "express";
import { ensureAuthMiddleware, ensureDataIsValidMiddleware } from "../middlewares";
import {
  createCarController,
  deleteCarController,
  listCarController,
  updateCarController,
} from "../controllers/car.controller";
import { carSchemaRequest, carSchemaUpdate } from "../schemas/car.schema";
import { ensureIsOwnerMiddlewareCar } from "../middlewares/ensureIsOwnerCar.middleware";
import { ensureUuidIsValidMiddlewareUser } from "../middlewares/ensureUuidIsValid.middleware";

const carRoutes = Router();

carRoutes.get("", listCarController); //deve ser feita a lista pelo ID e não pelo token

carRoutes.use(ensureAuthMiddleware);

carRoutes.post("", ensureDataIsValidMiddleware(carSchemaRequest),createCarController);
carRoutes.patch("/:id", ensureUuidIsValidMiddlewareUser, ensureIsOwnerMiddlewareCar, ensureDataIsValidMiddleware(carSchemaUpdate), updateCarController);
carRoutes.delete("/:id", ensureUuidIsValidMiddlewareUser, ensureIsOwnerMiddlewareCar, deleteCarController);

export { carRoutes };

import { Router } from "express";
import {
  ensureAuthMiddleware,
  ensureDataIsValidMiddleware,
} from "../middlewares";
import {
  createCarController,
  deleteCarController,
  findCarController,
  listCarsController,
  updateCarController,
} from "../controllers/car.controller";
import { carSchemaRequest, carSchemaUpdate } from "../schemas/car.schema";
import { ensureIsOwnerMiddlewareCar } from "../middlewares/ensureIsOwnerCar.middleware";
import { ensureUuidIsValidMiddlewareUser } from "../middlewares/ensureUuidIsValid.middleware";

const carRoutes = Router();

carRoutes.get("", listCarsController);
carRoutes.get("/:id", ensureUuidIsValidMiddlewareUser, findCarController);

carRoutes.use(ensureAuthMiddleware);

carRoutes.post(
  "",
  ensureDataIsValidMiddleware(carSchemaRequest),
  createCarController
);
carRoutes.patch(
  "/:id",
  ensureUuidIsValidMiddlewareUser,
  ensureIsOwnerMiddlewareCar,
  ensureDataIsValidMiddleware(carSchemaUpdate),
  updateCarController
);
carRoutes.delete(
  "/:id",
  ensureUuidIsValidMiddlewareUser,
  ensureIsOwnerMiddlewareCar,
  deleteCarController
);

export { carRoutes };

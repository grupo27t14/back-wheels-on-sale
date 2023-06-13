import { Router } from "express";
import {
  ensureAuthMiddleware,
  ensureDataIsValidMiddleware,
  ensureIsOwnerMiddlewareCar,
  ensureUuidIsValidMiddleware,
} from "../middlewares";
import {
  createCarController,
  deleteCarController,
  findCarController,
  listCarsController,
  updateCarController,
} from "../controllers/car.controller";
import { carSchemaRequest, carSchemaUpdate } from "../schemas/car.schema";

const carRoutes = Router();

carRoutes.get("", listCarsController);
carRoutes.get("/:id", ensureUuidIsValidMiddleware, findCarController);

carRoutes.use(ensureAuthMiddleware);

carRoutes.post(
  "",
  // ensureIsOwnerMiddlewareCar,
  ensureDataIsValidMiddleware(carSchemaRequest),
  createCarController
);
carRoutes.patch(
  "/:id",
  ensureUuidIsValidMiddleware,
  ensureIsOwnerMiddlewareCar,
  ensureDataIsValidMiddleware(carSchemaUpdate),
  updateCarController
);
carRoutes.delete(
  "/:id",
  ensureUuidIsValidMiddleware,
  ensureIsOwnerMiddlewareCar,
  deleteCarController
);

export { carRoutes };

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

const carRoutes = Router();

carRoutes.use(ensureAuthMiddleware);

carRoutes.get("", listCarController);
carRoutes.post("", ensureDataIsValidMiddleware(carSchemaRequest),createCarController);
carRoutes.patch("/:id", ensureIsOwnerMiddlewareCar, ensureDataIsValidMiddleware(carSchemaUpdate), updateCarController);
carRoutes.delete("/:id", ensureIsOwnerMiddlewareCar, deleteCarController);

export { carRoutes };

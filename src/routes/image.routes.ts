import { Router } from "express";
import {
  createImageController,
  deleteImageController,
  listImagesController,
} from "../controllers/image.controller";
import {
  ensureAuthMiddleware,
  ensureDataIsValidMiddleware,
  ensureIsOwnerMiddlewareCar,
  ensureUuidIsValidMiddleware,
} from "../middlewares";
import { imageSchemaReq } from "../schemas/image.schema";

const imageRoutes = Router();

imageRoutes.use(ensureAuthMiddleware);

imageRoutes.post(
  "/:id",
  ensureUuidIsValidMiddleware,
  ensureIsOwnerMiddlewareCar,
  ensureDataIsValidMiddleware(imageSchemaReq),
  createImageController
);
imageRoutes.get(
  "/:id",
  ensureUuidIsValidMiddleware,
  ensureIsOwnerMiddlewareCar,
  listImagesController
);
imageRoutes.delete(
  "/:imageId/car/:carId",
  ensureIsOwnerMiddlewareCar,
  deleteImageController
);

export { imageRoutes };

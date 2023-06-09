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


imageRoutes.get(
  "/:id",
  ensureUuidIsValidMiddleware,
  listImagesController
);

imageRoutes.use(ensureAuthMiddleware);

imageRoutes.post(
  "/:id",
  ensureUuidIsValidMiddleware,
  ensureIsOwnerMiddlewareCar,
  ensureDataIsValidMiddleware(imageSchemaReq),
  createImageController
);

imageRoutes.delete(
  "/:imageId/car/:carId",
  ensureIsOwnerMiddlewareCar,
  deleteImageController
);

export { imageRoutes };

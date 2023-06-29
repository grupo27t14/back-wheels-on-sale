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
import { upload } from "../utils/multerConfig";

const imageRoutes = Router();

imageRoutes.get("/:id", ensureUuidIsValidMiddleware, listImagesController);

imageRoutes.use(ensureAuthMiddleware);

imageRoutes.post(
  "/:id",
  ensureUuidIsValidMiddleware,
  ensureIsOwnerMiddlewareCar,
  ensureDataIsValidMiddleware(imageSchemaReq),
  upload.single("image"),
  createImageController
);

imageRoutes.delete(
  "/:imageId/car/:id",
  ensureIsOwnerMiddlewareCar,
  deleteImageController
);

export { imageRoutes };

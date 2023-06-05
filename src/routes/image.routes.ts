import { Router } from "express";
import {
  createImageController,
  deleteImageController,
  listImagesController,
} from "../controllers/image.controller";

const imageRoutes = Router();

imageRoutes.post("/:id", createImageController);
imageRoutes.get("/:id/image", listImagesController);
imageRoutes.delete("/:imageId/car/:carId", deleteImageController);

export { imageRoutes };

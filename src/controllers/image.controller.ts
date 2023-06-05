import { Request, Response } from "express";
import { createImageService } from "../services/image/createImage.service";
import { deleteImageService } from "../services/image/deleteImage.service";
import { listImagesService } from "../services/image/listImage.service";

const createImageController = async (req: Request, res: Response) => {
  const carId = req.params.id;
  const { url } = req.body;
  const image = await createImageService(url, carId);

  return res.json(image);
};

const listImagesController = async (req: Request, res: Response) => {
  const carId = req.params.id;
  const images = await listImagesService(carId);

  return res.json(images);
};

const deleteImageController = async (req: Request, res: Response) => {
  const { carId, imageId } = req.params;

  await deleteImageService(carId, imageId);

  return res.status(204).send();
};

export { createImageController, listImagesController, deleteImageController };

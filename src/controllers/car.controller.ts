import { Request, Response } from "express";
import { createCarService } from "../services/car/createCar.service";
import { deleteCarService } from "../services/car/deleteCar.service";
import { updateCarService } from "../services/car/updateCar.service";
import { listCarsService } from "../services/car/listCar.service";

const createCarController = async (req: Request, res: Response) => {
  const userId = res.locals.userId;

  const newCar = await createCarService(req.body, userId);

  return res.status(201).json(newCar);
};

const listCarController = async (req: Request, res: Response) => {
  const car = await listCarsService();

  return res.json(car);
};

const updateCarController = async (req: Request, res: Response) => {
  const carId = req.params.id;
  const updatedValues = req.body;
  const updateCar = await updateCarService(updatedValues, carId);

  return res.json(updateCar);
};

const deleteCarController = async (req: Request, res: Response) => {
  const carId = req.params.id;
  await deleteCarService(carId);

  res.status(204).send();
};

export {
  createCarController,
  listCarController,
  updateCarController,
  deleteCarController,
};

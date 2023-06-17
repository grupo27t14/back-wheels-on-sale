import { Request, Response } from "express";
import { createCarService } from "../services/car/createCar.service";
import { deleteCarService } from "../services/car/deleteCar.service";
import { updateCarService } from "../services/car/updateCar.service";
import { listCarsService } from "../services/car/listCar.service";
import findCarService from "../services/car/getCarById.service";

const createCarController = async (req: Request, res: Response) => {
  const userId = res.locals.userId;

  const newCar = await createCarService(req.body, userId);

  return res.status(201).json(newCar);
};

const listCarsController = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 12;
  const baseUrl = req.get("host") as string;
  const filter = {
    where: {
      brand: req.query.brand as string | null,
      model: req.query.model as string | null,
      color: req.query.color as string | null,
      year: req.query.year as string | null,
    },
    sort: req.query.sort as string[] | null,
    minmax: {
      km: req.query.km as string | null,
      price: req.query.price as string | null,
    },
  };

  const cars = await listCarsService(page, limit, baseUrl, filter);

  return res.status(200).json(cars);
};

const findCarController = async (req: Request, res: Response) => {
  const carId = req.params.id;
  const car = await findCarService(carId);

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
  listCarsController,
  updateCarController,
  deleteCarController,
  findCarController,
};

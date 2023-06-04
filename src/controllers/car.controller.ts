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

// const listCarsController = async (req: Request, res: Response) => {
//   const car = await listCarsService();

//   return res.json(car);
// };

const listCarsController = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 5; // Valor padrão de limite é 10, mas pode ser alterado conforme necessário

  const { cars, totalCount } = await listCarsService(page, limit);

  const totalPages = Math.ceil(totalCount / limit);
  const nextPage = page < totalPages ? page + 1 : null;
  const previousPage = page > 1 ? page - 1 : null;

  const baseUrl = "http://localhost:3000/";
  const route = "cars";

  const nextPageUrl = nextPage ? `${baseUrl}${route}?page=${nextPage}&limit=${limit}` : null;
  const previousPageUrl = previousPage ? `${baseUrl}${route}?page=${previousPage}&limit=${limit}` : null;

  return res.status(200).json({
    cars,
    totalCount,
    currentPage: page,
    totalPages,
    nextPage: nextPageUrl,
    previousPage: previousPageUrl,
  });
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

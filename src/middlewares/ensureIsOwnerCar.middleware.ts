import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { Car } from "../entities/car.entitie";

const ensureIsOwnerMiddlewareCar = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const carsRepositoy = AppDataSource.getRepository(Car);

  const carId: string = req.params.id;
  const userId: string = res.locals.userId;

  const car = await carsRepositoy.findOne({
    where: {
      id: carId,
    },
    relations: {
      user: true,
    },
  });

  if (!car) {
    return res.status(404).json({
      message: "Car not found",
    });
  }

  if (car.user.id !== userId) {
    return res.status(403).json({
      message: "You don`t have permissions",
    });
  }

  return next();
};

export { ensureIsOwnerMiddlewareCar };

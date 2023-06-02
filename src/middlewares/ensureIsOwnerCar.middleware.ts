import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { Car } from "../entities/car.entitie";

const isValidUUID = (uuid: string): boolean => {
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
};

const ensureIsOwnerMiddlewareCar = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const carsRepositoy = AppDataSource.getRepository(Car);

  const carId: string = req.params.id;
  const userId: string = res.locals.userId;

  if (!isValidUUID(carId)) {
    return res.status(400).json({
      message: "Invalid car ID",
    });
  }

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

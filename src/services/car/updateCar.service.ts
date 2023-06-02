import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import AppError from "../../errors/AppErrors";
import { TCarResponse } from "../../interfaces/car.interface";
import { Car } from "../../entities/car.entitie";
import { carSchema } from "../../schemas/car.schema";

const updateCarService = async (
  data: any,
  carId: string
): Promise<TCarResponse> => {
  const carsRepository: Repository<Car> = AppDataSource.getRepository(Car);
  const oldCar: Car | null = await carsRepository.findOneBy({ id: carId });

  if (!oldCar || oldCar.id !== carId) {
    throw new AppError("Car not found", 404);
  }

  const newCarData = carsRepository.create({
    ...(oldCar || {}),
    ...data,
  });

  await carsRepository.save(newCarData);

  return carSchema.parse(newCarData);
};

export { updateCarService };

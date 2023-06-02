import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import AppError from "../../errors/AppErrors";
import { Car } from "../../entities/car.entitie";

const deleteCarService = async (carId: string): Promise<void> => {
  const carsRepository: Repository<Car> = AppDataSource.getRepository(Car);
  const car: Car | null = await carsRepository.findOneBy({ id: carId });

  if (!car) {
    throw new AppError("Car not found", 404);
  }

  await carsRepository.remove(car);
};

export { deleteCarService };

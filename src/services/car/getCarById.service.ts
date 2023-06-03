import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import AppError from "../../errors/AppErrors";
import { Car } from "../../entities/car.entitie";
import { carSchemaRes } from "../../schemas/car.schema";

const findCarService = async (id: string): Promise<any> => {
  const carRepository: Repository<Car> = AppDataSource.getRepository(Car);

  const car = await carRepository.findOne({
    where: {
      id: id,
    },
    relations: {
      user: true,
    },
  });

  if (!car) {
    throw new AppError("Car not found", 404);
  }

  const carRes = carSchemaRes.parse(car);

  return carRes;
};

export default findCarService;

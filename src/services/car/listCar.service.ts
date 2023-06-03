import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Car } from "../../entities/car.entitie";
import { TCarsResponse } from "../../interfaces/car.interface";
import { carsSchemaResponse } from "../../schemas/car.schema";

const listCarsService = async (): Promise<TCarsResponse> => {
  const carsRepository: Repository<Car> = AppDataSource.getRepository(Car);

  const cars: Car[] = await carsRepository.find({
    relations: { user: true }
  });

  const res = carsSchemaResponse.parse(cars)

  return res
};

export { listCarsService };

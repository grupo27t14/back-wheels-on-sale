import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Car } from "../../entities/car.entitie";
import { IPaginationCars } from "../../interfaces/car.interface";
import { carsSchemaResponse } from "../../schemas/car.schema";
import { setPagination } from "../../utils/setPagination";

const listCarsService = async (
  page: number,
  limit: number,
  baseUrl: string
): Promise<IPaginationCars> => {
  const carsRepository: Repository<Car> = AppDataSource.getRepository(Car);

  const skip = (page - 1) * limit;
  const [cars, totalCount] = await carsRepository.findAndCount({
    relations: { user: true },
    take: limit,
    skip: skip,
  });

  const parsedCars = carsSchemaResponse.parse(cars);
  const rota = `/cars`;

  return setPagination(totalCount, limit, page, baseUrl + rota, parsedCars);
};

export { listCarsService };

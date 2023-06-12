import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Car } from "../../entities/car.entitie";
import { IPaginationCars } from "../../interfaces/car.interface";
import { carsSchemaResponse } from "../../schemas/car.schema";
import { setPagination } from "../../utils/setPagination";
import { log } from "console";

interface iFilter {
  brand: string | null;
  model: string | null;
  color: string | null;
  year: string | null;
  sort?: string[] | null;
}

const getOrderAndSort = (filter: iFilter) => {
  let order = {};
  if (filter.sort) {
    const sorter = typeof filter.sort == "string" ? [filter.sort] : filter.sort;
    sorter.forEach((value) => {
      const data: string[] = value.split("-");
      const [k, v] = data;
      order = {
        ...order,
        [k]: v,
      };
    });
    delete filter.sort;
  }

  let where = {};
  for (const [key, value] of Object.entries(filter)) {
    if (value != undefined) {
      where = {
        ...where,
        [key]: value,
      };
    }
  }

  return { order, where };
};

const listCarsService = async (
  page: number,
  limit: number,
  baseUrl: string,
  filter: iFilter
): Promise<IPaginationCars> => {
  const carsRepository: Repository<Car> = AppDataSource.getRepository(Car);

  const { order, where } = getOrderAndSort(filter);

  const skip = (page - 1) * limit;
  const [cars, totalCount] = await carsRepository.findAndCount({
    relations: ["user", "images"],
    take: limit,
    skip: skip,
    where: where,
    order: order,
  });

  console.log(cars);
  

  const parsedCars = carsSchemaResponse.parse(cars);
  const rota = `/cars`;

  return setPagination(
    totalCount,
    limit,
    page,
    baseUrl + rota,
    parsedCars,
    where,
    order
  );
};

export { listCarsService };

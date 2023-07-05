import { Repository, Between, LessThan, MoreThan } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Car } from "../../entities/car.entitie";
import { IPaginationCars } from "../../interfaces/car.interface";
import { carsSchemaResponse } from "../../schemas/car.schema";
import { setPagination } from "../../utils/setPagination";
import AppError from "../../errors/AppErrors";

interface iFilter {
  where: {
    brand: string | null;
    model: string | null;
    color: string | null;
    year: string | null;
    is_published: string | boolean | null;
  };
  sort?: string[] | null;
  minmax: {
    km?: string | null;
    price?: string | null;
  };
}

const getOrderAndSort = (filter: iFilter) => {
  if (filter.where.is_published) {
    filter.where.is_published =
      filter.where.is_published === "false" ? false : true;
  }

  let order = {};
  if (filter.sort) {
    const sorter = typeof filter.sort == "string" ? [filter.sort] : filter.sort;
    sorter.forEach((value) => {
      const data: string[] = value.split("-");
      const [key, val] = data;
      order = {
        ...order,
        [key]: val,
      };
    });
  }

  let where = {};
  for (const [key, value] of Object.entries(filter.where)) {
    if (value != undefined) {
      where = {
        ...where,
        [key]: value,
      };
    }
  }

  if (Object.keys(filter.minmax).length) {
    for (const [key, value] of Object.entries(filter.minmax)) {
      if (value && key) {
        let values = value?.split("_");
        const min = Number(values[0]);
        const max = Number(values[1]);
        if (min > max) throw new AppError("Invalid Min/Max query", 400);
        if (min && max) {
          where = {
            ...where,
            [key]: Between(min, max),
          };
        } else if (min && !max) {
          where = {
            ...where,
            [key]: MoreThan(min),
          };
        } else if (!min && max) {
          where = {
            ...where,
            [key]: LessThan(max),
          };
        }
      }
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

  const parsedCars = carsSchemaResponse.parse(cars);
  const rota = `/car`;

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

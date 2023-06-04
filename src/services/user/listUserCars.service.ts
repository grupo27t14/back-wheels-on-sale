import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entitie";
import { TUserRes } from "../../interfaces/user.interface";
import AppError from "../../errors/AppErrors";
import { Car } from "../../entities/car.entitie";
import { carsSchemaResponse } from "../../schemas/car.schema";
import { IPaginationCars } from "../../interfaces/car.interface";
import { setPagination } from "../../utils/setPagination";

const listUserCarsService = async (
  userId: string,
  page: number,
  limit: number,
  baseUrl: string
): Promise<IPaginationCars> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);
  const carsRepository: Repository<Car> = AppDataSource.getRepository(Car);

  const user = (await userRepository.findOne({
    where: { id: userId },
  })) as TUserRes;

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const skip = (page - 1) * limit;

  const [cars, totalCount] = await carsRepository
    .createQueryBuilder("car")
    .leftJoinAndSelect("car.user", "user")
    .where("user.id = :userId", { userId })
    .skip(skip)
    .take(limit)
    .getManyAndCount();

  const parsedCars = carsSchemaResponse.parse(cars);
  const rota = `user/${userId}/cars`;

    return setPagination(totalCount, limit, page, baseUrl + rota, parsedCars);
};

export default listUserCarsService;

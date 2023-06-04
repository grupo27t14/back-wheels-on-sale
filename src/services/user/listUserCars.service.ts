import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entitie";
import { TUserRes } from "../../interfaces/user.interface";
import { userSchemaRes } from "../../schemas/user.schema";
import AppError from "../../errors/AppErrors";
import { Car } from "../../entities/car.entitie";
import { carsSchemaResponse } from "../../schemas/car.schema";
import { TCarResponse } from "../../interfaces/car.interface";

// const listUserCarsService = async (userId: string): Promise<TCarResponse[]> => {
//   const userRepository: Repository<User> = AppDataSource.getRepository(User);
//   const carsRepository: Repository<Car> = AppDataSource.getRepository(Car);

//   const user = (await userRepository.findOneBy({
//     id: userId,
//   })) as TUserRes;

//   if (!user) {
//     throw new AppError("User not found", 404);
//   }

//   const cars: Car[] = await carsRepository.find({
//     where: {
//       user: user,
//     },
//     relations: {
//       user: true,
//     },
//   });

//   return carsSchemaResponse.parse(cars);
// };

// export default listUserCarsService;


const listUserCarsService = async (userId: string, page: number, limit: number): Promise<{ cars: TCarResponse[], totalCount: number }> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);
  const carsRepository: Repository<Car> = AppDataSource.getRepository(Car);

  const user = await userRepository.findOne({
    where: { id: userId },
  });
  
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

  return { cars: parsedCars, totalCount };
};

export default listUserCarsService;

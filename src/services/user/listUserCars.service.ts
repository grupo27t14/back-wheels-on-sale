import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entitie";
import { TUserRes } from "../../interfaces/user.interface";
import { userSchemaRes } from "../../schemas/user.schema";
import AppError from "../../errors/AppErrors";
import { Car } from "../../entities/car.entitie";
import { carsSchemaResponse } from "../../schemas/car.schema";
import { TCarResponse } from "../../interfaces/car.interface";

const listUserCarsService = async (userId: string): Promise<TCarResponse[]> => {
    const userRepository: Repository<User> = AppDataSource.getRepository(User);
    const carsRepository: Repository<Car> = AppDataSource.getRepository(Car)

    const user = await userRepository.findOneBy({
        id: userId,
      }) as TUserRes;

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const cars: Car[] = await carsRepository.find({
    where: {
      user: user,
    }, relations: {
      user: true
    }
  });

  return carsSchemaResponse.parse(cars);
};

export default listUserCarsService;

import { Repository } from "typeorm";
import AppError from "../../errors/AppErrors";
import { AppDataSource } from "../../data-source";
import { Car } from "../../entities/car.entitie";
import { User } from "../../entities/user.entitie";
import { TCarsResponse } from "../../interfaces/car.interface";
import { carsSchemaResponse } from "../../schemas/car.schema";

const listCarsService = async (userId: string): Promise<TCarsResponse> => {
  const carsRepository: Repository<Car> = AppDataSource.getRepository(Car);
  const usersRepository: Repository<User> = AppDataSource.getRepository(User);

  const user: User | null = await usersRepository.findOneBy({
    id: userId,
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const cars: Car[] = await carsRepository.find({
    where: {
      user: user,
    },
  });

  return carsSchemaResponse.parse(cars);
};

export { listCarsService };

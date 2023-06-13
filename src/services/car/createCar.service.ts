import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import AppError from "../../errors/AppErrors";
import { User } from "../../entities/user.entitie";
import { carSchema, carSchemaRes } from "../../schemas/car.schema";
import { Car } from "../../entities/car.entitie";
import { TCarRequest, TCarResponse } from "../../interfaces/car.interface";

const createCarService = async (
  data: TCarRequest,
  userId: string
): Promise<TCarResponse> => {
  const carsRepository: Repository<Car> = AppDataSource.getRepository(Car);
  const usersRepository: Repository<User> = AppDataSource.getRepository(User);

  const user: User | null = await usersRepository.findOne({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  if (!user.is_seller) {
    throw new AppError("Only vendors can sell cars", 403);
  }

  const car: Car = carsRepository.create({
    ...data,
    user,
  });

  await carsRepository.save(car);

  return carSchemaRes.parse(car);
};

export { createCarService };

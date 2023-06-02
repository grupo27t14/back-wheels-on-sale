import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import AppError from "../../errors/AppErrors";
import { User } from "../../entities/user.entitie";
import { carSchema } from "../../schemas/car.schema";
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

  const newDate = new Date();

  const car: Car = carsRepository.create({
    ...data,
    user,
    // brand: data.brand ? data.brand : "",
    // model: data.model ? data.model : "",
    // year: data.year ? data.year : "",
    // fuel: data.fuel ? data.fuel : "",
    // km: data.km ? data.km : "",
    // color: data.color ? data.color : "",
    // fipe: data.fipe ? data.fipe : "",
    // price: data.price ? data.price : "",
    // description: data.description ? data.description : "",
    published: newDate,
  });

  await carsRepository.save(car);

  return carSchema.parse(car);
};

export { createCarService };

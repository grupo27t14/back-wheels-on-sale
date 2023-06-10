import { Images } from "../../entities/images.entitie";
import { AppDataSource } from "../../data-source";
import { Car } from "../../entities/car.entitie";
import AppError from "../../errors/AppErrors";
import { TImageResponse } from "../../interfaces/image.interface";
import { imageSchemaRes } from "../../schemas/image.schema";

const createImageService = async (url: string, carId: string): Promise<TImageResponse> => {
  const imageRepository = AppDataSource.getRepository(Images);
  const carRepository = AppDataSource.getRepository(Car);

  const car = await carRepository.findOne({
    where: { id: carId },
  });

  if (!car) {
    throw new AppError("Car not found", 404);
  }

  const image = new Images();
  image.url = url;
  image.car = car;

  await imageRepository.save(image);

  return imageSchemaRes.parse(image);
};

export { createImageService };

import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Images } from "../../entities/images.entitie";
import AppError from "../../errors/AppErrors";
import { TImageResponse } from "../../interfaces/image.interface";
import { imagesSchemaRes } from "../../schemas/image.schema";

const listImagesService = async (carId: string): Promise<TImageResponse[]> => {
  const imageRepository: Repository<Images> = AppDataSource.getRepository(Images);

  const images = await imageRepository.find({
    where: { car: { id: carId } },
  });

  if (!images || images.length === 0) {
    throw new AppError("Can not find any car images", 404);
  }

  const parsedImages = imagesSchemaRes.parse(images)
  return parsedImages;
};

export { listImagesService };

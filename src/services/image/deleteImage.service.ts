import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import AppError from "../../errors/AppErrors";
import { Images } from "../../entities/images.entitie";


const deleteImageService = async (carId: string, imageId: string): Promise<void> => {
    const imageRepository: Repository<Images> = AppDataSource.getRepository(Images);

    const image: Images | null = await imageRepository.findOne({
      where: { id: imageId, car: { id: carId } }
    });

  if (!image) {
    throw new AppError("Image not find", 404);
  }

  await imageRepository.remove(image);
};

export { deleteImageService };

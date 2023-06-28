import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Car } from "../../entities/car.entitie";
import { Comment } from "../../entities/coment.entitie";
import AppError from "../../errors/AppErrors";
import { commentsSchemaRes } from "../../schemas/comment.schema";

const listCommentsService = async (carId: string) => {
  const commentRepository = AppDataSource.getRepository(Comment);
  const carsRepository: Repository<Car> = AppDataSource.getRepository(Car);
  const car: Car | null = await carsRepository.findOneBy({ id: carId });

  if (!car) {
    throw new AppError("Car not found", 404);
  }

  const comments = await commentRepository.find({
    where: {
      car: { id: carId },
    },
    relations: ["user", "car"],
  });

  return commentsSchemaRes.parse(comments);
};

export { listCommentsService };

import { AppDataSource } from "../../data-source";
import { Car } from "../../entities/car.entitie";
import { Comment } from "../../entities/coment.entitie";
import { User } from "../../entities/user.entitie";
import AppError from "../../errors/AppErrors";
import { TcommentReq } from "../../interfaces/comment.interface";

const createCommentService = async (
  commentData: TcommentReq,
  carId: string,
  userId: string
) => {
  const commentRepository = AppDataSource.getRepository(Comment);
  const carRepository = AppDataSource.getRepository(Car);
  const userRepository = AppDataSource.getRepository(User);

  const car = await carRepository.findOne({
    where: {
      id: carId,
    },
  });
  if (!car) {
    throw new AppError("Car not found", 404);
  }

  const user = await userRepository.findOne({
    where: {
      id: userId,
    },
  });
  if (!user) {
    throw new AppError("User not found", 404);
  }

  const newComment = commentRepository.create({
    description: commentData.description,
    car: car,
    user: user,
  });

  await commentRepository.save(newComment);

  return newComment;
};

export { createCommentService };

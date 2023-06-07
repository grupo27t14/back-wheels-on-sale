import { AppDataSource } from "../../data-source";
import { Comment } from "../../entities/coment.entitie";

const listCommentsService = async (carId: string): Promise<Comment[]> => {
  const commentRepository = AppDataSource.getRepository(Comment);

  const comments = await commentRepository.find({
    where: {
      car: { id: carId },
    },
    relations: ["car", "user"],
  });

  return comments;
};

export { listCommentsService };

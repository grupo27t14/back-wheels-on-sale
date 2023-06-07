import { AppDataSource } from "../../data-source";
import { Comment } from "../../entities/coment.entitie";
import AppError from "../../errors/AppErrors";

const deleteCommentService = async (commentId: string): Promise<void> => {
  const commentRepository = AppDataSource.getRepository(Comment);

  const comment = await commentRepository.findOne({
    where: {
      id: commentId,
    },
  });
  if (!comment) {
    throw new AppError("Comment not found", 404);
  }

  await commentRepository.remove(comment);
};

export { deleteCommentService };

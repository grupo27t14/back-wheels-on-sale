import { AppDataSource } from "../../data-source";
import { Comment } from "../../entities/coment.entitie";
import AppError from "../../errors/AppErrors";

const updateCommentService = async (
  commentId: string,
  commentData: string
): Promise<Comment> => {
  const commentRepository = AppDataSource.getRepository(Comment);

  const comment = await commentRepository.findOne({
    where: {
      id: commentId,
    },
  });
  if (!comment) {
    throw new AppError("Comment not found", 404);
  }
  comment.description = commentData;

  const updatedComment = await commentRepository.save(comment);

  return updatedComment;
};

export { updateCommentService };

import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { Comment } from "../entities/coment.entitie";

const ensureIsOwnerMiddlewareComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const commentRepositoy = AppDataSource.getRepository(Comment);

  const commentId: string = req.params.id;
  const userId: string = res.locals.userId;

  const comment = await commentRepositoy.findOne({
    where: {
      id: commentId,
    },
    relations: {
      user: true,
    },
  });

  if (!comment) {
    return res.status(404).json({
      message: "comment not found",
    });
  }

  if (comment.user.id !== userId) {
    return res.status(403).json({
      message: "You don`t have permissions",
    });
  }

  return next();
};

export { ensureIsOwnerMiddlewareComment };

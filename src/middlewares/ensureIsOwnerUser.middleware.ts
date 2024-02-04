
import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entities/user.entitie";

const ensureIsOwnerMiddlewareUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const usersRepository = AppDataSource.getRepository(User);

  const userId: string = req.params.id;
  const loggedInUserId: string = res.locals.userId;

  const user = await usersRepository.findOne({
    where: {
      id: userId,
    },
  });

  if (!user) {
    return res.status(404).json({
      message: "user not found",
    });
  }

  if (user.id !== loggedInUserId) {
    return res.status(403).json({
      message: "You don`t have permissions",
    });
  }

  return next();
};

export { ensureIsOwnerMiddlewareUser };

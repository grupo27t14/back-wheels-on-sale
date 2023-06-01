import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entities/user.entitie";

const isValidUUID = (uuid: string): boolean => {
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
};

const ensureIsOwnerMiddlewareUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const usersRepository = AppDataSource.getRepository(User);

  const userId: string = req.params.id;
  const loggedInUserId: string = res.locals.userId;

  if (!isValidUUID(userId)) {
    return res.status(400).json({
      message: "Invalid user ID",
    });
  }

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

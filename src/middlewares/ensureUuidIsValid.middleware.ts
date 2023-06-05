import { Request, Response, NextFunction } from "express";
import { isValidUUID } from "../utils/uuidUtils";

const ensureUuidIsValidMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId: string = req.params.id;

  if (!isValidUUID(userId)) {
    return res.status(400).json({
      message: "Invalid UUID",
    });
  }

  return next();
};

export { ensureUuidIsValidMiddleware };

import { Request, Response, NextFunction } from "express";
import { isValidUUID } from "../utils/uuidUtils";
import { AppDataSource } from "../data-source";
import { User } from "../entities/user.entitie";

const ensureUuidIsValidMiddlewareUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => { 

    const usersRepository = AppDataSource.getRepository(User);

    const userId: string = req.params.id;

    if (!isValidUUID(userId)) {
        return res.status(400).json({
          message: "Invalid user ID",
        });
    }
    
    return next()
}

export { ensureUuidIsValidMiddlewareUser };
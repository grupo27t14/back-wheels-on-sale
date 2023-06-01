import { compare } from "bcryptjs";
import { AppDataSource } from "../../data-source";
import AppError from "../../errors/AppErrors";
import { TLoginRequest } from "../../interfaces/login.interfaces";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { User } from "../../entities/user.entitie";

const createTokenService = async ({
  email,
  password,
}: TLoginRequest): Promise<string> => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOne({
    where: {
      email,
    },
  });

  if (!user) {
    throw new AppError("Invalid credentials", 403);
  }

  const passwordMatch = await compare(password, user.password);

  if (!passwordMatch) {
    throw new AppError("Invalid credentials", 403);
  }

  const token = jwt.sign({ userName: user.name }, process.env.SECRET_KEY!, {
    expiresIn: "30m",
    subject: user.id,
  });

  return token;
};

export { createTokenService };

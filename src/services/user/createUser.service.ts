import { AppDataSource } from "../../data-source";
import AppError from "../../errors/AppErrors";
import { hash } from "bcryptjs";
import { User } from "../../entities/user.entitie";
import { userSchemaResponse } from "../../schemas/user.schema";
import { TUserRequest, TUserResponse } from "../../interfaces/user.interface";

const createUserService = async (
  data: TUserRequest
): Promise<TUserResponse> => {
  const { email, name, password } = data;
  const userRepository = AppDataSource.getRepository(User);
  const findUser = await userRepository.findOne({
    where: {
      email,
    },
  });

  if (findUser) {
    throw new AppError("User already exists", 409);
  }

  const hashedPassword = await hash(password, 10);

  const user = userRepository.create({
    name,
    email,
    password: hashedPassword,
  });

  await userRepository.save(user);

  return userSchemaResponse.parse(user);
};

export { createUserService };

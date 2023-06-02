import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entitie";
import { TUserResponse } from "../../interfaces/user.interface";
import { userSchemaResponse } from "../../schemas/user.schema";
import AppError from "../../errors/AppErrors";

const findUserService = async (id: string): Promise<TUserResponse> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const foundUser: User | null = await userRepository.findOne({
    where: {
      id,
    },
    relations: ["personalInformation", "addressInformation"],
  });

  if (!foundUser) {
    throw new AppError("User not found", 404);
  }

  const user = userSchemaResponse.parse(foundUser);

  return user;
};

export default findUserService;

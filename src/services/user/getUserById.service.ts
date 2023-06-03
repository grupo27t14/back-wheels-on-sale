import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entitie";
import { TUserRes } from "../../interfaces/user.interface";
import { userSchemaRes } from "../../schemas/user.schema";
import AppError from "../../errors/AppErrors";

const findUserService = async (id: string): Promise<TUserRes> => {
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

  const user = userSchemaRes.parse(foundUser);

  return user;
};

export default findUserService;

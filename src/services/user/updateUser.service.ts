import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import AppError from "../../errors/AppErrors";
import { User } from "../../entities/user.entitie";
import { TUser, TUserUpdateRequest } from "../../interfaces/user.interface";
import { userSchema } from "../../schemas/user.schema";

const updateUserService = async (
  userData: TUserUpdateRequest,
  idUser: string
): Promise<TUser> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const oldUserData = await userRepository.findOneBy({
    id: idUser,
  });

  if (!oldUserData) {
    throw new AppError("User dosnt exists", 409);
  }

  const user = userRepository.create({
    ...oldUserData,
    ...userData,
  });

  await userRepository.save(user);

  const updatedUser = userSchema.parse(user);

  return updatedUser;
};

export default updateUserService;

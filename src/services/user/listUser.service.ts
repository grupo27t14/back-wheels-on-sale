import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entitie";
import { TUsersMany } from "../../interfaces/user.interface";
import { usersManySchema } from "../../schemas/user.schema";

const listUserService = async (): Promise<TUsersMany> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const findUsers: Array<User> = await userRepository.find();

  const user = usersManySchema.parse(findUsers);

  return user;
};

export default listUserService;

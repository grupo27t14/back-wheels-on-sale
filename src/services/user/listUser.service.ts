import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entitie";
import { TUsersMany } from "../../interfaces/user.interface";
import { usersManySchema, usersResponse } from "../../schemas/user.schema";

const listUserService = async (): Promise<TUsersMany> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const findUsers: Array<User> = await userRepository.find({
    relations: ["personalInformation", "addressInformation"],
  });

  const user = usersResponse.parse(findUsers); // nao funcionou 1

  return user;
};

export default listUserService;

import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entitie";
import { usersSchemaRes } from "../../schemas/user.schema";
import { TUsersRes } from "../../interfaces/user.interface";

const listUserService = async (): Promise<TUsersRes> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const users = await userRepository.find({
    relations: ["personalInformation", "addressInformation"],
  });

  const parsedUsers = usersSchemaRes.parse(users);
  return parsedUsers;
};

export default listUserService;

import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entitie";
import { TUsersRes } from "../../interfaces/user.interface";
import { usersSchemaRes } from "../../schemas/user.schema";

const listUserService = async (): Promise<TUsersRes> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const findUsers: Array<User> = await userRepository.find({
    relations: ["personalInformation", "addressInformation"],
  });

  const user = usersSchemaRes.parse(findUsers); // nao funcionou 1

  return user;
};

export default listUserService;

import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entitie";
import { userSchemaRes } from "../../schemas/user.schema";
import { TUserRes } from "../../interfaces/user.interface";

const getMyDataService = async (userId: string): Promise<TUserRes> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const user = await userRepository.findOne({
    where: {
      id: userId,
    },
    relations: ["personalInformation", "addressInformation"],
  });

  const parsedUser = userSchemaRes.parse(user);
  return parsedUser;
};

export default getMyDataService;

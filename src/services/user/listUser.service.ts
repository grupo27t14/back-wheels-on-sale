// import { Repository } from "typeorm";
// import { AppDataSource } from "../../data-source";
// import { User } from "../../entities/user.entitie";
// import { TUsersRes } from "../../interfaces/user.interface";
// import { usersSchemaRes } from "../../schemas/user.schema";

// const listUserService = async (): Promise<TUsersRes> => {
//   const userRepository: Repository<User> = AppDataSource.getRepository(User);

//   const findUsers: Array<User> = await userRepository.find({
//     relations: ["personalInformation", "addressInformation"],
//   });

//   const user = usersSchemaRes.parse(findUsers);

//   return user;
// };

// export default listUserService;

import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entitie";
import { TUsersRes } from "../../interfaces/user.interface";
import { usersSchemaRes } from "../../schemas/user.schema";

const listUserService = async (page: number, limit: number): Promise<any> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const skip = (page - 1) * limit;

  const [users, totalCount] = await userRepository.findAndCount({
    relations: ["personalInformation", "addressInformation"],
    skip,
    take: limit,
  });

  const parsedUsers = usersSchemaRes.parse(users);

  return {
    users: parsedUsers,
    totalCount,
  };
};

export default listUserService;

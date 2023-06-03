import { AppDataSource } from "../../data-source";
import AppError from "../../errors/AppErrors";
import { hash } from "bcryptjs";
import { User } from "../../entities/user.entitie";
import { PersonalInformation } from "../../entities/personalInformation.entitie";
import { AddressInformation } from "../../entities/addressInformation.entitie";
import { userSchemaRes } from "../../schemas/user.schema";
import { TUserReq, TUserRes } from "../../interfaces/user.interface";

const createUserService = async (data: TUserReq): Promise<TUserRes> => {
  const userRepository = AppDataSource.getRepository(User);
  const personalInformationRepository =
    AppDataSource.getRepository(PersonalInformation);
  const addressInformationRepository =
    AppDataSource.getRepository(AddressInformation);

  const { email } = data;

  const findUser = await userRepository.findOne({
    where: {
      email,
    },
    relations: ["personalInformation", "addressInformation"],
  });

  if (findUser) {
    throw new AppError("User already exists", 409);
  }

  const hashedPassword = await hash(data.password, 10);

  const pinfo = personalInformationRepository.create(data.personalInformation);

  const paddress = addressInformationRepository.create(data.addressInformation);

  const create = {
    ...data,
    password: hashedPassword,
    addressInformation: paddress,
    personalInformation: pinfo,
  };

  await userRepository.save(create);
  return userSchemaRes.parse(create);
};

export { createUserService };

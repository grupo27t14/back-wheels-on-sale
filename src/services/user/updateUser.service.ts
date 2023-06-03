import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import AppError from "../../errors/AppErrors";
import { User } from "../../entities/user.entitie";
import { TUserRes, TUserUpdate } from "../../interfaces/user.interface";
import { userSchemaRes } from "../../schemas/user.schema";
import { PersonalInformation } from "../../entities/personalInformation.entitie";
import { AddressInformation } from "../../entities/addressInformation.entitie";

const updateUserService = async (
  userData: TUserUpdate,
  idUser: string
): Promise<TUserRes> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);
  const addressInformationRepository: Repository<AddressInformation> =
    AppDataSource.getRepository(AddressInformation);
  const personalInformationRepository: Repository<PersonalInformation> =
    AppDataSource.getRepository(PersonalInformation);

  const oldUserData = await userRepository.findOne({
    where: {
      id: idUser,
    },
    relations: ["personalInformation", "addressInformation"],
  });

  if (!oldUserData) {
    throw new AppError("User dosnt exists", 409);
  }

  const ai = addressInformationRepository.create({
    ...oldUserData.addressInformation,
    ...userData.addressInformation,
  });

  const pi = personalInformationRepository.create({
    ...oldUserData.personalInformation,
    ...userData.personalInformation,
  });

  const user = userRepository.create({
    ...oldUserData,
    ...userData,
    addressInformation: ai,
    personalInformation: pi,
  });

  await userRepository.save(user);

  const updatedUser = userSchemaRes.parse(user);

  return updatedUser;
};

export default updateUserService;

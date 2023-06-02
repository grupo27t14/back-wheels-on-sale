import { AppDataSource } from "../../data-source";
import AppError from "../../errors/AppErrors";
import { hash } from "bcryptjs";
import { User } from "../../entities/user.entitie";
import { PersonalInformation } from "../../entities/personalInformation.entitie";
import { AddressInformation } from "../../entities/addressInformation.entitie";
import { userSchemaResponse } from "../../schemas/user.schema";
import { TUserRequest, TUserResponse } from "../../interfaces/user.interface";

const createUserService = async (
  data: TUserRequest
): Promise<TUserResponse> => {
  const {
    email,
    name,
    password,
    is_admin,
    is_seller,
    personalInformationData,
    addressInformationData,
  } = data;
  const userRepository = AppDataSource.getRepository(User);
  const personalInformationRepository =
    AppDataSource.getRepository(PersonalInformation);
  const addressInformationRepository =
    AppDataSource.getRepository(AddressInformation);

  const findUser = await userRepository.findOne({
    where: {
      email,
    },
    relations: ["personalInformation", "addressInformation"],
  });

  if (findUser) {
    throw new AppError("User already exists", 409);
  }

  const hashedPassword = await hash(password, 10);

  const user = userRepository.create({
    name,
    email,
    password: hashedPassword,
    is_admin,
    is_seller,
  });

  let personalInformation;
  if (personalInformationData) {
    personalInformation = personalInformationRepository.create(
      personalInformationData
    );
    user.personalInformation = personalInformation;
    await personalInformationRepository.save(personalInformation);
  }

  let addressInformation;
  if (addressInformationData) {
    addressInformation = addressInformationRepository.create(
      addressInformationData
    );
    user.addressInformation = addressInformation;
    await addressInformationRepository.save(addressInformation);
  }

  await userRepository.save(user);

  return userSchemaResponse.parse(user);
};

export { createUserService };

import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entitie";
import AppError from "../../errors/AppErrors";
import { randomUUID } from "crypto";
import { emailService } from "../../utils/sendEmail";

const resetPasswordService = async (password: string, token: string) => {
    const userRepository: Repository<User> = AppDataSource.getRepository(User);
    const findUser = await userRepository.findOne({
        where: {
            reset_password: token
        }
      });

      if (!findUser) {
        throw new AppError("User not found", 404);
      }

      console.log(findUser)

      const user = userRepository.create({
        ...findUser,
        password: password,
        reset_password: null,
      });

      await userRepository.save(user)

    return;
};

export default resetPasswordService;

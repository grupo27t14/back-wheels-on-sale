import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entitie";
import AppError from "../../errors/AppErrors";
import { randomUUID } from "crypto";
import { emailService } from "../../utils/sendEmail";

const sendEmailResetPasswordService = async (email: string) => {
    const userRepository: Repository<User> = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({
        where: {
            email: email
        }
      });

      if (!user) {
        throw new AppError("User not found", 404);
      }

      const resetToken = randomUUID()

      await userRepository.save({
        ...user,
        reset_password: resetToken,
     })

     const resetPasswordTemplate = emailService.resetPasswordTemplate(user.name, email, resetToken)

     await emailService.sendEmail(resetPasswordTemplate)

    return;
};

export default sendEmailResetPasswordService;

import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { User } from "../../entities/user.entitie";
import { PersonalInformation } from "../../entities/personalInformation.entitie";
import { AddressInformation } from "../../entities/addressInformation.entitie";
import bcrypt from "bcryptjs";
import { randomColorAvatar } from "../../utils/random";




export class UserSeeder implements Seeder {
  async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
    const userRepository = dataSource.getRepository(User);
    // const personalInformationRepository = dataSource.getRepository(PersonalInformation);

    for (let i = 0; i < 5; i++) {
      const user = new User();
      const emailSuffix = i + 1;
      const baseEmail = `client${emailSuffix}`;
      let email = `${baseEmail}@mail.com`;
      let emailExists = true;

      while (emailExists) {
        const existingUser = await userRepository.findOne({
          where: {
            email: email
          }
        });
        if (existingUser) {
          email = `${baseEmail}${emailSuffix}@mail.com`;
        } else {
          emailExists = false;
        }
      }

      user.name = `Client${emailSuffix} Seed`;
      user.email = email;
      user.password = await bcrypt.hash("1234", 10);
      user.is_admin = false;
      user.is_seller = true;
      user.avatar_bg = `${randomColorAvatar()}`;

      const personalInformation = new PersonalInformation();
      personalInformation.cpf = "12345678900";
      personalInformation.phone = "1234567890";
      personalInformation.birth_date = "1990-01-01";
      personalInformation.description = "Descrição das informações pessoais";

      user.personalInformation = personalInformation;

      const addressInformation = new AddressInformation();
      addressInformation.cep = "12345678";
      addressInformation.state = "Estado";
      addressInformation.city = "Cidade";
      addressInformation.street = "Rua";
      addressInformation.number = "123";
      addressInformation.complement = "Complemento do endereço";

      user.addressInformation = addressInformation;

      await userRepository.save(user);
    }
  }
}

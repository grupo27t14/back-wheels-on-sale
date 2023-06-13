import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./user.entitie";

@Entity("personal_informations")
export class PersonalInformation {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  cpf: string;

  @Column()
  phone: string;

  @Column()
  birth_date: string;

  @Column({ nullable: true, type: "varchar" })
  description?: string | null | undefined;

  @OneToOne(() => User, (user) => user.personalInformation, {
    onDelete: "CASCADE",
  })
  @JoinColumn()
  user: User;
}

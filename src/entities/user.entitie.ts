import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
} from "typeorm";
import { PersonalInformation } from "./personalInformation.entitie";
import { AddressInformation } from "./addressInformation.entitie";

@Entity("user")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: false })
  is_admin: boolean;

  @Column({ default: false })
  is_seller: boolean;

  @OneToOne(() => PersonalInformation,  (personalInformation) => personalInformation.user)
  personalInformation: PersonalInformation;

  @OneToOne(() => AddressInformation,  (addressInformation) => addressInformation.user)
  addressInformation: AddressInformation;
}

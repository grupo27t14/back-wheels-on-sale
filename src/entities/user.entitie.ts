import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
} from "typeorm";
import { PersonalInformation } from "./personalInformation.entitie";
import { AddressInformation } from "./addressInformation.entitie";
import { Car } from "./car.entitie";

@Entity("users")
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

  @OneToOne(
    () => PersonalInformation,
    (personalInformation) => personalInformation.user,
    { cascade: true }
  )
  personalInformation: PersonalInformation;

  @OneToOne(
    () => AddressInformation,
    (addressInformation) => addressInformation.user,
    { cascade: true }
  )
  addressInformation: AddressInformation;

  @OneToMany(() => Car, (car) => car.user)
  cars: Car[];
}

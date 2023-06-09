import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./user.entitie";

@Entity("address_informations")
export class AddressInformation {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  cep: string;

  @Column()
  state: string;

  @Column()
  city: string;

  @Column()
  street: string;

  @Column()
  number: string;

  @Column({ nullable: true, type: "varchar" })
  complement?: string | null | undefined;

  @OneToOne(() => User, (user) => user.addressInformation, {
    onDelete: "CASCADE",
  })
  @JoinColumn()
  user: User;
}

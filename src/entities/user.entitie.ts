import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
  BeforeInsert,
  BeforeUpdate,
  CreateDateColumn,
} from "typeorm";
import { PersonalInformation } from "./personalInformation.entitie";
import { AddressInformation } from "./addressInformation.entitie";
import { Car } from "./car.entitie";
import { getRounds, hashSync } from "bcryptjs";
import { Comment } from "./coment.entitie";

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

  @CreateDateColumn({ type: "timestamp" })
  created_at: Date;

  @Column()
  avatar_bg: string;

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

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

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    const isHashed = getRounds(this.password);
    if (!isHashed) {
      this.password = hashSync(this.password, 10);
    }
  }
}

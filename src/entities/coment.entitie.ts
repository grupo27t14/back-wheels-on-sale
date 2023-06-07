import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from "typeorm";

import { Car } from "./car.entitie";
import { User } from "./user.entitie";

@Entity("comments")
export class Comment {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "text" })
  description: string;

  @CreateDateColumn({ type: "timestamp" })
  create_date: Date;

  @ManyToOne(() => Car, (car) => car.comments, { onDelete: "SET NULL" })
  car: Car;

  @ManyToOne(() => User, (user) => user.comments, { onDelete: "SET NULL" })
  user: User;
}

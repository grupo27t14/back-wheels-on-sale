import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Car } from "./car.entitie";

@Entity("images")
export class Images {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  url: string;

  @ManyToOne(() => Car, (car) => car.images, { onDelete: "CASCADE" })
  car: Car;
}

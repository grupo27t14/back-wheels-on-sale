import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { User } from "./user.entitie";
import { Images } from "./images.entitie";

@Entity("cars")
export class Car {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  brand: string;

  @Column()
  model: string;

  @Column()
  year: string;

  @Column()
  fuel: string;

  @Column()
  km: string;

  @Column()
  color: string;

  @Column()
  fipe: string;

  @Column()
  price: string;

  @Column()
  description: string;

  @Column()
  published: Date;

  @Column()
  is_promo: Boolean

  @ManyToOne(() => User, (user) => user.cars, { onDelete: "CASCADE" })
  user: User;

  @OneToMany(() => Images, (image) => image.car)
  images: Images[];

}

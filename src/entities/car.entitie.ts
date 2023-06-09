import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  BeforeInsert,
  CreateDateColumn,
  BeforeUpdate,
} from "typeorm";
import { User } from "./user.entitie";
import { Images } from "./images.entitie";
import { Comment } from "./coment.entitie";

@Entity("cars")
export class Car {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  brand: string;

  @Column()
  model: string;

  @Column()
  spec: string;

  @Column()
  year: string;

  @Column()
  fuel: string;

  @Column()
  km: number;

  @Column()
  color: string;

  @Column()
  fipe: string;

  @Column()
  price: number;

  @Column()
  description: string;

  @Column({ default: true })
  is_published: Boolean;

  @CreateDateColumn({ type: "timestamp" })
  created_at: Date;

  @Column()
  is_promo: Boolean;

  @ManyToOne(() => User, (user) => user.cars, { onDelete: "CASCADE" })
  user: User;

  @OneToMany(() => Comment, (comment) => comment.car)
  comments: Comment[];

  @OneToMany(() => Images, (image) => image.car)
  images: Images[];

  @BeforeInsert()
  @BeforeUpdate()
  setIsPromo() {
    const fipe = Number(this.fipe);
    const price = Number(this.price);

    this.is_promo = price < fipe - (fipe * 5) / 100 ? true : false;
  }
}

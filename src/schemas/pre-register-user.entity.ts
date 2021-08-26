import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("PreRegUser", {})
export class PreRegUser {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column()
  Login: string;

  @Column()
  Email: string;

  @Column()
  Telephone: number;

  @Column()
  Password: string;
}

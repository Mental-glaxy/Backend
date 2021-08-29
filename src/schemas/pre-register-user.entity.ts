import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("PreRegUser", {})
export class PreRegUser {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column({ nullable: true })
  Login: string;

  @Column({ unique: true })
  Email: string;

  @Column({ unique: true })
  Telephone: number;

  @Column()
  Password: string;
  @Column({
    default: () => Date.now(),
  })
  Date: number;
}

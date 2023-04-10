import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  displayName: string;

  // @Column()
  // token: string;

  constructor(email: string, password: string, displayName: string) {
    this.email = email;
    this.password = password;
    this.displayName = displayName;
  }
}

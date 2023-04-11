import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

const SALT_WORK_FACTOR = 10;

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true, nullable: false })
  email: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  password: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  firstName: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  lastName: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  country: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  avatar: string;

  // @Column({ type: 'varchar', length: 255, nullable: false })
  // phoneNumber: string;  // для миграции

  @Column({ type: 'varchar', length: 255, unique: true, nullable: false })
  token: string;

  async generateToken() {
    this.token = crypto.randomUUID();
  }

  async checkPassword(password) {
    return bcrypt.compare(password, this.password);
  }

  @BeforeInsert()
  async hashPassword() {
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    this.password = await bcrypt.hash(this.password, salt);
  }
}

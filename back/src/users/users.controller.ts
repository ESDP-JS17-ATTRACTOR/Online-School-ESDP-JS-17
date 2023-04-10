import { Controller, Post, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  @Post()
  async registerUser(@Req() req) {
    const user = this.userRepository.create({
      email: req.body.email,
      password: req.body.password,
      displayName: req.body.displayName,
    });
    await user.generateToken();
    return this.userRepository.save(user);
  }

  @Post('sessions')
  async login(@Req() req) {
    return req.user as User;
  }
}

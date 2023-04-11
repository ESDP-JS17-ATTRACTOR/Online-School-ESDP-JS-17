import { Controller, NotFoundException, Post, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { MyRequest } from '../../types';

@Controller('users')
export class UsersController {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  @Post()
  async registerUser(@Req() req: MyRequest) {
    const existingUser = await this.userRepository.findOne({
      where: {
        email: req.user.email,
      },
    });
    if (existingUser) {
      throw new NotFoundException(
        `User with email ${req.user.email} already exists`,
      );
    }
    const user = this.userRepository.create({
      email: req.user.email,
      password: req.user.password,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      country: req.user.country,
      avatar: req.user.avatar,
    });
    await user.generateToken();
    return this.userRepository.save(user);
  }

  @Post('sessions')
  async login(@Req() req) {
    return req.user as User;
  }
}

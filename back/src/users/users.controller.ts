import { Controller, NotFoundException, Post, Req } from '@nestjs/common';
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
    const existingUser = await this.userRepository.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (existingUser) {
      throw new NotFoundException(
        `User with email ${req.body.email} already exists`,
      );
    }
    const user = this.userRepository.create({
      email: req.body.email,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      country: req.body.country,
      avatar: req.body.avatar,
      phoneNumber: req.body.phoneNumber,
      pokemon: req.body.pokemon,
    });
    await user.generateToken();
    return this.userRepository.save(user);
  }

  @Post('sessions')
  async login(@Req() req) {
    return req.body as User;
  }
}

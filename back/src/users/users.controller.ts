import { Controller, Get, Post, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { Request } from 'express';

@Controller('users')
export class UsersController {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  @Post()
  async registerUser(@Req() req: Request) {
    const user = this.userRepository.create({
      email: req.body.email,
      password: req.body.password,
      displayName: req.body.displayName,
    });
    // user.generateToken();
    return this.userRepository.save(user);
  }

  @Post('sessions')
  async login(@Req() req: Request) {
    // return req.user as User;
  }

  @Get('secret')
  secret(@Req() req: Request) {
    // const user = req.user as User;
    // return {
    //   message: 'Secret message',
    //   email: user.email,
    // };
  }
}

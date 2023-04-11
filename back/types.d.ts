import { Request } from '@nestjs/common';

export interface MyRequest extends Request {
  user: {
    id: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    country: string;
    avatar: string;
  };
}

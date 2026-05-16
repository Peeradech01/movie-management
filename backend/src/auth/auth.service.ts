import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) { }
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);
    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (user && passwordIsValid) {
      return {
        userId: user.id,
        username: user.username,
        role: user.role,
      }
    }
    return null;
  }

  async login(user: any) {
    const payload = { 
      username: user.username, 
      sub: user.userId,
      role: user.role
    };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}

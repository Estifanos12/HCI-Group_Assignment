import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist';
import { Users } from 'src/users/schemas/users.schema';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { UserDto } from 'src/users/dto/user.dto';
import { UserLoginDto } from 'src/users/dto/login.dto';
import { ForbiddenException } from '@nestjs/common/exceptions';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(userInfo: UserDto): Promise<Users> {
    return this.userService.createUser(userInfo);
  }

  async login(
   loginInfo: UserLoginDto
  ): Promise<{ accessToken: string }> {
    const {username, password} = loginInfo;
    const user = await this.userService.getUser(username);
    if (!user) {
      throw new NotFoundException('User Not Found');
    }
    const hashedPwd = await bcrypt.hash(password, user.salt);

    if (!(hashedPwd === user.password)) {
      throw new ForbiddenException('Invalid credentials');
    }

    const payload = {
      username,
    };
    const accessToken = await this.jwtService.sign(payload);
    return { accessToken };
  }

}

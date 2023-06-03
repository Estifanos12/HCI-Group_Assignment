import { Body, Controller, Post, Get } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators';
import { UsePipes } from '@nestjs/common/decorators/core/use-pipes.decorator';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';
import { UserLoginDto } from 'src/users/dto/login.dto';
import { UserDto } from 'src/users/dto/user.dto';
import { Users } from 'src/users/schemas/users.schema';
import { AuthService } from './auth.service';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly configService: ConfigService) {}

  @Post('signup')
  @UsePipes(ValidationPipe)
  async signUp(@Body() userInfo: UserDto): Promise<Users> {
    return await this.authService.signUp(userInfo);
  }

  @Post('login')
  @UsePipes(ValidationPipe)
  async login(
    @Body() loginInfo: UserLoginDto,
  ): Promise<{ accessToken: string }> {
    return await this.authService.login(loginInfo);
  }

  @Post('check')
  async checkJwt(@Body('token') token: string): Promise<any> {
    try {
      jwt.verify(token, this.configService.get<string>('JWT_SECRET'));
      return { response: true };
    } catch {
      return { response: false };
    }
  }
}

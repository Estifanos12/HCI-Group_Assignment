import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';

export class UserDto {
  @IsString()
  @Length(3, 20)
  username: string;

  @IsString()
  @IsNotEmpty()
  full_name: string;

  @Matches(
    new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'),
  )
  password: string;
}

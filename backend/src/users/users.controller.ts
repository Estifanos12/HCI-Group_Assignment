import { Body, Controller, Delete, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { Users } from './schemas/users.schema';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService){}
    @Put()
    @UsePipes(ValidationPipe)
    async updateUser(@Body() user: UserDto):Promise<Users>{
       return this.usersService.updateUser(user)
    }
    @Delete()
    @UsePipes(ValidationPipe)
    async deleteUser(@Body() username: string):Promise<void>{
        this.usersService.deletUser(username)
    }
}

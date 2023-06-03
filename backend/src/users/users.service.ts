import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose';
import { Users } from './schemas/users.schema';
import * as bcrypt from 'bcrypt';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {

    constructor(    
        @InjectModel("Users") private readonly usersModel:Model<Users>
    ){}

    async getUser(user: string): Promise<Users> {
        return await this.usersModel.findOne({username: user});
    } 

    async createUser(userInfo: UserDto): Promise<Users>{
        const {full_name, password, username} = userInfo;
        const [hashedPwd, salt] = await this.hashPwd(password);
        return await this.usersModel.create({full_name, username, password:hashedPwd, salt});
    }
    async updateUser(userInfo: UserDto): Promise<Users>{
        const {full_name, password, username} = userInfo;
        const [hashedPwd, salt] = await this.hashPwd(password);
        return await this.usersModel.findOneAndUpdate( {username} ,{full_name, username, password:hashedPwd, salt}, {upsert: true, returnDocument:"after"});
    }
    async deletUser(username: string): Promise<void>{
        return await this.usersModel.findOneAndDelete({username});
    }


    async hashPwd(password: string) {
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPwd = await bcrypt.hash(password, salt)
        return [hashedPwd, salt]
    } 
}


import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";


@Schema({
    timestamps: true
})
export class Users {

    @Prop()
    full_name: string;

    @Prop({unique: true})
    username: string;

    @Prop()
    password: string;

    @Prop()
    salt: string;

}

export const UsersSchema = SchemaFactory.createForClass(Users);
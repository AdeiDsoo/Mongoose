import {Schema, model } from "mongoose";

const usersSchema = new Schema({
    name: {
        type: String,
        require: true,
    },
    last_name: {
        type: String,
        require: true,
    },
    email: {
        type:String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    }
});
export const usersModel= model('Users', usersSchema) 

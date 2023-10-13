import { Schema, model } from "mongoose";

const messageSchema = new Schema({
    fromUser: {
        type: String,
        required: true,
    },
    contentMessage: {
        type: String,
        required: true,
    },
    toUser: {
        type: String,
        required: true,
    },
   
});
export const messageModel= model('Messages', messageSchema) 
//crear el modelo

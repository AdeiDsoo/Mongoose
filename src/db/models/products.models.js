import { Schema, model } from "mongoose";

//crear el esquema
const productsSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        require: true,
    },
    thumbnail: {
        type: String,
    },
    code: {
        type: String,
        required: true,
        unique: true,
    },
    stock: {
        type: Number,
        required: true,
    },
    status: {
        type: Boolean,
        default: true
    },
    category: {
        type: String,
        required: true,
    },
});
export const productsModel= model('Products', productsSchema) 
//crear el modelo

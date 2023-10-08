import { Schema } from "mongoose";

//crear el esquema
const productsSchema = new Schema({
    title: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
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
        require: true,
        unique: true,
    },
    stock: {
        type: Number,
        require: true,
    },
    status: {
        type: Boolean,
    },
    category: {
        type: String,
        require: true,
    },
});
export default productsSchema
//crear el modelo

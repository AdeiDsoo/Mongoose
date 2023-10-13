import { Schema, model } from "mongoose";

const cartsSchema = new Schema({
    
    productsCart: [
        {
            idProduct: {
                type: Number,
                required: true,
                // type: mongoose.Schema.Types.ObjectId,
                // ref: 'Products',
            },
            qty: {
                type: Number,
            },
        },
    ],
    total: {
        type: Number,
    },
});
export const cartsModel = model("Carts", cartsSchema);


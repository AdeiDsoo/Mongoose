import { Schema, model} from "mongoose";

const cartsSchema = new Schema({


    productsCart:[
// idproduct{
//     type: Number,
//     require: true,
// },
// qty{
// type:Number
// }
    ] 
    
});
export const cartsModel= model('Carts', cartsSchema) 

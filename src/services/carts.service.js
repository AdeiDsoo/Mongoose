import { cartsMongo } from "../DAO's/memDAO/carts.mongo.js";
import { productsMongo } from "../DAO's/memDAO/products.mongo.js";
import { hashData } from "../utils.js";

class CartsService {
    async findAll() {
        const response = await cartsMongo.findAll();
        return response;
    }

    async findById(id) {
        
        const response = await cartsMongo.findById(id);
        return response;
    }

    async createOne(obj) {
        const { password } = obj;
        const hashedPassword = hashData(password);
        const response = await cartsMongo.createOne({
            ...obj,
            password: hashedPassword,
        });
        return response;
    }
    async updateOne(obj) {
        const { id, ...cartInfo } = obj;
        const response = await cartsMongo.updateOne(id, cartInfo);
        return response;
    }
    async updateThisCart(obj){
        const { id, ...cartInfo } = obj;
        const response = await cartsMongo.updateThisCart(id, cartInfo);
        return response;
    }
    async deleteOne(id) {
        const response = await cartsMongo.deleteOne(id);
        return response;
    }
    async productFindById(id) {
        const response = await productsMongo.findById(id);
        return response;
    }

    async updateCartProducts(idCart, productsCart) {
        console.log(idCart,'ID')
        try {
          const cart = await cartsMongo.findById(idCart);
    
          if (!cart) {
            throw new Error("Cart not found");
          }
    
          cart.productsCart = productsCart;
    
          await cart.save();
    
          return { success: true, message: "Cart products updated" };
        } catch (error) {
          console.error(error);
          return { success: false, message: `An error occurred: ${error.message}` };
        }
      }
}

export const cartsService = new CartsService();

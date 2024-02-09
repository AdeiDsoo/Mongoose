import { cartsMongo } from "../DAO's/memDAO/carts.mongo.js";
import { productsMongo } from "../DAO's/memDAO/products.mongo.js";
import { hashData } from "../utils/utils.js";
import CustomeError from "../error/not-found.error.js";
import { ErrorMessages } from "../error/error.enum.js";
import { logger } from "../utils/winston.js";

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
  
        try {
          const cart = await cartsMongo.findById(idCart);
    
          if (!cart) {
            // CustomeError.createError(ErrorMessages.CART_NOT_FOUND);
            throw new Error("Cart not found");
          }
    
          cart.productsCart = productsCart;
    
          await cart.save();
    
          return { success: true, message: "Cart products updated" };
        } catch (error) {
        logger.error(error);
          return { success: false, message: `An error occurred: ${error.message}` };
        }
      }
}

export const cartsService = new CartsService();

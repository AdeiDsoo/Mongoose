import { cartsModel } from "../db/models/carts.models.js";
import BasicManager from "./basicManager.js";

class CartsManager extends BasicManager {
   constructor() {
      super(cartsModel);
   }
   async findInfoProducts(idCart) {
      const cart = await cartsModel
         .findById(idCart)
         // .populate("products");
      return cart;
   }
}

export const cartsManager = new CartsManager();

import { cartsModel } from "../db/models/carts.models.js";
import BasicManager from "./basicManager.js";

class CartsManager extends BasicManager {
   constructor() {
      super(cartsModel);
   }
   async findInfoProducts(idCart) {
      const cart = await cartsModel
         .findById(idCart)
         .populate("productsCart.idProduct").lean();
      return cart;
   }
   async findAllSimple() {
      return this.model.find().populate("productsCart.idProduct").lean();
    }
}

export const cartsManager = new CartsManager();

import { cartsModel } from "../db/models/carts.models.js";
import BasicManager from "./basicManager.js";

class CartsManager  extends BasicManager  {
   constructor(){
    super(cartsModel)
   }
};

export const cartsManager = new CartsManager()
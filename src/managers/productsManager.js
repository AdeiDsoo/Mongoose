import { productsModel } from "../db/models/products.models.js";
import BasicManager from "./basicManager.js";


class ProductsManager extends BasicManager {
  constructor(){
    super(productsModel)
  }
};

export const productsManager = new ProductsManager()


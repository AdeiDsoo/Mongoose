import { productsModel } from "../db/models/products.models.js";
import BasicManager from "./basicManager.js";


class ProductsManager extends BasicManager {
  constructor(){
    super(productsModel)
  }
  async findAllSimpleProducts() {
    return this.model.find().lean();
  }
};

export const productsManager = new ProductsManager()

// outer.post("/", body_must_contain_attributes(["products"]), createCart);
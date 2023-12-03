import { usersModel } from "../../models/users.models.js";
import BasicMongo from "./basic.mongo.js";

class UsersMongo extends BasicMongo {
  constructor() {
    super(usersModel, "cart");
  }
  async findByEmail(email) {
    return usersModel
      .findOne({ email })
      .populate({
        path: "cart",
        populate: { path: "productsCart.idProduct" },
      });
  }
  async findByPassword(password) {
    return usersModel.findOne({ password });
  }
}

export const usersMongo = new UsersMongo();

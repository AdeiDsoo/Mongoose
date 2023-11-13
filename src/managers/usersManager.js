import { usersModel } from "../db/models/users.models.js";
import BasicManager from "./basicManager.js";

class UsersManager extends BasicManager {
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

export const userManager = new UsersManager();

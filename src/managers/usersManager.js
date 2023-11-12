import { usersModel } from "../db/models/users.models.js";
import BasicManager from "./basicManager.js";

class UsersManager extends BasicManager {
  constructor() {
    super(usersModel, "cart");
  }
  async findByEmail(email) {
    const response = await usersModel.findOne({ email });
    return response;
  }
  async findByPassword(password) {
    return usersModel.findOne({ password });
  }
}

export const userManager = new UsersManager();

// import { usersManager } from "../DAO's/factory.js";
import { usersMongo } from "../DAO's/memDAO/users.mongo.js";
import { hashData } from "../utils.js";
import UserDTO from "../DTO/user.dto.js";

class UsersService {
  async findAll() {
    const response = await usersMongo.findAll();
    return response;
  }

  async findById(id) {
    const response = await usersMongo.findById(id);
    return response;
  }

//   async createOne(obj) {
//     const { password } = obj;
//     const hashedPassword = hashData(password);

//     const response = await usersMongo.createOne({
//       ...obj,
//       password: hashedPassword,
//     });
//     return response;
//   }


  async createOne(obj) {
    console.log(obj, 'obj')
    const { password } = obj;
    const hashedPassword = await hashData(password);
    const userDTO= new UserDTO({...obj,  password: hashedPassword})
    console.log(userDTO)
    const response = await usersMongo.createOne(userDTO);
    console.log(response, 'reponse in createOne');
    return response;
  }
  async updateOne(obj) {
    const { id, ...userInfo } = obj;
    const response = await usersMongo.updateOne(id, userInfo);
    return response;
  }
  async deleteOne(id) {
    const response = await usersMongo.deleteOne(id);
    return response;
  }
  async findByEmail(email) {
    const response = await usersMongo.findByEmail(email);
    return response;
  }
  async findByPassword(password) {
    const response = await usersMongo.findByPassword(password);
    return response;
  }
}

export const usersService = new UsersService();

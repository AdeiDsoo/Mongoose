import { ticketsMongo } from "../DAO's/memDAO/tickets.mongo.js";


class TicketsService {
  async findAll() {
    const response = await ticketsMongo.findAll();
    return response;
  }

  async findById(id) {
    const response = await ticketsMongo.findById(id);
    return response;
  }

//   async createOne(obj) {
//     const { password } = obj;
//     const hashedPassword = hashData(password);

//     const response = await ticketsMongo.createOne({
//       ...obj,
//       password: hashedPassword,
//     });
//     return response;
//   }


  async createOne(obj) {

   
    const response = await ticketsMongo.createOne(obj);
    return response;
  }
  async updateOne(obj) {
    const { id, ...userInfo } = obj;
    const response = await ticketsMongo.updateOne(id, userInfo);
    return response;
  }
  async deleteOne(id) {
    const response = await ticketsMongo.deleteOne(id);
    return response;
  }
 
}

export const ticketsService = new TicketsService();

import { messagesMongo } from "../DAO's/memDAO/messages.mongo.js";

class MessagesService {
    async findAll() {
        const response = await messagesMongo.findAll();
        return response;
    }

    async findById(id) {
        const response = await messagesMongo.findById(id);
        return response;
    }

    async createOne(obj) {
        const response = await messagesMongo.createOne(obj);
        return response;
    }

    async updateOne(obj) {
        const { id, ...userInfo } = obj;
        const response = await messagesMongo.updateOne(id, userInfo);
        return response;
    }
    async deleteOne(id) {
        const response = await messagesMongo.deleteOne(id);
        return response;
    }
}

export const messagesService = new MessagesService();

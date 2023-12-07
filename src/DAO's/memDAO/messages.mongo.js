import { messagesModel } from "../../models/messages.model.js";
import BasicMongo from "./basic.mongo.js";

class MessagesMongo extends BasicMongo {
    constructor() {
        super(messagesModel);
    }

  
}

export const messagesMongo = new MessagesMongo();

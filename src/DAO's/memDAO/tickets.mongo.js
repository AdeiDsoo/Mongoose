import { ticketsModel } from "../../models/tickets.model.js";
import BasicMongo from "./basic.mongo.js";

class TicketsMongo extends BasicMongo {
    constructor() {
        super(ticketsModel);
    }

  
}

export const ticketsMongo = new TicketsMongo();

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

	async createOne(obj) {
		const response = await ticketsMongo.createOne(obj);
		return response;
	}
	async updateOne(obj) {
		const { id, ...ticketInfo } = obj;
		const response = await ticketsMongo.updateOne(id, ticketInfo);
		return response;
	}
	async deleteOne(id) {
		const response = await ticketsMongo.deleteOne(id);
		return response;
	}
}

export const ticketsService = new TicketsService();

import supertest from "supertest";
import { expect } from "chai";

const request = supertest("http://localhost:8080");

describe("Carts Routes", function () {
	describe("GET /api/carts/:idCart", () => {
		it("should retrieve cart by ID", async () => {
			const idCart = "652b1ee59a8392d89099b7dc";

			const response = await request.get(`/api/carts/${idCart}`);

			
			expect(response.status).to.equal(200);
			expect(response.body).to.be.an("object");
			expect(response.body.cart).to.have.property("productsCart");
			
		});

	});
});
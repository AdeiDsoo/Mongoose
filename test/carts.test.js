import supertest from "supertest";
import { expect } from "chai";
// import app from "../src/app.js";

const request = supertest("http://localhost:8080");

describe("Session Routes", function () {
	describe("POST /api/carts/:idCart/products/:idProduct", () => {
		it("should add product to cart", async () => {
			
			const idCart = "652b1ee59a8392d89099b7dc";
			const idProduct = "65ac2db45bb50ee62a28c47d";

			const response = await request
				.post(`/api/carts/${idCart}/products/${idProduct}`)
				
				.send({
					qty: 1, 
				});

			// Verifica el código de estado de la respuesta
			expect(response.status).to.equal(200);

			// Verifica el cuerpo de la respuesta
			expect(response.body).to.have.property("message", "product added");

			// Verifica cualquier otra cosa que consideres importante
		});

		it("should handle product already in cart", async () => {
			// Supongamos que ya hay un producto con idProduct en el carrito idCart
			const idCart = "652b1ee59a8392d89099b7dc";
			const idProduct = "65ac2db45bb50ee62a28c47d";

			const response = await request
				.post(`/api/carts/${idCart}/products/${idProduct}`)
				.set("Authorization", "Bearer YOUR_ACCESS_TOKEN")
				.send({
					qty: 2, // Ajusta la cantidad según tus necesidades
				});

			// Verifica el código de estado de la respuesta
			expect(response.status).to.equal(200);

			// Verifica el cuerpo de la respuesta
			expect(response.body).to.have.property("message", "product added");

			// Verifica que la cantidad del producto en el carrito se haya actualizado
			// Ajusta esto según tu lógica específica
			expect(response.body.qty).to.equal(3);
		});

		// Otros casos de prueba según tu lógica
	});
});

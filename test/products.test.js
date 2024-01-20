import { expect } from "chai";
import { productsMongo } from "../src/DAO's/memDAO/products.mongo.js";
import "./db.js"
import supertest from "supertest";

describe("Created products", function () {
	let createdProductId; 

	it("should return an empty array", async function () {
		const result = await productsMongo.findAll();
		expect(result).to.be.an("array");
	});

	it("should be created with _id property", async function () {
		const newProduct = {
			title: "Tostador",
			description: "maquina para dorar pan",
			price: 345,
			thumbnail: "ww.algo.com",
			code: "224ku",
			stock: 876,
			status: true,
			category: "home",
			owner: "Admin",
		};

		const response = await productsMongo.createOne(newProduct);
		createdProductId = response._id; 
		expect(response).to.have.property("_id");
	});


	after(async function () {
		if (createdProductId) {
			const deleteResult = await productsMongo.deleteOne(createdProductId);
			console.log("Deleted product:", deleteResult);
		}
	});
});

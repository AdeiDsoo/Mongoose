import supertest from "supertest";
import { expect } from "chai";
import { usersMongo } from "../src/DAO's/memDAO/users.mongo.js";
const request = supertest("http://localhost:8080");

describe("Session Routes", function () {
	let user = {
		first_name: "Diana",
		last_name: "smith",
		full_name: "diana Smith",
		email: "dSmith@mail.com",
		password: "12345",
		role: "user",
	};
	let errorUser = {
		first_name: "Diana",
		last_name: "smith",
		full_name: "diana Smith",
		password: "12345",
		role: "user",
	};
	let idUser;

	describe("POST /api/sessions/signup", async () => {
		it("should sign up a new user successfully", async () => {
			const response = await request.post("/api/sessions/signup").send(user);

			expect(response.status).to.equal(302);
			expect(response.headers.location).to.equal("/home");
		});

		it("should handle sign up failure", async () => {
			const response = await request
				.post("/api/sessions/signup")
				.send(errorUser);

			expect(response.status).to.equal(302);
			expect(response.headers.location).to.equal("/error");
		});
	});

	describe("DELETE /api/sessions/delete/:email", async () => {
		

		it("should delete a user by email", async () => {
			
			const userEmailToDelete = user.email;

			
		console.log("User email to delete:", userEmailToDelete);
		const deleteResponse = await request.delete(
			`/api/users/delete/${userEmailToDelete}`
		);


		
			expect(deleteResponse.status).to.equal(200);

			
			expect(deleteResponse.body.message).to.equal("User delete");
		});
	});
});

import {
	createUser,
	deleteUser,
} from "../src/controllers/users.crontroller.js";
import { expect } from "chai";
import supertest from "supertest";

describe("should create the user", function () {
	let idResponse;
	const user = {
		first_name: "Lola",
		last_name: "Sanchez",
		full_name: "Lola Sanchez",

		password: "12345",
	};
	it("should throw an error if data is missing", async function () {
		const response = await createUser(user);
		console.log(response);
		idResponse = response._id;
	});

	after(async function () {
		if (idResponse) {
			const deleteResult = await deleteUser(idResponse);
			console.log("Deleted product:", deleteResult);
		}
	});
});

import swaggerJSDOC from "swagger-jsdoc";
import { __dirname } from "./utils.js";

const swaggerOptions = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "CatShop Ecommerce",
			version: "1.0.0",
			description: "API para Ecommerce",
		},
	},
	apis: [
		`${__dirname}/docs/Users.yaml`,
		`${__dirname}/docs/Carts.yaml`,
	],
};

export const swaggerSetup = swaggerJSDOC(swaggerOptions);

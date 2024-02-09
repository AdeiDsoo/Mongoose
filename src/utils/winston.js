import winston from "winston";
import config from "../config/config.js";

const customeLevel = {
	levels: {
		fatal: 0,
		error: 1,
		warning: 2,
		info: 3,
		http: 4,
		debug: 5,
	},
	colors: {
		fatal: "redBG",
		error: "red",
		warning: "yellowBG",
		info: "green",
		http: "blue",
		debug: "magenta",
	},
};
export let logger;

if (config.environment === "production") {
	logger = winston.createLogger({
		levels: customeLevel.levels,
		transports: [
			new winston.transports.Console({
				level: "info",
				format: winston.format.combine(
					winston.format.colorize({ colors: customeLevel.colors }),
					winston.format.simple()
				),
			}),
			new winston.transports.File({
				filename: "./logs-file.log",
				level: "error",
				format: winston.format.combine(
					winston.format.timestamp(),
					winston.format.prettyPrint()
				),
			}),
		],
	});
} else {
	logger = winston.createLogger({
		levels: customeLevel.levels,
		transports: [
			new winston.transports.Console({
				level: "debug",
				format: winston.format.combine(
					winston.format.colorize({ colors: customeLevel.colors }),
					winston.format.simple()
				),
			}),
		],
	});
}

import mongoose from "mongoose";
// import config from "../src/config/dbConfig.js"

// const URI = config.mongo_uri;

mongoose
	.connect("mongodb+srv://dsoo:Jaysriradhe@cluster0.edmnjjr.mongodb.net/ecommerce47310?retryWrites=true&w=majority")
	.then(() => console.log("conectado a la db"))
	.catch((error) => console.log(error));

import mongoose from "mongoose";

const URI =
    "mongodb+srv://dsoo:Jaysriradhe@cluster0.edmnjjr.mongodb.net/mongoose47310?retryWrites=true&w=majority";

mongoose
    .connect(URI)
    .then(() => console.log("conectado a la base de datos"))
    .catch((error) => console.log(error));

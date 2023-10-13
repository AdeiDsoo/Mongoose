import express from "express";
import { __dirname } from "./utils.js";
import handlebars from "express-handlebars";
import "./db/config.js";
import viewsRouter from "./routes/views.router.js";
import productsRouter from "./routes/products.router.js";
import usersRouter from "./routes/users.router.js";
import cartsRouter from "./routes/carts.router.js";
import chatRouter from "./routes/chat.router.js";
import { Server } from "socket.io";
import { messageManager } from "./managers/messagesManager.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

// handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars"); //motor de plantilla con el que trabajamos

//routes
app.use("/", viewsRouter);
app.use("/api/products", productsRouter);
app.use("/api/users", usersRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/messages", chatRouter);

const PORT = 8080;

const httpServer = app.listen(PORT, () => {
    console.log("server is running on port 8080");
});

//socket

const socketServer = new Server(httpServer);

socketServer.on("connection", (socket) => {
    console.log(`Cliente Conectado ${socket.id}`);
    socket.on("disconnect", () => {
        console.log(`Cliente desconectado ${socket.id}`);
    });



    socket.on("bodyMessage", async (message) => {
        const newMessage = await messageManager.createOne(message);
        socket.emit("messageCreated", newMessage);
    });


});

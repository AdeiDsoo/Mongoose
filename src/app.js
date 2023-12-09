import express from "express";
import { __dirname } from "./utils.js";
import handlebars from "express-handlebars";
import "./config/dbConfig.js";
import viewsRouter from "./routes/views.router.js";
import usersRouter from "./routes/users.router.js";
import cartsRouter from "./routes/carts.router.js" ;
import chatRouter from "./routes/chat.router.js"
import ticketsRouter from "./routes/tickets.router.js"
import sessionsRouter from"./routes/sessions.router.js";
import mongoStore from "connect-mongo";
import session from "express-session";
import productsRouter from "./routes/products.router.js";
import passport from "passport"
import "./passport.js"
import config from "./config/config.js";
import { Server } from "socket.io";
import { messagesService } from "./services/messages.service.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));



//session mongo

app.use(
  session({
    secret: config.session_secret,
    cookie: {
      maxAge: 60000,
    },
    store: new mongoStore({
      mongoUrl: config.mongo_uri,
    }),
  })
);

//passport 
app.use(passport.initialize());
app.use(passport.session());


app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use("/", viewsRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/users", usersRouter);
app.use("/api/sessions", sessionsRouter);
app.use("/api/messages", chatRouter);
app.use("/api/tickets", ticketsRouter);

const PORT = config.port;

const httpServer =app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});

const socketServer = new Server(httpServer);

socketServer.on("connection", (socket) => {
    // console.log(`Cliente Conectado ${socket.id}`);
    // socket.on("disconnect", () => {
    //     console.log(`Cliente desconectado ${socket.id}`);
    // });

    socket.on("bodyMessage", async (message) => {
        const newMessage = await messagesService.createOne(message);
        socketServer.emit("messageCreated", newMessage);
    });


});
import express from "express";
import { __dirname } from "./utils/utils.js";
import handlebars from "express-handlebars";
import "./config/dbConfig.js";
import viewsRouter from "./routes/views.router.js";
import usersRouter from "./routes/users.router.js";
import cartsRouter from "./routes/carts.router.js";
import chatRouter from "./routes/chat.router.js";
import ticketsRouter from "./routes/tickets.router.js";
import sessionsRouter from "./routes/sessions.router.js";
import mongoStore from "connect-mongo";
import session from "express-session";
import productsRouter from "./routes/products.router.js";
import mockRouter from "./routes/moking.router.js";
import passport from "passport";
import compression from "express-compression";
import "./utils/passport.js";
import config from "./config/config.js";
import { Server } from "socket.io";
import { messagesService } from "./services/messages.service.js";
import { errorMiddleware } from "./error/error.middleware.js";
import { logger } from "./utils/winston.js";
import mailRouter from "./routes/mail.router.js";
import swaggerUi from "swagger-ui-express";
import { swaggerSetup } from "./utils/swaggerSpecs.js";

const app = express();

app.use(compression({ brotli: { enabled: true, zlib: {} } }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

//session mongo

app.use(
	session({
		secret: config.session_secret,
		cookie: {
			maxAge: 600000,
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
app.use("/api/mocks", mockRouter);
app.use("/api/mail", mailRouter);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSetup));
app.use("/loggerTest", (req, res) => {
	logger.fatal("Fatal");
	logger.error("Error");
	logger.warning("Warning");
	logger.info("Probando Info");
	logger.http("HTTP");
	logger.debug("Debug");
	logger.fatal("hola");
	res.send("Probando winston");
});

app.use(errorMiddleware);

const PORT = config.port;

const httpServer = app.listen(PORT, () => {
	logger.info(`server is running on port ${PORT}`);
});

const socketServer = new Server(httpServer);

socketServer.on("connection", (socket) => {
	// logger.info(`Cliente Conectado ${socket.id}`);
	// socket.on("disconnect", () => {
	//     logger.info(`Cliente desconectado ${socket.id}`);
	// });

	socket.on("bodyMessage", async (message) => {
		const newMessage = await messagesService.createOne(message);
		socketServer.emit("messageCreated", newMessage);
	});
});

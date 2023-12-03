import express from "express";
import { __dirname } from "./utils.js";
import handlebars from "express-handlebars";
import "./config/dbConfig.js";
import viewsRouter from "./routes/views.router.js";
import usersRouter from "./routes/users.router.js";
import cartsRouter from "./routes/carts.router.js" ;
import sessionsRouter from"./routes/sessions.router.js";
import mongoStore from "connect-mongo";
import session from "express-session";
import productsRouter from "./routes/products.router.js";
import cookieParser from "cookie-parser"
import passport from "passport"
import "./passport.js"
import config from "./config/config.js";


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

const PORT = config.port;

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});

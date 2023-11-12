import express from "express";
import { __dirname } from "./utils.js";
import handlebars from "express-handlebars";
import "./db/config.js";
import viewsRouter from "./routes/views.router.js";
import usersRouter from "./routes/users.router.js";
import cartsRouter from "./routes/carts.router.js" ;
import mongoStore from "connect-mongo";
import session from "express-session";
import productsRouter from "./routes/products.router.js";
import cookieParser from "cookie-parser"
import passport from "passport"
import "./passport.js"


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));



//session mongo
const URI =
  "mongodb+srv://dsoo:Jaysriradhe@cluster0.edmnjjr.mongodb.net/ecommerce47310?retryWrites=true&w=majority";

app.use(
  session({
    secret: "SESSION_KEY",
    cookie: {
      maxAge: 60 * 60 * 1000,
    },
    store: new mongoStore({
      mongoUrl: URI,
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

const PORT = 8080;

app.listen(PORT, () => {
  console.log("server is running on port 8080");
});

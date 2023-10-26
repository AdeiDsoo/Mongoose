import express from "express";
import { __dirname } from "./utils.js";
import handlebars from "express-handlebars";
import "./db/config.js";
import viewsRouter from "./routes/views.router.js";
import usersRouter from "./routes/users.router.js";
import mongoStore from "connect-mongo";
import session from "express-session";
import productsRouter from "./routes/products.router.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.use("/api/products", productsRouter);

//session mongo
const URI =
  "mongodb+srv://dsoo:Jaysriradhe@cluster0.edmnjjr.mongodb.net/ecommerce47310?retryWrites=true&w=majority";

app.use(
  session({
    secret: "SESSIONSECRETKEY",
    cookie: {
      maxAge: 60 * 60 * 1000,
    },
    store: new mongoStore({
      mongoUrl: URI,
    }),
  })
);

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use("/", viewsRouter);
app.use("/api/users", usersRouter);

const PORT = 8080;

app.listen(PORT, () => {
  console.log("server is running on port 8080");
});

import express from "express";
import { __dirname } from "./utils.js";
import handlebars from "express-handlebars";
import "./db/config.js";
import viewsRouter from './routes/views.router.js'
import productsRouter from './routes/products.router.js'
import usersRouter from './routes/users.router.js'
import cartsRouter from './routes/carts.router.js'

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");


//routes
app.use('/', viewsRouter)
app.use('/api/products', productsRouter)
app.use('/api/users', usersRouter)
app.use('/api/carts', cartsRouter)

app.listen(8080, () => {
    console.log("server is running on port 8080");
});

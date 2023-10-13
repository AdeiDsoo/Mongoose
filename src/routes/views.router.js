import { Router } from "express";
import { usersManager } from "../managers/usersManager.js";
import { productsManager } from "../managers/productsManager.js";
import { messageManager } from "../managers/messagesManager.js";

const router = Router();

router.get('/signup', (req, res) => {
    res.render("signup")
})

router.get('/createProduct', (req, res) => {
    res.render("createProduct")
})

router.get('/chat', (req, res) => {
    res.render("chat")
})

router.get('/carts', (req, res) => {
    res.render("carts")
})
router.get('/home/:idUser', async (req, res) => {
    const { idUser } = req.params;
    const userInfo = await usersManager.findById(idUser)
    const { first_name, last_name } = userInfo
    const products = await productsManager.findAll()
    res.render("home", { first_name, last_name, products })
})

router.get('/messagesChat', async (req, res)=>{
    const messages = await messageManager.findAll()
    console.log(messages);
    res.render("messagesChat", {  messages })
})
router.get('/chat', async (req, res)=>{
    const messages = await messageManager.findAll()
    console.log(messages);
    res.render("messagesChat", {  messages })
})
// router.get("/realtimeproducts", async(req, res) => {
//     const products = await productsManager.getProducts();
//     res.render("realTimeProducts", { products });
//   });
export default router;

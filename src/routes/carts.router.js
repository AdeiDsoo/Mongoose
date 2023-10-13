import { Router } from "express";
import {cartsManager} from "../managers/cartsManager.js"

const router = Router();

router.post("/", async (req, res) => {
    const { idProduct, qty, total } = req.body;
    if (!idProduct || !qty || !total ) {
      return res.status(400).json({ message: "All data is required" });
    }
  
    try {
      const createCart = await cartsManager.createOne(req.body);
      res.status(200).json({ message: "Cart Created", product: createCart });
      
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });



router.get('/', async(req, res)=>{
  try {
    const carts= await cartsManager.findAll()
    res.status(200).json({ message: "Carts", carts });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
})
router.delete('/:idCart', async(req, res)=>{
  const {idCart}= req.params
  try {
    const cart= await cartsManager.deleteOne(idCart)
    res.status(200).json({ message: "Delete Cart", cart });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
})

router.get('/:idCart', async(req, res)=>{
  const {idCart}= req.params
  try {
    const cart= await cartsManager.findById(idCart)
    res.status(200).json({ message: "Cart", cart });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
})

export default router;

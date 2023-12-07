import { cartsService } from "../services/carts.service.js";

export const findCart = async (req, res) => {
  try {
    const result = await cartsService.findAll();
    res.status(200).json({ carts: result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const findCartById = async (req, res) => {
  const { idCart } = req.params;
  try {
    const cart = await cartsService.findById(idCart);
    res.status(200).json({ message: "Cart Found", cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createCart = async (req, res) => {
  try {
    const newCart = { products: [] };

    const createCart = await cartsService.createOne(newCart);
    res.status(200).json({ message: "Cart created", cart: createCart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addProductToCart = async (req, res) => {
 
  const { idProduct, idCart } = req.params;

  console.log(idCart, 'idCArt')
  try {
    const cart = await cartsService.findById(idCart);
    if (!cart) {
      return res.status(404).json({ message: "cart not found" });
    }
    const product = await cartsService.productFindById(idProduct);
    if (!product) {
      return res.status(404).json({ message: "product not found" });
    }



    if(req.user.cart.id===idCart){

   
  
 

    

    const productIndex = cart.productsCart.findIndex((p) =>
      p.idProduct.equals(idProduct)
    );

    if (productIndex === -1) {
      cart.productsCart.push({ idProduct: idProduct, qty: 1 });
    } else {
      cart.productsCart[productIndex].qty++;
    }

    await cart.save();
  }
    res.status(200).json({ message: "product added" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

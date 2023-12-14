import { cartsService } from "../services/carts.service.js";

export const findCart = async (req, res) => {
  try {
    const result = await cartsService.findAll();
    res.status(200).json({ carts: result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateThisCart = async (req, res) => {
  try {
    const result = await cartsService.updateThisCart();
    res.status(200).json({ cart: result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
 export const findById= async (req, res) => {
  const { idCart } = req.params;
  try {
    const cart = await cartsService.findById(idCart);
    res.status(200).json({ message: "this Cart", cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const findCartById = async (req, res) => {
  const { idCart } = req.params;
  try {
    const cart = await cartsService.findById(idCart);
    const infoThisCart = {
      idCart: req.user.cart._id,
      email: req.user.email,
     products:  JSON.parse(JSON.stringify(cart.productsCart)),
  };
  
  res.render("thisCart", { infoThisCart });
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
  const qtyClientProduct = parseInt(req.body.qty, 10);
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
   
      cart.productsCart.push({ idProduct: idProduct, qty: qtyClientProduct });
    } else {
    
      cart.productsCart[productIndex].qty += qtyClientProduct;
    }

    await cart.save();
  }
//  res.redirect('/ticket');
    res.status(200).json({ message: "product added" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

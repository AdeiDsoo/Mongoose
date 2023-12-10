import { cartsService } from "../services/carts.service.js";
import { productsService } from "../services/products.service.js";

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
    // const idCart = req.user && req.user.cart ? req.user.cart._id : null;

   
      const cart = await cartsService.findById(idCart);
    
      const productsWithDetails = await Promise.all(cart.productsCart.map(async (item) => {
        const product = await productsService.findById(item.idProduct);
        return {
          ...item,
          idProduct: product
        };
      }));
    
      const infoThisCart = {
        idCart: idCart,
        email: req.user.email,
        products: productsWithDetails
      };
    
      console.log(infoThisCart, 'thisCart');
      res.render("thisCart", { infoThisCart });
    
  // res.status(200).json({ message:"cart", cart});
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
 res.redirect('/ticket');
    // res.status(200).json({ message: "product added" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

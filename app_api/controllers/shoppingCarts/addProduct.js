import cartDao from "../../models/shoppingCarts/shoppingCartDao.js";

import userDao from "../../models/users/userDao.js";
import productDao from "../../models/products/productDao.js";

import HTTPerror from "http-errors";

const addProduct = async (req, res, next) => {
  try {
    let user = await userDao.listOne(req.params.id);
    let shoppingCart;
    let idCart;
    // existe el usuario
    if (user) {
      // No existe el carro
      if (!user.ca) {
        shoppingCart = await cartDao.iniciar(req.params.id);
        user = await userDao.addCart(user, shoppingCart._id);
      }else{
          shoppingCart = await cartDao.listOne(user.ca);
      }

      idCart = user.ca;

      if (req.body && req.body.idProduct && req.body.cantidad) {
        let product = await productDao.listOne(req.body.idProduct);
        if(!product){
          next(HTTPerror(400, {message:"id de producto erroneo"}));
        }
        // Hay suficiente stock
        if (product.cantidad >= req.body.cantidad) {
          product = await productDao.addCart(
            product,
            idCart,
            req.body.cantidad
          );
          shoppingCart = await cartDao.addProduct(
            shoppingCart,
            product,
            req.body.cantidad
          );
          res.send(shoppingCart);
        } else{
          next(HTTPerror(400, {message:"no hay suficiente stock"}));
        }
      }else{
        next(HTTPerror(400, {message:"parametros incorrectos"}));
      }
    }else{
      next(HTTPerror(400, {message:"id de usuario incorrecto"}));
    }
  } catch (err) {
    next(HTTPerror(err.code, {message:err.message}));
  }
};

export default addProduct;

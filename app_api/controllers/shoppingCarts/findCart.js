import cartDao from "../../models/shoppingCarts/shoppingCartDao.js";
import userDao from "../../models/users/userDao.js";
import categoryDao from "../../models/categories/categoryDao.js";
import HTTPerror from "http-errors";



const findCart = async (req, res, next) =>{
    try{
        if(req.params.id){
            const user = await userDao.listOne(req.params.id);
            if(!user || !user.ca){
                next(HTTPerror(400, {message:"EL usuario no tiene ese carrito"}));
            }
            let cart = await cartDao.listOnePopulate(user.ca);
            if(!cart){
                next(HTTPerror(400, {message:"carrito incorrecto"}));
            }
            for(let i=0; i<cart.products.length;i++){
                cart.products[i].product.categoria = await categoryDao.listOneCategories(cart.products[i].product.categoria );
            }
            res.send(cart);
        }else{
            next(HTTPerror(400, {message:"parametros incorrectos"}));
        }
    }catch(err){
        next(HTTPerror(err.code, {message:err.message}));
    }
}

export default findCart;
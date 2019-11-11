import mongo from '../../../mongo/MongoManager.js';
import {ShoppingCart} from '../model.js';

class shoppingCartDao {
    constructor(){
        mongo.connect();
    }

    listOne(id){
        return ShoppingCart.findById(id).exec();
    }

    listOnePopulate(id){
        return ShoppingCart.findById(id)
        .populate({path:"products.product",select:{'nombre':1,'categoria':1,'i':1}})
        .exec();
    }

    iniciar(idUser){
        let shoppingCart = new ShoppingCart();
        shoppingCart.user= idUser;
        shoppingCart.products = [];
        return shoppingCart.save();
    }

    addProduct(shoppingCart,product,cantidad){
        let buscar= true;
        shoppingCart.total = parseFloat(shoppingCart.total) + (parseFloat(product.p) * parseFloat(cantidad)); 
        for(let i=0; i< shoppingCart.products.length && buscar; i++){
            if(shoppingCart.products[i].product.equals(product._id)){
                shoppingCart.products[i].cantidad = parseFloat(cantidad) + parseFloat(shoppingCart.products[i].cantidad);
                shoppingCart.products[i].precio = product.p;
                if(product.oferta && product.oferta.descuento){
                    shoppingCart.products[i].descuento = product.oferta.descuento;
                }
                buscar=false;
            }
        }
        if(buscar){
            let productNew;
            if(product.oferta && product.oferta.descuento){
                productNew = {"product": product._id,"precio": product.p,"descuento":product.oferta.descuento, "cantidad": cantidad };
            }
            else{
                productNew = {"product": product._id,"precio": product.p, "cantidad": cantidad};
            }
            shoppingCart.products.push(productNew);
        }

        return shoppingCart.save();
    }

    removeProducts(shoppingCart,product,cantidad){
        let buscar = true;
        let modificar = false;
        for(let i=0; i < shoppingCart.products.length && buscar; i++){
            // console.log(shoppingCart.products[i]);
            // console.log(idProduct);
                if(shoppingCart.products[i].product.equals(product._id)){
                    buscar = false;
                    if(cantidad>= shoppingCart.products[i].cantidad){
                        shoppingCart.total = parseFloat(shoppingCart.total) -  (parseFloat(shoppingCart.products[i].cantidad) * parseFloat(shoppingCart.products[i].precio));
                        product.cantidad = parseFloat(product.cantidad) + parseFloat(shoppingCart.products[i].cantidad);
                        shoppingCart.products.splice(i,1);
                        modificar = true;
                    }
                    else{
                        shoppingCart.total = parseFloat(shoppingCart.total) -  (parseFloat(cantidad) * parseFloat(shoppingCart.products[i].precio));
                        shoppingCart.products[i].cantidad = shoppingCart.products[i].cantidad - cantidad;
                        product.cantidad = parseFloat(product.cantidad) + parseFloat(cantidad);
                    }
                }
        }

        return {"cart": shoppingCart,"product": product,"modificar": modificar};
    }

    guardar(shoppingCart){
        return shoppingCart.save();
    }

}

export default new shoppingCartDao();



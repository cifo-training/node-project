import mongo from '../../../mongo/MongoManager.js';
import {Product} from '../model.js';


class productDAO {
    constructor(){
        mongo.connect();
    }

    create(data){
        let product = new Product();
        if(data.oferta && data.oferta.descuento){
            data.precioUnitario = data.precioUnitario - (data.precioUnitario * (data.oferta.descuento/100));
        }
        Object.assign(product, data);
        return product.save();
    }

    list(){
        return Product.find().exec();
    }

    listAddCategory(){
        return Product.find().populate('categoria').exec();
    }

    listProductsByCategory(id){
            return Product.find()
                .where('categoria').equals(id)
                .populate('categoria')
                .exec();
    }

    listOne(id){
        return Product.findById(id).exec();
    }

    update(id,data){
        data._id= id;
        
        if(!data.oferta || !data.oferta.descuento){
            return Product.findByIdAndUpdate(id,data,{new:true, useFindAndModify:false}).exec();
        }
        else {
            data.precioUnitario = data.precioUnitario - (data.precioUnitario * (data.oferta.descuento/100));
            return Product.findByIdAndUpdate(id,data,{new:true, useFindAndModify:false}).exec();
        }

    
    }

    remove(id){
        return Product.findByIdAndRemove(id,{useFindAndModify:false}).exec();
    }

    addCart(product, idCart, cantidad){
        product.cantidad = product.cantidad - cantidad;
        
        // no esta el carrito en el producto
        if(product.shoppingCart.indexOf(idCart) === -1){
            product.shoppingCart.push(idCart);
        }

        return product.save();
       
    }

    guardar(product, modificar, idCart){
        if(modificar){
            for(let i= 0; i< product.shoppingCart.length && modificar; i++){
                if(product.shoppingCart[i].equals(idCart)){
                    product.shoppingCart.splice(i,1);
                    modificar = false;
                }
            }
        }
        return product.save();
    }

    listProductsByCategory2(){
        return Product.find()
                .populate('categoria')
                .exec();
    }

    paginator(page,elements){
        let pos = page * elements;
        return Product.find().skip(pos).limit(parseInt(elements)).exec();
    }

    update2(product1, data){
        if(product1.oferta && product1.oferta.descuento){
            product1.precioUnitario = product1.precioUnitario + (product1.precioUnitario * (product1.oferta.descuento/100));
            if(!data.oferta){
                product1.oferta={};
            }
        }
        if(data.oferta && data.oferta.descuento){
            data.precioUnitario = data.precioUnitario - (data.precioUnitario * (data.oferta.descuento/100));
        }
        Object.assign(product1, data);
        return product1.save();
    }
}


export default new productDAO();
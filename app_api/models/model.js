import mongoose from 'mongoose';
import userSchema from './users/userSchema.js';
import categorySchema from './categories/categorySchema.js';
import productSchema from './products/productSchema.js';
import shoppingCartSchema from './shoppingCarts/shoppingCartSchema.js';


export const User= mongoose.model("User", userSchema);
export const Category= mongoose.model("Categories", categorySchema);
export const Product = mongoose.model("Product", productSchema);
export const ShoppingCart = mongoose.model("ShoppingCart", shoppingCartSchema);

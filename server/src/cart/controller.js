import Cart from "./model";
import ProductModel from "../product/model";
import UserModel from "user/model"

import pricifyCart from "lib/utils/cart/pricify-cart";


export default {
  getCart: async (req, res) => {
    const thisUser = await UserModel.authorizeUser(req.user)  

    const thisCart = await Cart.findByUserId(thisUser._id)

    const newCart = await pricifyCart(thisCart, ProductModel)

    return res.status(200).json({
      cart: newCart
    })
  },
  addtoCart: async (req, res) => {

    const thisUser = await UserModel.authorizeUser(req.user)

    await Cart.addToCart({ productId: req.body.productId, userId: thisUser._id });

    return res.status(200).json({
      msg: "ok",
    });

  },
  removeItem: async (req, res) => {
    
    print('a')
    const thisUser = await UserModel.authorizeUser(req.user)
    print('b')
    
    await Cart.removeItem({productId: req.body.productId, userId: thisUser._id})
    print('c')

    return res.status(200).json({
      msg: "ok",
    });

  },
  changeItem: async (req, res) => {
    
    const thisUser = await UserModel.authorizeUser(req.user)

    await Cart.changeQuantity({productId: req.body.productId, userId: thisUser._id, quantity: req.body.quantity})

    return res.status(200).json({
      msg: "ok",
    });
  }
  
};

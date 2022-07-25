
import CategoryModel from "category/model";
import UserModel from "user/model"
import pricifyCart from "lib/utils/cart/pricify-cart";
import CartModel from "cart/model";
import ProductModel from "product/model";
import OrderModel from "./model";

export default {
  
  getMyOrders: async (req, res) => {
    
    const thisUser = await UserModel.authorizeUser(req.user)  

  
    const theseOrders = await OrderModel.findByUserId(thisUser._id)

    res.status(200).json(theseOrders)
  },
  checkout: async (req, res) => {
    // get the requester
    const thisUser = await UserModel.authorizeUser(req.user)  

    // cart e karbar ro begirim
    let thisCart = await CartModel.findByUserId(thisUser._id)
    thisCart = await pricifyCart(thisCart, ProductModel)

    console.log(thisCart)
    if (thisCart.items.length === 0 || thisCart.total === 0) throw new Error('cart is empty')

    // create order
    await OrderModel.create({
      cart: thisCart,
      userId: thisUser._id
    })

    await CartModel.MTCart(thisUser._id)

    return res.status(200).json({msg: 'ok'})

  }
}
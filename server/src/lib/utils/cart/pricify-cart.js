

export default async (cart, ProductModel) => {

  const allProducts = await ProductModel.findAll()
  const cache = {}
  allProducts.forEach(item => cache[item._id] = item)

  let total = 0

  cart.items = cart.items.map(item => {

    // print(cache[item._id])
    const price = cache[item.productId].price
    total += item.quantity * price
    return {
      ...item,
      price
    }
  })
  cart.total = total

  return cart
}
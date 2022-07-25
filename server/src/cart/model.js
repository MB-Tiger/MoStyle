import {
  writeFileSync,
  readdirSync,
  existsSync,
  mkdirSync,
  readFileSync,
} from "fs";
import path from "path";
import UID from "lib/utils/UID";

const dbDirectory = path.join(process.cwd(), "/src/cart/db");
const productDbDirectory = path.join(process.cwd(), "/src/product/db");

if (!existsSync(dbDirectory)) {
  mkdirSync(dbDirectory)
}


class CartSchema {

  constructor() {
    this.cache = null;
    this.doesCacheneedsUpdate = true;
  }

  async addToCart({ productId, userId }) {
    
    try {
      
      if (!productId) throw new Error("bad input")
      
      let thisCart = await this.findByUserId(userId)

      if (!thisCart) {

        thisCart =  {
          _id: UID("ECC"),
          items: [],
          userId,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }

      }

      const p = thisCart.items.findIndex(item => item.productId == productId)

      if (p === -1) {
        thisCart.items.push({
          productId,
          quantity: 1
        })
      }

      writeFileSync(
        path.join(
          dbDirectory,
          `${thisCart._id}.txt`,
        ),
        JSON.stringify(thisCart),
        "utf8"
      );

      this.doesCacheneedsUpdate = true;

    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      if (!this.doesCacheneedsUpdate && this.cache) return this.cache;

      const result = readdirSync(dbDirectory).map((item) => {
        return JSON.parse(
          readFileSync(path.join(dbDirectory, item), {
            encoding: "utf-8",
          })
        );
      });

      this.cache = result;
      this.doesCacheneedsUpdate = false;

      return result;

    } catch (error) {
      console.log("Error in findAll");
      console.log(error);

      return [];
    }
  }

  async findByUserId(userId) {
    try {
      const allCart = deepClone(await this.findAll())

      return allCart.find(cart => cart.userId == userId)

    } catch (error) {
      throw error
    }
  }

  async removeItem({ userId, productId }) {
    
    try {
      
      const thisCart = deepClone(await this.findByUserId(userId))
      
      if (!thisCart) throw new Error('wtf')
      
      const p = thisCart.items.findIndex(item => item.productId == productId)

      if (p != -1) {
        thisCart.items.splice(p, 1)

        writeFileSync(
          path.join(
            dbDirectory,
            `${thisCart._id}.txt`,
          ),
          JSON.stringify(thisCart),
          "utf8"
        );
  
        this.doesCacheneedsUpdate = true
      }

    } catch (error) {
      throw error
    }
  }

  async changeQuantity({ userId, productId, quantity }) {
    try {
      
      const thisCart = deepClone(await this.findByUserId(userId))

      if (!thisCart) throw new Error('wtf')

      const p = thisCart.items.findIndex(item => item.productId == productId)
    
      if (p === -1) throw new Error('bad request: no such product exists')

      thisCart.items[p].quantity = quantity

      writeFileSync(
        path.join(
          dbDirectory,
          `${thisCart._id}.txt`,
        ),
        JSON.stringify(thisCart),
        "utf8"
      );

      this.doesCacheneedsUpdate = true


    } catch (error) {
      throw error
    }



  }

  async MTCart(userId) {
    const thisCart = deepClone(await this.findByUserId(userId))

    thisCart.items.length = 0

    writeFileSync(
      path.join(
        dbDirectory,
        `${thisCart._id}.txt`,
      ),
      JSON.stringify(thisCart),
      "utf8"
    );

    this.doesCacheneedsUpdate = true
  }



  // async calculateTotalPrice (_id) {
  //   try {

  //     const allProductsCart = await this.findAll()

  //     const thisProducts = await Product.findAll();
      
  //     const thisCalculatePrice = allProductsCart.reduce((acc, cur) => {
  //       const thisProduct = thisProducts.find((product) => product.id == cur.id);
  //       return acc + thisProduct.quantity * thisProduct.price
  //     })

  //     return thisCalculatePrice
      
  //   } catch (error) {
  //     throw error;
  //   }
  // }

}

const CartModel = new CartSchema();

export default CartModel;

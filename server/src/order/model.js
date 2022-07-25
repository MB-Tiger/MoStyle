import {
  writeFileSync,
  readdirSync,
  existsSync,
  mkdirSync,
  readFileSync,
} from "fs";
import path from "path";
import UID from "lib/utils/UID";


const dbDirectory = path.join(process.cwd(), "/src/order/db");


if (!existsSync(dbDirectory)) {
  mkdirSync(dbDirectory)
}

class OrderSchema {
  constructor() {
    this.cache = null;
    this.doesCacheneedsUpdate = true;
  }

  async create({ cart, userId }) {
    if (!cart || !userId) throw new Error('bad input')

    const len = (await this.findAll()).length
    
    const thisOrder = {
      _id: UID('ECO'),
      cart,
      userId,
      sn: 100001 + len,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
                    // path                                         // mohtawa                // options
    writeFileSync(path.join(dbDirectory, `${thisOrder._id}.txt`), JSON.stringify(thisOrder), "utf8")

    this.doesCacheneedsUpdate = true

  }

  async findAll() {
    try {

      if (!this.doesCacheneedsUpdate && this.cache) return this.cache

      const result = readdirSync(dbDirectory).map(item => {

        return JSON.parse(readFileSync(path.join(dbDirectory, item), {
          encoding: "utf8",
        }))

      })
      
      this.cache = result
      this.doesCacheneedsUpdate = false
      
      return result

    } catch (error) {
      console.log('error in find all')
      console.log(error)
      return []
    }
  }

  async findByUserId(userId) {
    const allOrders = deepClone(await this.findAll())

    return allOrders.filter(item => item.userId == userId)

  }

}

const OrderModel = new OrderSchema();

export default OrderModel;

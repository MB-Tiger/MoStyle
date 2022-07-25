import {
  writeFileSync,
  readdirSync,
  existsSync,
  mkdirSync,
  readFileSync,
} from "fs";
import path from "path";
import UID from "lib/utils/UID";
import jwt from "jsonwebtoken";

const dbDirectory = path.join(process.cwd(), "/src/rate/db");
const productDbDirectory = path.join(process.cwd(), "/src/product/db");


class RateSchema {
  constructor() {
    this.cache = null;
    this.doesCacheneedsUpdate = true;
  }

  async findById(_id) {
    try {
      const thisProduct = JSON.parse(
        readFileSync(path.join(productDbDirectory, `${_id}.txt`), {
          encoding: "utf8",
        })
      );

      return thisProduct;
    } catch (error) {
      console.log("Error in findById");
      console.log(error);

      return null;
    }
  }

  async rateBlog({ productId, userId, score }) {
    try {

      if (!productId || !score) throw new Error('bad request: bad input')
      
      const thisProduct = await this.findById(productId)

      if (!thisProduct || !thisProduct._id) throw new Error('bad request: no such product exists')

      thisProduct.scores[UID()] = score
      const arr = Object.entries(thisProduct.scores)
      const averageScore = arr.reduce((acc, [_, value]) => {
        return acc + value
      }, 0) / arr.length
      thisProduct.averageScore = averageScore

      writeFileSync(path.join(productDbDirectory, `${thisProduct._id}.txt`), JSON.stringify(thisProduct), "utf8")
      this.doesCacheneedsUpdate = true

      return 'ok'


    } catch (error) {
      throw error
    }
  }

}

const RateModel = new RateSchema();

export default RateModel;

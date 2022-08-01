import {
  writeFileSync,
  readdirSync,
  existsSync,
  mkdirSync,
  readFileSync,
} from "fs";
import path from "path";
import UID from "lib/utils/UID";


const dbDirectory = path.join(process.cwd(), "/src/product/db");


if (!existsSync(dbDirectory)) {
  mkdirSync(dbDirectory)
}

/*

  "variables": {
    "cpu": ["coreI7"],
    "moreInfo": ["kheyli qashange too jibam ja mishe taze"],
    "ports": ["hdmi", "wifi"]
  }


*/

class ProductSchema {
  constructor() {
    this.cache = null;
    this.doesCacheneedsUpdate = true;
  }

  async create(data) {
    
    try {
      
      const { title, price, quantity, description, isAvalible, images, categoryId, variables } = data;

      if (
        !title ||
        !price ||
        isNaN(Number(price)) ||
        !quantity ||
        isNaN(Number(quantity)) ||
        !description ||
        !images ||
        !Array.isArray(images)  ||
        !images[0] ||
        !categoryId ||
        !variables

      ) throw new Error("bad input");

      Object.entries(variables).forEach(([key, value]) => {
        print(value)
        if (!Array.isArray(value)) throw new Error('bad input')
      })

      const thisProduct = {
        _id: UID("ECP"),
        title,
        price,
        quantity,
        isAvalible: isAvalible ? isAvalible : false,
        description,
        categoryId,
        variables,
        images,
        averageScore: 0,
        scores: {},
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      writeFileSync(
        path.join(
          dbDirectory,
          `${thisProduct._id}.txt`,
        ),
        JSON.stringify(thisProduct),
        "utf8"
      );

      this.doesCacheneedsUpdate = true;

      return thisProduct;
      
    } catch (error) {
      printError('[error in create product ]', error)
      throw error;
    }
  }

  async findAll() {
    try {
      if (!this.doesCacheneedsUpdate || this.cache) return this.cache;

      const result = readdirSync(dbDirectory).map((item) => {
        const thisProduct = JSON.parse(
          readFileSync(path.join(dbDirectory, item), {
            encoding: "utf-8",
          })
        );

        return thisProduct;
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

  async findById(_id) {
    try {
      const thisProduct = JSON.parse(
        readFileSync(path.join(dbDirectory, `${_id}.txt`), {
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

  async findByIdAndUpdate(_id, data) {
    try {
      const thisProduct = await this.findById(_id);

      Object.entries(data).forEach(([key, value]) => thisProduct[key] = value)

      thisProduct.updatedAt = new Date().toISOString();

      writeFileSync(
        path.join(
          dbDirectory,
          `${thisProduct._id}.txt`,
          ),
          JSON.stringify(thisProduct),
          "utf8"
      );

      this.doesCacheneedsUpdate = true;

      return "ok";

    } catch (error) {
      throw error;
    }
  }

  async getTopProducts(number) {
    try {

      return deepClone(await this.findAll())
        .sort((a, b) => b.averageScore - a.averageScore)
        .slice(0, number);

    } catch (error) {
      console.log("Error in getTopProducts");
      console.log(error);

      return [];
    }
  }
}

const ProductModel = new ProductSchema();

export default ProductModel;

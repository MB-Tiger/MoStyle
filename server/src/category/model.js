import {
  writeFileSync,
  readdirSync,
  existsSync,
  mkdirSync,
  readFileSync,
} from "fs";
import path from "path";
import UID from "lib/utils/UID";
import checkIfObject from "lib/utils/checkIfObject";

const dbDirectory = path.join(process.cwd(), "/src/category/db");

if (!existsSync(dbDirectory)) {
  mkdirSync(dbDirectory)
}

/* 

  {
    id: someid  
    name: 'mobile',
    variables: {
      cpu: {
        type: 'select'
        options: [], // only if it is select
      },
      moreInfo: {
        type: 'text',
      },
      ports: {
        type: 'multiselect',
        options: ['usb', 'hdmi', 'wifi']
      }
    }
  }

*/


class CategorySchema {

  constructor() {
    this.cache = null;
    this.doesCacheneedsUpdate = true;
  }

  async create({ name, variables }) {
    
    if (!name) throw new Error('category should have a name')
    if (!variables) throw new Error('category should have variables')

    checkIfObject(variables, 'variables')

    Object.entries(variables).forEach(([key, val]) => {
      if (val.type === 'text') return

      if (!val.options || !Array.isArray(val.options) || !val.options.length) throw new Error('select and multiselect types should have options as an array')

      val.options.forEach(item => {
        if (typeof item !== 'string') throw new Error('options should be array of strings')
      })
    })

    const thisCategory = {
      _id: UID('cat'),
      name,
      variables,
      del: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    writeFileSync(
      path.join(
        dbDirectory,
        `${thisCategory._id}.txt`,
      ),
      JSON.stringify(thisCategory),
      "utf8"
    );

    this.doesCacheneedsUpdate = true;

    return thisCategory;

  }

  async findAll() {
    try {
      if (!this.doesCacheneedsUpdate || this.cache) return this.cache;

      const result = readdirSync(dbDirectory).map((item) => {
        const thisCategory = JSON.parse(
          readFileSync(path.join(dbDirectory, item), {
            encoding: "utf-8",
          })
        );

        return thisCategory;
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
      const thisCategory = JSON.parse(
        readFileSync(path.join(dbDirectory, `${_id}.txt`), {
          encoding: "utf8",
        })
      );

      return thisCategory;

    } catch (error) {
      console.log("Error in findById");
      console.log(error);

      return null;
    }
  }

  async compareVariables(_id, variables) {
    try {
      
      if (!variables) throw new Error('product should have a variable object')

      const thisCategory = await this.findById(_id)

      if (!thisCategory) throw new Error('no such category exists in the database')


      Object.entries(thisCategory.variables).forEach(([key, value]) => {
        if (!(key in variables)) throw new Error(`key ${key} doenst exists in variables `)
       
        if (!Array.isArray(variables[key]) || !variables[key].length) throw new Error(`value of ${key} either is not an array or has no children`)

        if (value.type === 'select') {
          if (variables[key].length !== 1) throw new Error('select should only have one option') 
        }

      })

    } catch (error) {
      throw error      
    }
  }
  async deleteCategory(_id) {
    try {

      const thisCategory = deepClone(await this.findById(_id))

      if (!thisCategory) throw new Error('no such category exists in the database')
      thisCategory.del = !thisCategory.del

      thisCategory.updatedAt = new Date().toISOString();

      writeFileSync(
      path.join(
        dbDirectory,
        `${thisCategory._id}.txt`,
        ),
        JSON.stringify(thisCategory),
        "utf8"
      );

      this.doesCacheneedsUpdate = true;
      return thisCategory
    } catch (error) {
      print('salam')
      throw error      
    }
  }
} 


const CategoryModel = new CategorySchema();

export default CategoryModel;

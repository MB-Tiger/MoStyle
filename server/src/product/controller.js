import Product from "./model";
import CategoryModel from "category/model";
import { requireAdminAuth } from 'lib/utils/adminAuth'
import AdminModel from 'admin/model'

export default {
  createProduct: async (req, res) => {

    try {

      const thisAdmin = await AdminModel.authorizeAdmin(req.admin)

      const { categoryId, variables, ...rest } = req.body
      
      await CategoryModel.compareVariables(categoryId, variables)

      const thisCategory = await CategoryModel.findById(categoryId)
      if (thisCategory.del === true) throw new Error('no such category exists in the database') 

      const thisProduct = await Product.create({ categoryId, variables, ...rest });
      
      return res.status(201).json({
        msg: "successfully created this product",
        _id: thisProduct._id,
      });
    } catch (error) {
      printError(error)
      return res.status(500).json({ msg: error.message });
    }
  },
  editProduct: async (req, res) => {
    try {
      const thisAdmin = await AdminModel.authorizeAdmin(req.admin)

      if (!req.body.productId || !req.body.data) throw new Error("bad request: bad inputs");

      const realData = {
        title: req.body.data.title,
        price: req.body.data.price,
        quantity: req.body.data.quantity,
        isAvalible: req.body.data.isAvalible,
        description: req.body.data.description,
        images: req.body.data.images,
      };

      const thisProduct = await Product.findById(req.body.productId);

      if (!thisProduct) throw new Error("thisProduct not found");

      await Product.findByIdAndUpdate(thisProduct._id, realData);

      return res.status(200).json({ msg: "Product successfully edited" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getAllProducts: async (req, res) => {
    try {
      const page = req.body.page ? Number(req.body.page) : 0;
      const limit = req.body.limit ? Number(req.body.limit) : 10;

      const products = deepClone(await Product.findAll());

      return res.json(products.slice(page * limit, (page + 1) * limit));
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getSingleProduct: async (req, res) => {

    try {
      const thisProduct = deepClone(
        await Product.findById(String(req.params._id))
      );

      if (!thisProduct)
        return res
          .status(500)
          .json({ msg: "bad request: no such Product exists" });

      return res.json(thisProduct);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getTopProducts: async (req, res) => {

    try {

      const number = req.query.number && !isNaN(Number(req.query.number)) ? Number(req.query.number) : 3

      const thisProducts = deepClone(await Product.getTopProducts(number));

      return res.status(200).json(thisProducts);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

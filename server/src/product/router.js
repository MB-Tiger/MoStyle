import express from "express";
import ProductController from "./controller";

import adminAuth from 'lib/utils/adminAuth'

const router = express.Router();

router.post("/create", adminAuth, ProductController.createProduct);

router.post("/edit", adminAuth,  ProductController.editProduct);

router.get("/", ProductController.getAllProducts);

router.get("/top-products", ProductController.getTopProducts);

router.get("/:_id", ProductController.getSingleProduct);

export default router;

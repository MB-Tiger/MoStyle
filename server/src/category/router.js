
import express from "express";

import CategoryController from './controller'

const router = express.Router();

router.post('/create', CategoryController.createCategory)

router.get('/', CategoryController.getCategories)

export default router;
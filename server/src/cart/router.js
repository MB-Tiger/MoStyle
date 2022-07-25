import express from "express";
import CartController from "./controller";
import userAuth from "lib/utils/userAuth";
import asyncHandler from "lib/utils/asyncHandler";

const router = express.Router();

router.get('/', asyncHandler(CartController.getCart))
router.post("/add", asyncHandler(CartController.addtoCart));

router.post("/remove", asyncHandler(CartController.removeItem));
router.post("/change", asyncHandler(CartController.changeItem));

export default router;

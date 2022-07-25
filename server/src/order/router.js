import express from "express";
import OrderController from "./controller";
import asyncHandler from "lib/utils/asyncHandler";

const router = express.Router();


router.get('/my-orders', asyncHandler(OrderController.getMyOrders))
router.post('/check-out', asyncHandler(OrderController.checkout))


export default router;

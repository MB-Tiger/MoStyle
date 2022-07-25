import express from "express";
import RateController from "./controller";
import userAuth from "lib/utils/userAuth";

const router = express.Router();

router.post("/submit", RateController.sumbitRate);

export default router;

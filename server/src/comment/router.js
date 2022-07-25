import express from "express";
import CommentController from "./controller";
// import authorizeUser from '../user/model/authorizeUser'
// import adminAuth from 'lib/utils/adminAuth'

const router = express.Router();

router.post("/submit", CommentController.createComment);

router.get("/:id", CommentController.getComment);

export default router;

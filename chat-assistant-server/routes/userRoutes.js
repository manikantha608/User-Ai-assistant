import express from "express";
import { getUser,loginUser,registerUser } from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const userRouter = express.Router();

userRouter.post("/register",registerUser)
userRouter.post("/login",loginUser)
userRouter.get("/data",authMiddleware,getUser)

export default userRouter;
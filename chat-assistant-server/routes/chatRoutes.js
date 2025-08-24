import express from "express"
import { createChat, deleteChat, getChats } from "../controllers/chatController.js"
import { authMiddleware } from "../middlewares/authMiddleware.js";

const chatRouter = express.Router();

chatRouter.get("/create",authMiddleware,createChat)
chatRouter.get("/get",authMiddleware,getChats)
chatRouter.post("/delete",authMiddleware,deleteChat)

export default chatRouter;
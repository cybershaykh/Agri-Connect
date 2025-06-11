import express from "express";
import { blockUser, getAllUsers } from "../controllers/adminController.js";
import { isAdmin } from "../middlewares/middleware.js";

const adminRoute = express.Router();

adminRoute.get("/getAll", isAdmin, getAllUsers);
adminRoute.post("/blockUser", isAdmin,  blockUser);

export default adminRoute;
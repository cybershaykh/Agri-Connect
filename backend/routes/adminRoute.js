import express from "express";
import { blockUser, getAllUsers } from "../controllers/adminController.js";

const adminRoute = express.Router();

adminRoute.get("/getAll", getAllUsers);
adminRoute.post("/blockUser", blockUser);

export default adminRoute;
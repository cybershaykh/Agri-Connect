import express from "express";
import { adminLogin, adminRegister, blockUser, getAllUsers } from "../controllers/adminController.js";
import { isAdmin } from "../middlewares/middleware.js";

const adminRoute = express.Router();

adminRoute.post("/admin/register", adminRegister);
adminRoute.post("/admin/login", adminLogin);
adminRoute.get("/getAll", isAdmin, getAllUsers);
adminRoute.post("/blockUser", isAdmin,  blockUser);

export default adminRoute;
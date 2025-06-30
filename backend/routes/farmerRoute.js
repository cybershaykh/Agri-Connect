import express from "express";
import { approveFarmer, deleteFarmer, getAllFarmers, getFarmerWithToken, loginFarmer, logoutFarmer, registerFarmer } from "../controllers/farmerController.js";

const farmerRoute = express.Router();

farmerRoute.post("/register", registerFarmer);
farmerRoute.post("/login", loginFarmer);
farmerRoute.post("/logout", logoutFarmer);
farmerRoute.get("/getall", getAllFarmers);
farmerRoute.delete("/delete/:id", deleteFarmer);
farmerRoute.get("/me", getFarmerWithToken);
farmerRoute.put("approve", approveFarmer);

export default farmerRoute;
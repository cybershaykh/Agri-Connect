import express from "express";
import { getAllFarmers, getFarmerWithToken, loginFarmer, logoutFarmer, registerFarmer } from "../controllers/farmerController.js";

const farmerRoute = express.Router();

farmerRoute.post("/register", registerFarmer);
farmerRoute.post("/login", loginFarmer);
farmerRoute.post("/logout", logoutFarmer);
farmerRoute.get("/getall", getAllFarmers);
farmerRoute.get("/me", getFarmerWithToken);

export default farmerRoute;
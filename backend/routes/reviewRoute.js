import express from "express";
import { addReview } from "../controllers/reviewController.js";


const reviewRoute = express.Router()

reviewRoute.post("/add", addReview);

export default reviewRoute;
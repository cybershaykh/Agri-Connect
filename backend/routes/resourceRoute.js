import express from 'express';
import { createResource, deleteResource, getAllResources, getResourceById, updateResource } from '../controllers/resourceController.js';


const resourceRoute = express.Router();

resourceRoute.post("/create", createResource);
resourceRoute.get("/getall", getAllResources);
resourceRoute.get("/:id", getResourceById);
resourceRoute.put("/update/:id", updateResource);
resourceRoute.delete("/delete/:id", deleteResource);

export default resourceRoute;
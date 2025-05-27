import resourceModel from "../models/resourceModel.js";


// create a new resource
export const createResource = async (req, res) => {
    try {
        const { title, content, type, url } = req.body;

        if (!title || !content || !type) {
            return res.status(400).json({ error: "❌ Title, content, and type are required." });
        }

        const newResource = new resourceModel({
            title,
            content,
            type,
            url,
            // createdBy: req.user._id, 
        });

        const savedResource = await newResource.save();
        res.status(201).json({
            success: true,
            message: "✅ Resource created successfully.",
            resource: savedResource
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "❌ Internal server error." });
    }
}
// get all resources
export const getAllResources = async (req, res) => {
    try {
        const resources = await resourceModel.find().sort({ createdAt: -1});
        res.status(200).json({
            success: true,
            message: "✅ Resources fetched successfully.",
            resources
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "❌ Internal server error." });
    }
}
// get a resource by id
export const getResourceById = async (req, res) => {
    try {
        const resource = await resourceModel.findById(req.body.id);
        if (!resource) {
            return res.status(404).json({ error: "❌ Resource not found." });
        }
        res.status(200).json({
            success: true,
            message: "✅ Resource fetched successfully.",
            resource
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "❌ Internal server error." });
    }
}

// update a resource
export const updateResource = async (req, res) => {
    try {
        const { title, content, type, url } = req.body;

        if (!title || !content || !type) {
            return res.status(400).json({ error: "❌ ID, title, content, and type are required." });
        }

        const resource = await resourceModel.findByIdAndUpdate(req.body.id,);
        if (!resource) {
            return res.status(404).json({ error: "❌ Resource not found." });
        }

        resource.title = title;
        resource.content = content;
        resource.type = type;
        resource.url = url;

        const updatedResource = await resource.save();
        res.status(200).json({
            success: true,
            message: "✅ Resource updated successfully.",
            resource: updatedResource
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "❌ Internal server error." });
    }
}

// delete a resource
export const deleteResource = async (req, res) => {
    try {
        const resource = await resourceModel.findByIdAndDelete(req.body.id);
        if (!resource) {
            return res.status(404).json({ error: "❌ Resource not found." });
        }
        res.status(200).json({
            success: true,
            message: "✅ Resource deleted successfully.",
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "❌ Internal server error." });
    }
}
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../utils/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: "agricconnect", // your Cloudinary folder
    resource_type: "image",
    format: "webp", // or auto
    public_id: `${Date.now()}-${file.originalname.split(".")[0]}`,
  }),
});

const upload = multer({ storage });
export default upload;

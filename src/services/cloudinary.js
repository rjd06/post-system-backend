import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";

// config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// STORAGE

export const storage = new CloudinaryStorage({
    cloudinary, 
    params: async(req, file)=>{
        const  folder = "mern-posts";
const resource_type = file.mimetype.startsWith("video") ? "video" : 'image';
return {folder, resource_type, allowed_formats: ["jpg", "jpeg", "png", "webp", "mp4", "mov"]};
    }
});

export const upload = multer({storage});
export {cloudinary};
import { v2 as cloudinary } from "cloudinary";
import { Express } from "express";

const uploadToCloudinary = async (file: Express.Multer.File): Promise<string> => {
  try {
    const result = await cloudinary.uploader.upload(file.path);
    return result.secure_url;
  } catch (error) {
    throw new Error("Falha ao enviar a imagem para o Cloudinary");
  }
};

export { uploadToCloudinary };
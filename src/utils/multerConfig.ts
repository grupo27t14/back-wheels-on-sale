import multer, { StorageEngine } from "multer";
import { Request } from "express";

const storage: StorageEngine = multer.diskStorage({
  destination: "uploads",
  filename: (request: Request, file: Express.Multer.File, callback: (error: Error | null, filename: string) => void) => {
    const filename = `${file.originalname}`;
    callback(null, filename);
  },
});

const upload = multer({ storage });

export { upload };
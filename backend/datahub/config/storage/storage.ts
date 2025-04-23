import multer from "multer";
import path from "path";
import fs from "fs";

export function createStorage(uploadDir: string) {
    return multer.diskStorage({
        destination: (req, file, cb) => {
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, { recursive: true });
            }
            cb(null, uploadDir);
        },
        filename: (req, file, cb) => {
            cb(null, `${Date.now()}-${file.originalname}`);
        },
    });
}

export function createImageUploader(uploadDir: string) {
    return multer({
        storage: createStorage(uploadDir),
        limits: { fileSize: 5 * 1024 * 1024 },
        fileFilter: (req, file, cb) => {
            const allowedTypes = /jpeg|jpg|png|gif/;
            const extname = allowedTypes.test(
                path.extname(file.originalname).toLowerCase()
            );
            const mimetype = allowedTypes.test(file.mimetype);

            if (extname && mimetype) {
                return cb(null, true);
            } else {
                cb(new Error("Only image files are allowed!"));
            }
        },
    });
}

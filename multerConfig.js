import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("storage");
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    console.log("filename");
    const extname = path.extname(file.originalname);
    const uniqueFilename = `${Date.now()}${extname}`;
    cb(null, uniqueFilename);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed"));
  }
};

const upload = multer({ storage, fileFilter });

export default upload;

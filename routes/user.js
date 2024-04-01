import express from "express";
import { UserController } from "../controller/index.js";
import protect from "../middleware/authMiddleware.js";
const router = express.Router();

router.get("/profile", protect, UserController.getUserProfile);

router.put("/profile", protect, UserController.updateUserProfile);

router.post("/addmanga", protect, UserController.addingManga);

router.get("/viewlist", protect, UserController.viewingManga);

router.put("/edit/:id", protect, UserController.editingManga);

router.delete("/delete/:id", protect, UserController.deletingManga);

router.post("/upload", protect, UserController.uploadImage);

export default router;

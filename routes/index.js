import express from "express";
const router = express.Router();
import userRoutes from "./user.js";
import authRoutes from "./auth.js";

router.use("/user", userRoutes);
router.use("/auth", authRoutes);

export default router;

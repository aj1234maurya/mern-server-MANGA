import express from "express";
import { AuthController } from "../controller/index.js";
const router = express.Router();

router.post("/", AuthController.loginUser);

router.post("/register", AuthController.registerUser);

router.post("/logout", AuthController.logoutUser);

export default router;

import express from "express";
import PlatformController from "../controllers/platform.controller.js";

const router = express.Router();

router.get("/", PlatformController.getPlatforms);
router.post("/", PlatformController.createPlatform);

export default router;

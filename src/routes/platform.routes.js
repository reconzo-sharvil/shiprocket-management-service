import express from "express";
import PlatformController from "../controllers/platform.controller.js";

const router = express.Router();

router.get("/", PlatformController.getPlatforms);
router.post("/", PlatformController.createPlatform);
router.put("/:platformName", PlatformController.updatePlatform);
router.get("/:platformName", PlatformController.getPlatformByName);

export default router;

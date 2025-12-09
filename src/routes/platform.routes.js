import express from "express";
import PlatformController from "../controllers/platform.controller.js";

const router = express.Router();

router.get("/", PlatformController.getPlatforms);
router.post("/", PlatformController.createPlatform);
router.put("/:resourceName", PlatformController.updatePlatform);
router.delete("/:resourceName", PlatformController.deletePlatform);
router.get("/:resourceName", PlatformController.getPlatformByName);

export default router;

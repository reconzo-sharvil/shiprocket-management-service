import express from "express";
import PlatformController from "../controllers/platform.controller.js";
import validate from "../middlewares/validation.middleware.js";
import {
  createPlatformSchema,
  updatePlatformSchema,
  platformParamsSchema,
} from "../schema/validation.schemas.js";

const router = express.Router();

router.get("/", PlatformController.getPlatforms);

router.post(
  "/",
  validate(createPlatformSchema),
  PlatformController.createPlatform
);

router.get(
  "/:resourceName",
  validate(platformParamsSchema),
  PlatformController.getPlatformByName
);

router.put(
  "/:resourceName",
  validate(updatePlatformSchema),
  PlatformController.updatePlatform
);

router.delete(
  "/:resourceName",
  validate(platformParamsSchema),
  PlatformController.deletePlatform
);

export default router;

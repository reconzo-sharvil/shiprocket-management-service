import express from "express";
import ClientPlatformMappingController from "../controllers/client_platform_mapping.controller.js";

const router = express.Router();

router.get("/:ownerName", ClientPlatformMappingController.getMappings);
router.post(
  "/:ownerName/:resourceName",
  ClientPlatformMappingController.createMapping
);
router.delete(
  "/:ownerName/:resourceName",
  ClientPlatformMappingController.deleteMapping
);

export default router;

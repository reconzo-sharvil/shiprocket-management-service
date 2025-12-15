import express from "express";
import ClientPlatformMappingController from "../controllers/client_platform_mapping.controller.js";
import validate from "../middlewares/validation.middleware.js";
import {
  mappingParamsSchema,
  mappingOwnerSchema,
} from "../schema/validation.schemas.js";

const router = express.Router();

router.get(
  "/:ownerName",
  validate(mappingOwnerSchema),
  ClientPlatformMappingController.getMappings
);

router.post(
  "/:ownerName/:resourceName",
  validate(mappingParamsSchema),
  ClientPlatformMappingController.createMapping
);

router.delete(
  "/:ownerName/:resourceName",
  validate(mappingParamsSchema),
  ClientPlatformMappingController.deleteMapping
);

export default router;

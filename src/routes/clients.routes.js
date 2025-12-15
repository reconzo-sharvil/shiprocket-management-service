import express from "express";
import ClientController from "../controllers/clients.controller.js";
import validate from "../middlewares/validation.middleware.js";
import {
  createClientSchema,
  updateClientSchema,
  clientByOwnerSchema,
  clientByOwnerAndResourceSchema,
} from "../schema/validation.schemas.js";

const router = express.Router();

router.get(
  "/:ownerName/status",
  validate(clientByOwnerSchema),
  ClientController.getClientStatus
);

router.get(
  "/:ownerName",
  validate(clientByOwnerSchema),
  ClientController.getClient
);

router.get(
  "/:ownerName/:resourceName",
  validate(clientByOwnerAndResourceSchema),
  ClientController.getClientByPlatform
);

router.post(
  "/:ownerName/:resourceName",
  validate(createClientSchema),
  ClientController.createClient
);

router.put(
  "/:ownerName/:resourceName",
  validate(updateClientSchema),
  ClientController.updateClient
);

router.delete(
  "/:ownerName/:resourceName",
  validate(clientByOwnerAndResourceSchema),
  ClientController.deleteClient
);

export default router;
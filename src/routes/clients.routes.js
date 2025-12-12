import express from "express";
import ClientController from "../controllers/clients.controller.js";

const router = express.Router();

router.get("/:ownerName/status", ClientController.getClientStatus);
router.get("/:ownerName/:resourceName", ClientController.getClientByPlatform);
router.get("/:ownerName", ClientController.getClient);
router.post("/:ownerName/:resourceName", ClientController.createClient);
router.put("/:ownerName/:resourceName", ClientController.updateClient);
router.delete("/:ownerName/:resourceName", ClientController.deleteClient);

export default router;

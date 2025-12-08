import express from "express";
import ClientController from "../controllers/clients.controller.js";

const router = express.Router();

router.get("/:clientName", ClientController.getClient);
router.post("/:clientName/:platform", ClientController.createClient);
router.put("/:clientName", ClientController.updateClient);
router.get("/:clientName/status", ClientController.getClientStatus);

export default router;

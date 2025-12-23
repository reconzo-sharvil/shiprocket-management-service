import express from "express";
import ShiprocketController from "../controllers/shiprocket.controller.js";

const router = express.Router();

router.post("/auth/token", ShiprocketController.getShiprocketAuthToken);
router.post("/reports/all", ShiprocketController.getAllReports);

export default router;

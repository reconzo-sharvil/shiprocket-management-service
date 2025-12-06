import express from "express";
import clientsRoutes from "./clients.routes.js";
import platformRoutes from "./platform.routes.js";

const router = express.Router();

router.use("/clients", clientsRoutes);
router.use("/platforms", platformRoutes);

export default router;
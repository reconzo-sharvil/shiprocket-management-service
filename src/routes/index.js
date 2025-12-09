import express from "express";
import clientsRoutes from "./clients.routes.js";
import platformRoutes from "./platform.routes.js";
import clientPlatformMappingRoutes from "./client_platform_mapping.routes.js";

const router = express.Router();

router.use("/clients", clientsRoutes);
router.use("/platforms", platformRoutes);
router.use("/mappings", clientPlatformMappingRoutes);

export default router;

import express from "express";
import shiprocketRoutes from "./shiprocket.routes.js";

const router = express.Router();

router.use("/shiprocket", shiprocketRoutes);

export default router;

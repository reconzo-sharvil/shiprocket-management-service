import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import routes from "./routes/index.js";
import authenticateApiKey from "./middlewares/auth.middleware.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Public route (no authentication)
app.get("/", (req, res) => {
  res.send("Server is running");
});

// Protected routes - Apply authentication middleware
app.use("/api/v1", authenticateApiKey, routes);

const PORT = process.env.PORT || 3000;
const MODE = process.env.NODE_ENV || "development";

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} in ${MODE} mode`);
});

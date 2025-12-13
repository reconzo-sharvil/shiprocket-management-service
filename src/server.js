import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import routes from "./routes/index.js";
import authenticateApiKey from "./middlewares/auth.middleware.js";

dotenv.config();

const app = express();

const corsOptions = {
  origin: "http://127.0.0.1:5500",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
};

// Apply CORS globally
app.use(cors(corsOptions));
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

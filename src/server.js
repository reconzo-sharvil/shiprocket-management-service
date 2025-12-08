import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import routes from "./routes/index.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/v1", routes);

app.get("/", (req, res) => {
  res.send("Hello from Express backend with SQLite!");
});

const PORT = process.env.PORT || 3000;
const MODE = process.env.NODE_ENV || "development";

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} in ${MODE} mode`);
});

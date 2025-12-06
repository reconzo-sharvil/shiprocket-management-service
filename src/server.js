import express from "express";
import dotenv from "dotenv";
import routes from "./routes/index.js";

dotenv.config();

const app = express();

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

// API Endpoints

// ### Platforms
// - `POST /api/v1/platforms` - Create platform
// - `GET /api/v1/platforms` - Get all platforms

//### Clients
//- `POST /api/v1/clients/:clientName/:platform` - Create client
//- `GET /api/v1/clients/:clientName` - Get client by name
//- `GET /api/v1/clients/:clientName/status` - Get client field status



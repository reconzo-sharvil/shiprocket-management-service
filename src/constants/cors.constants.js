const isDevelopment = process.env.NODE_ENV === "development";

export const corsOptions = {
  origin: isDevelopment
    ? "http://127.0.0.1:5500"
    : "https://nondescript-idea.surge.sh",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

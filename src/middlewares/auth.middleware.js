import httpStatus from "http-status";
import logger from "../config/logger.js";

const authenticateApiKey = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      logger.warn("Missing Authorization header");
      return res.status(httpStatus.UNAUTHORIZED).json({
        success: false,
        statusCode: httpStatus.UNAUTHORIZED,
        message: "Authorization header is required",
        timestamp: new Date().toISOString(),
      });
    }

    if (!authHeader.startsWith("Bearer ")) {
      logger.warn("Invalid Authorization header format");
      return res.status(httpStatus.UNAUTHORIZED).json({
        success: false,
        statusCode: httpStatus.UNAUTHORIZED,
        message: "Authorization header must be in format: Bearer <token>",
        timestamp: new Date().toISOString(),
      });
    }

    const token = authHeader.substring(7);

    const validApiKey = process.env.API_KEY;

    if (!validApiKey) {
      logger.error("API_KEY not configured in environment variables");
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        statusCode: httpStatus.INTERNAL_SERVER_ERROR,
        message: "Server configuration error",
        timestamp: new Date().toISOString(),
      });
    }

    if (token !== validApiKey) {
      logger.warn("Invalid API key attempt");
      return res.status(httpStatus.FORBIDDEN).json({
        success: false,
        statusCode: httpStatus.FORBIDDEN,
        message: "Invalid API key",
        timestamp: new Date().toISOString(),
      });
    }

    logger.info("API key validated successfully");
    next();
  } catch (error) {
    logger.error("Error in authentication middleware:", error);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      message: "Authentication error",
      timestamp: new Date().toISOString(),
    });
  }
};

export default authenticateApiKey;

import httpStatus from "http-status";
import logger from "../config/logger.js";

const validate = (schema) => {
  return (req, res, next) => {
    try {
      const validationData = {
        body: req.body,
        params: req.params,
        query: req.query,
      };

      const result = schema.safeParse(validationData);

      if (!result.success) {
        const errors = result.error.errors.map((err) => ({
          field: err.path.slice(1).join("."),
          message: err.message,
          code: err.code,
        }));

        logger.warn(
          `Validation failed for ${req.method} ${req.path}: ${JSON.stringify(
            errors
          )}`
        );

        return res.status(httpStatus.BAD_REQUEST).json({
          success: false,
          statusCode: httpStatus.BAD_REQUEST,
          message: "Validation failed",
          errors,
          timestamp: new Date().toISOString(),
        });
      }

      next();
    } catch (error) {
      logger.error("Validation middleware error:", error);
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        statusCode: httpStatus.INTERNAL_SERVER_ERROR,
        message: "Validation error occurred",
        error: error.message,
        timestamp: new Date().toISOString(),
      });
    }
  };
};

export default validate;

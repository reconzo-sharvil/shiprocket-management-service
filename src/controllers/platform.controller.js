import platformService from "../services/platform.service.js";
import httpStatus from "http-status";
import logger from "../config/logger.js";

const createPlatform = async (req, res) => {
  logger.info(`Creating platform with data: ${JSON.stringify(req.body)}`);

  const result = await platformService.addPlatform(req.body);

  logger.info(`Platform created successfully with ID: ${result.id}`);
  return res.status(httpStatus.CREATED).json({
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Platform created successfully",
    data: { id: result.id },
    timestamp: new Date().toISOString(),
  });
};

const getPlatforms = async (req, res) => {
  logger.info("Fetching all platforms");

  const data = await platformService.getPlatforms();

  logger.info(`Retrieved ${data.length} platforms successfully`);
  return res.status(httpStatus.OK).json({
    success: true,
    statusCode: httpStatus.OK,
    message: "Platforms retrieved successfully",
    data: {
      count: data.length,
      platforms: data,
    },
    timestamp: new Date().toISOString(),
  });
};

const getPlatformByName = async (req, res) => {
  const { platformName } = req.params;
  logger.info(`Fetching platform: ${platformName}`);

  const data = await platformService.getPlatformByName(platformName);

  if (!data) {
    logger.warn(`Platform '${platformName}' not found`);
    return res.status(httpStatus.NOT_FOUND).json({
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: `Platform '${platformName}' not found`,
      timestamp: new Date().toISOString(),
    });
  }

  logger.info(`Platform '${platformName}' retrieved successfully`);
  return res.status(httpStatus.OK).json({
    success: true,
    statusCode: httpStatus.OK,
    message: "Platform retrieved successfully",
    data,
    timestamp: new Date().toISOString(),
  });
};

export default {
  createPlatform,
  getPlatforms,
  getPlatformByName,
};

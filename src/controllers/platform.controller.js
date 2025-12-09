import platformService from "../services/platform.service.js";
import httpStatus from "http-status";
import logger from "../config/logger.js";

const createPlatform = async (req, res) => {
  logger.info(`Creating platform with data: ${JSON.stringify(req.body)}`);

  const platformExists = await platformService.checkPlatformExists(
    req.body.resource_name
  );
  if (platformExists) {
    logger.warn(`Platform '${req.body.resource_name}' already exists`);
    return res.status(httpStatus.CONFLICT).json({
      success: false,
      statusCode: httpStatus.CONFLICT,
      message: `Platform '${req.body.resource_name}' already exists`,
      timestamp: new Date().toISOString(),
    });
  }

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
  const { resourceName } = req.params;
  logger.info(`Fetching platform: ${resourceName}`);

  const data = await platformService.getPlatformByResourceName(resourceName);

  if (!data) {
    logger.warn(`Platform '${resourceName}' not found`);
    return res.status(httpStatus.NOT_FOUND).json({
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: `Platform '${resourceName}' not found`,
      timestamp: new Date().toISOString(),
    });
  }

  logger.info(`Platform '${resourceName}' retrieved successfully`);
  return res.status(httpStatus.OK).json({
    success: true,
    statusCode: httpStatus.OK,
    message: "Platform retrieved successfully",
    data,
    timestamp: new Date().toISOString(),
  });
};

const updatePlatform = async (req, res) => {
  const { resourceName } = req.params;
  logger.info(`Updating platform: ${resourceName}`);

  const existingPlatform = await platformService.getPlatformByResourceName(
    resourceName
  );

  if (!existingPlatform) {
    logger.warn(`Platform '${resourceName}' not found for update`);
    return res.status(httpStatus.NOT_FOUND).json({
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: `Platform '${resourceName}' not found`,
      timestamp: new Date().toISOString(),
    });
  }

  const result = await platformService.updatePlatform(resourceName, req.body);

  logger.info(`Platform '${resourceName}' updated successfully`);
  return res.status(httpStatus.OK).json({
    success: true,
    statusCode: httpStatus.OK,
    message: "Platform updated successfully",
    data: {
      changes: result.changes,
      resource_name: resourceName,
    },
    timestamp: new Date().toISOString(),
  });
};

const deletePlatform = async (req, res) => {
  const { resourceName } = req.params;
  logger.info(`Deleting platform: ${resourceName}`);

  const existingPlatform = await platformService.getPlatformByResourceName(
    resourceName
  );

  if (!existingPlatform) {
    logger.warn(`Platform '${resourceName}' not found for deletion`);
    return res.status(httpStatus.NOT_FOUND).json({
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: `Platform '${resourceName}' not found`,
      timestamp: new Date().toISOString(),
    });
  }

  const result = await platformService.deletePlatform(resourceName);

  logger.info(`Platform '${resourceName}' deleted successfully`);
  return res.status(httpStatus.OK).json({
    success: true,
    statusCode: httpStatus.OK,
    message: "Platform deleted successfully",
    data: {
      changes: result.changes,
      resource_name: resourceName,
    },
    timestamp: new Date().toISOString(),
  });
};

export default {
  createPlatform,
  getPlatforms,
  getPlatformByName,
  updatePlatform,
  deletePlatform,
};

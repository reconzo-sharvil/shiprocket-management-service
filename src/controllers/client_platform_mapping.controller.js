import clientPlatformMappingService from "../services/client_platform_mapping.service.js";
import httpStatus from "http-status";
import logger from "../config/logger.js";

const getMappings = async (req, res) => {
  const { ownerName } = req.params;
  logger.info(`Fetching mappings for client: ${ownerName}`);

  const data = await clientPlatformMappingService.getMappingsByOwnerName(
    ownerName
  );

  logger.info(`Retrieved ${data.length} mappings for client '${ownerName}'`);
  return res.status(httpStatus.OK).json({
    success: true,
    statusCode: httpStatus.OK,
    message: "Mappings retrieved successfully",
    data: {
      count: data.length,
      mappings: data,
    },
    timestamp: new Date().toISOString(),
  });
};

const createMapping = async (req, res) => {
  const { ownerName, resourceName } = req.params;
  logger.info(
    `Creating mapping for client: ${ownerName} and platform: ${resourceName}`
  );

  const mappingExists = await clientPlatformMappingService.checkMappingExists(
    ownerName,
    resourceName
  );
  if (mappingExists) {
    logger.warn(
      `Mapping for '${ownerName}' and '${resourceName}' already exists`
    );
    return res.status(httpStatus.CONFLICT).json({
      success: false,
      statusCode: httpStatus.CONFLICT,
      message: `Mapping for '${ownerName}' and '${resourceName}' already exists`,
      timestamp: new Date().toISOString(),
    });
  }

  const result = await clientPlatformMappingService.addMapping(
    ownerName,
    resourceName
  );

  logger.info(`Mapping created successfully with ID: ${result.id}`);
  return res.status(httpStatus.CREATED).json({
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Mapping created successfully",
    data: {
      id: result.id,
      owner_name: ownerName,
      resource_name: resourceName,
    },
    timestamp: new Date().toISOString(),
  });
};

const deleteMapping = async (req, res) => {
  const { ownerName, resourceName } = req.params;
  logger.info(
    `Deleting mapping for client: ${ownerName} and platform: ${resourceName}`
  );

  const mappingExists = await clientPlatformMappingService.checkMappingExists(
    ownerName,
    resourceName
  );
  if (!mappingExists) {
    logger.warn(
      `Mapping for '${ownerName}' and '${resourceName}' not found for deletion`
    );
    return res.status(httpStatus.NOT_FOUND).json({
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: `Mapping for '${ownerName}' and '${resourceName}' not found`,
      timestamp: new Date().toISOString(),
    });
  }

  const result = await clientPlatformMappingService.deleteMapping(
    ownerName,
    resourceName
  );

  logger.info(
    `Mapping for '${ownerName}' and '${resourceName}' deleted successfully`
  );
  return res.status(httpStatus.OK).json({
    success: true,
    statusCode: httpStatus.OK,
    message: "Mapping deleted successfully",
    data: {
      changes: result.changes,
      owner_name: ownerName,
      resource_name: resourceName,
    },
    timestamp: new Date().toISOString(),
  });
};

export default {
  getMappings,
  createMapping,
  deleteMapping,
};

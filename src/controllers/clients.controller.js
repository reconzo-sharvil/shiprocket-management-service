import clientsService from "../services/clients.service.js";
import platformService from "../services/platform.service.js";
import httpStatus from "http-status";
import logger from "../config/logger.js";

const getClient = async (req, res) => {
  const { ownerName } = req.params;
  logger.info(`Fetching client: ${ownerName}`);

  const data = await clientsService.getClientByOwnerName(ownerName);

  if (!data || data.length === 0) {
    logger.warn(`Client '${ownerName}' not found`);
    return res.status(httpStatus.NOT_FOUND).json({
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: `Client '${ownerName}' not found`,
      timestamp: new Date().toISOString(),
    });
  }

  logger.info(`Client '${ownerName}' retrieved successfully`);
  return res.status(httpStatus.OK).json({
    success: true,
    statusCode: httpStatus.OK,
    message: "Client retrieved successfully",
    data: {
      count: data.length,
      clients: data,
    },
    timestamp: new Date().toISOString(),
  });
};

const createClient = async (req, res) => {
  const { ownerName, resourceName } = req.params;
  logger.info(`Creating client: ${ownerName} for platform: ${resourceName}`);

  const clientExists = await clientsService.checkClientExists(
    ownerName,
    resourceName
  );
  if (clientExists) {
    logger.warn(
      `Client '${ownerName}' with platform '${resourceName}' already exists`
    );
    return res.status(httpStatus.CONFLICT).json({
      success: false,
      statusCode: httpStatus.CONFLICT,
      message: `Client '${ownerName}' with platform '${resourceName}' already exists`,
      timestamp: new Date().toISOString(),
    });
  }

  const platformDetails = await platformService.getPlatformByResourceName(
    resourceName
  );

  const clientData = {
    ...req.body,
    owner_name: ownerName,
    resource_name: resourceName,
  };

  const result = await clientsService.addClient(clientData, platformDetails);

  logger.info(
    `Client '${ownerName}' created successfully with ID: ${result.id}`
  );
  return res.status(httpStatus.CREATED).json({
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Client created successfully",
    data: {
      id: result.id,
      owner_name: ownerName,
      resource_name: resourceName,
    },
    timestamp: new Date().toISOString(),
  });
};

const updateClient = async (req, res) => {
  const { ownerName, resourceName } = req.params;
  logger.info(`Updating client: ${ownerName} for platform: ${resourceName}`);

  const clientExists = await clientsService.checkClientExists(
    ownerName,
    resourceName
  );
  if (!clientExists) {
    logger.warn(
      `Client '${ownerName}' with platform '${resourceName}' not found for update`
    );
    return res.status(httpStatus.NOT_FOUND).json({
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: `Client '${ownerName}' with platform '${resourceName}' not found`,
      timestamp: new Date().toISOString(),
    });
  }

  let platformDetails = null;
  if (req.body.resource_name) {
    platformDetails = await platformService.getPlatformByResourceName(
      req.body.resource_name
    );
  }

  const result = await clientsService.updateClient(
    ownerName,
    resourceName,
    req.body,
    platformDetails
  );

  logger.info(`Client '${ownerName}' updated successfully`);
  return res.status(httpStatus.OK).json({
    success: true,
    statusCode: httpStatus.OK,
    message: "Client updated successfully",
    data: {
      changes: result.changes,
      owner_name: ownerName,
      resource_name: resourceName,
    },
    timestamp: new Date().toISOString(),
  });
};

const deleteClient = async (req, res) => {
  const { ownerName, resourceName } = req.params;
  logger.info(`Deleting client: ${ownerName} for platform: ${resourceName}`);

  const clientExists = await clientsService.checkClientExists(
    ownerName,
    resourceName
  );
  if (!clientExists) {
    logger.warn(
      `Client '${ownerName}' with platform '${resourceName}' not found for deletion`
    );
    return res.status(httpStatus.NOT_FOUND).json({
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: `Client '${ownerName}' with platform '${resourceName}' not found`,
      timestamp: new Date().toISOString(),
    });
  }

  const result = await clientsService.deleteClient(ownerName, resourceName);

  logger.info(
    `Client '${ownerName}' with platform '${resourceName}' deleted successfully`
  );
  return res.status(httpStatus.OK).json({
    success: true,
    statusCode: httpStatus.OK,
    message: "Client deleted successfully",
    data: {
      changes: result.changes,
      owner_name: ownerName,
      resource_name: resourceName,
    },
    timestamp: new Date().toISOString(),
  });
};

const getClientStatus = async (req, res) => {
  const { ownerName } = req.params;
  logger.info(`Fetching status for client: ${ownerName}`);

  const data = await clientsService.getClientFieldsStatus(ownerName);

  logger.info(`Client '${ownerName}' status retrieved successfully`);
  return res.status(httpStatus.OK).json({
    success: true,
    statusCode: httpStatus.OK,
    message: "Client status retrieved successfully",
    data,
    timestamp: new Date().toISOString(),
  });
};

export default {
  getClient,
  createClient,
  updateClient,
  deleteClient,
  getClientStatus,
};

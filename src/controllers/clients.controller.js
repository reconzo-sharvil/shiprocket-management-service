import clientsService from "../services/clients.service.js";
import platformService from "../services/platform.service.js";
import httpStatus from "http-status";
import logger from "../config/logger.js";

const getClient = async (req, res) => {
  const { clientName } = req.params;
  logger.info(`Fetching client: ${clientName}`);

  const data = await clientsService.getClientByName(clientName);

  if (!data || data.length === 0) {
    logger.warn(`Client '${clientName}' not found`);
    return res.status(httpStatus.NOT_FOUND).json({
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: `Client '${clientName}' not found`,
      timestamp: new Date().toISOString(),
    });
  }

  logger.info(`Client '${clientName}' retrieved successfully`);
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
  const { clientName, platform } = req.params;
  logger.info(`Creating client: ${clientName} for platform: ${platform}`);

  const platformDetails = await platformService.getPlatformByName(platform);

  const clientData = {
    ...req.body,
    client_name: clientName,
    owner_name: platform,
  };

  const result = await clientsService.addClient(clientData, platformDetails);

  logger.info(
    `Client '${clientName}' created successfully with ID: ${result.id}`
  );
  return res.status(httpStatus.CREATED).json({
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Client created successfully",
    data: {
      id: result.id,
      client_name: clientName,
      platform: platform,
    },
    timestamp: new Date().toISOString(),
  });
};

const updateClient = async (req, res) => {
  const { clientName } = req.params;
  logger.info(`Updating client: ${clientName}`);

  const existingClient = await clientsService.getClientByName(clientName);

  if (!existingClient || existingClient.length === 0) {
    logger.warn(`Client '${clientName}' not found for update`);
    return res.status(httpStatus.NOT_FOUND).json({
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: `Client '${clientName}' not found`,
      timestamp: new Date().toISOString(),
    });
  }

  let platformDetails = null;
  if (req.body.owner_name) {
    platformDetails = await platformService.getPlatformByName(
      req.body.owner_name
    );
  }

  const result = await clientsService.updateClient(
    clientName,
    req.body,
    platformDetails
  );

  logger.info(`Client '${clientName}' updated successfully`);
  return res.status(httpStatus.OK).json({
    success: true,
    statusCode: httpStatus.OK,
    message: "Client updated successfully",
    data: {
      changes: result.changes,
      client_name: clientName,
    },
    timestamp: new Date().toISOString(),
  });
};

const getClientStatus = async (req, res) => {
  const { clientName } = req.params;
  logger.info(`Fetching status for client: ${clientName}`);

  const data = await clientsService.getClientFieldsStatus(clientName);

  logger.info(`Client '${clientName}' status retrieved successfully`);
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
  getClientStatus,
};

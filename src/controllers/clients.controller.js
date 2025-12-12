import clientsService from "../services/clients.service.js";
import platformService from "../services/platform.service.js";
import httpStatus from "http-status";
import logger from "../config/logger.js";

const getClient = async (req, res) => {
  const { ownerName } = req.params;

  try {
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
  } catch (error) {
    logger.error(`Error fetching client '${ownerName}':`, error);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      message: "An error occurred while fetching the client",
      error: error.message,
      timestamp: new Date().toISOString(),
    });
  } finally {
    logger.debug(`getClient request completed for: ${ownerName}`);
  }
};

const getClientByPlatform = async (req, res) => {
  const { ownerName, resourceName } = req.params;

  try {
    logger.info(`Fetching client: ${ownerName} for platform: ${resourceName}`);

    const data = await clientsService.getClientByOwnerAndResource(
      ownerName,
      resourceName
    );

    if (!data) {
      logger.warn(
        `Client '${ownerName}' with platform '${resourceName}' not found`
      );
      return res.status(httpStatus.NOT_FOUND).json({
        success: false,
        statusCode: httpStatus.NOT_FOUND,
        message: `Client '${ownerName}' with platform '${resourceName}' not found`,
        timestamp: new Date().toISOString(),
      });
    }

    logger.info(
      `Client '${ownerName}' for platform '${resourceName}' retrieved successfully`
    );
    return res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: "Client retrieved successfully",
      data: data,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    logger.error(
      `Error fetching client '${ownerName}' for platform '${resourceName}':`,
      error
    );
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      message: "An error occurred while fetching the client",
      error: error.message,
      timestamp: new Date().toISOString(),
    });
  } finally {
    logger.debug(
      `getClientByPlatform request completed for: ${ownerName}/${resourceName}`
    );
  }
};

const createClient = async (req, res) => {
  const { ownerName, resourceName } = req.params;

  try {
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
  } catch (error) {
    logger.error(`Error creating client '${ownerName}':`, error);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      message: "An error occurred while creating the client",
      error: error.message,
      timestamp: new Date().toISOString(),
    });
  } finally {
    logger.debug(`createClient request completed for: ${ownerName}`);
  }
};

const updateClient = async (req, res) => {
  const { ownerName, resourceName } = req.params;

  try {
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
  } catch (error) {
    logger.error(`Error updating client '${ownerName}':`, error);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      message: "An error occurred while updating the client",
      error: error.message,
      timestamp: new Date().toISOString(),
    });
  } finally {
    logger.debug(`updateClient request completed for: ${ownerName}`);
  }
};

const deleteClient = async (req, res) => {
  const { ownerName, resourceName } = req.params;

  try {
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
  } catch (error) {
    logger.error(`Error deleting client '${ownerName}':`, error);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      message: "An error occurred while deleting the client",
      error: error.message,
      timestamp: new Date().toISOString(),
    });
  } finally {
    logger.debug(`deleteClient request completed for: ${ownerName}`);
  }
};

const getClientStatus = async (req, res) => {
  const { ownerName } = req.params;

  try {
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
  } catch (error) {
    logger.error(`Error fetching status for client '${ownerName}':`, error);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      message: "An error occurred while fetching the client status",
      error: error.message,
      timestamp: new Date().toISOString(),
    });
  } finally {
    logger.debug(`getClientStatus request completed for: ${ownerName}`);
  }
};

export default {
  getClient,
  getClientByPlatform,
  createClient,
  updateClient,
  deleteClient,
  getClientStatus,
};

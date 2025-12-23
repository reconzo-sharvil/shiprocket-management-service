import shiprocketService from "../services/shiprocket.service.js";
import httpStatus from "http-status";
import logger from "../config/logger.js";

const getShiprocketAuthToken = async (req, res) => {
  const { email, password } = req.body;

  logger.info(`Shiprocket auth attempt for: ${email}`);

  try {
    const { token } = await shiprocketService.loginToShiprocket(
      email,
      password
    );

    logger.info(`Shiprocket auth successful for: ${email}`);

    return res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: "Authentication successful",
      data: { token },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    logger.error(`Shiprocket auth failed for ${email}: ${error.message}`);

    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      message: error.message,
      timestamp: new Date().toISOString(),
    });
  } finally {
    logger.info(`Shiprocket auth request completed for: ${email}`);
  }
};

const getAllReports = async (req, res) => {
  const { client } = req.body;

  logger.info(`Shiprocket reports request for client: ${client}`);

  try {
    const clientCreds = await shiprocketService.getClientCred(client);
    if (!clientCreds.username || !clientCreds.password) {
      return res.status(httpStatus.BAD_REQUEST).json({
        success: false,
        statusCode: httpStatus.BAD_REQUEST,
        message: "Client credentials not found",
        timestamp: new Date().toISOString(),
      });
    }
    const { token } = await shiprocketService.loginToShiprocket(
      clientCreds.username,
      clientCreds.password
    );

    logger.info(`Shiprocket auth successful for client: ${client}`);

    const reports = await shiprocketService.getAllReports(token);

    logger.info(`Successfully fetched reports for client: ${client}`);

    return res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: "Reports fetched successfully",
      data: reports,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    logger.error(`Failed to fetch reports for ${client}: ${error.message}`);

    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      message: error.message,
      timestamp: new Date().toISOString(),
    });
  } finally {
    logger.info(`Shiprocket reports request completed for: ${client}`);
  }
};

export default {
  getShiprocketAuthToken,
  getAllReports,
};

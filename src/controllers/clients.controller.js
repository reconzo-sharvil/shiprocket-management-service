import clientsService from "../services/clients.service.js";
import platformService from "../services/platform.service.js";

const getClient = async (req, res) => {
    try {
        const { clientName } = req.params;
        const data = await clientsService.getClientByName(clientName);

        if (!data || data.length === 0) {
            return res.status(404).json({
                success: false,
                statusCode: 404,
                message: `Client '${clientName}' not found`,
                timestamp: new Date().toISOString()
            });
        }

        return res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Client retrieved successfully",
            data: {
                count: data.length,
                clients: data
            },
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            statusCode: 400,
            message: error.message,
            timestamp: new Date().toISOString()
        });
    }
};

const createClient = async (req, res) => {
    try {
        const { clientName, platform } = req.params;

        const platformDetails = await platformService.getPlatformByName(platform);

        if (!platformDetails) {
            return res.status(404).json({
                success: false,
                statusCode: 404,
                message: `Platform '${platform}' not found`,
                timestamp: new Date().toISOString()
            });
        }

        const clientData = {
            ...req.body,
            client_name: clientName,
            owner_name: platform
        };

        const result = await clientsService.addClient(clientData, platformDetails);

        return res.status(201).json({
            success: true,
            statusCode: 201,
            message: "Client created successfully",
            data: {
                id: result.id,
                client_name: clientName,
                platform: platform
            },
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            statusCode: 400,
            message: error.message,
            timestamp: new Date().toISOString()
        });
    }
};

const getClientStatus = async (req, res) => {
    try {
        const { clientName } = req.params;
        const data = await clientsService.getClientFieldsStatus(clientName);

        return res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Client status retrieved successfully",
            data,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        return res.status(404).json({
            success: false,
            statusCode: 404,
            message: error.message,
            timestamp: new Date().toISOString()
        });
    }
};

export default {
    getClient,
    createClient,
    getClientStatus
};
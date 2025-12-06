import platformService from "../services/platform.service.js";

const createPlatform = async (req, res) => {
    try {
        const result = await platformService.addPlatform(req.body);

        return res.status(201).json({
            success: true,
            statusCode: 201,
            message: "Platform created successfully",
            data: { id: result.id },
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

const getPlatforms = async (req, res) => {
    try {
        const data = await platformService.getPlatforms();

        return res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Platforms retrieved successfully",
            data: {
                count: data.length,
                platforms: data
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

const getPlatformByName = async (req, res) => {
    try {
        const { platformName } = req.params;
        const data = await platformService.getPlatformByName(platformName);

        if (!data) {
            return res.status(404).json({
                success: false,
                statusCode: 404,
                message: `Platform '${platformName}' not found`,
                timestamp: new Date().toISOString()
            });
        }

        return res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Platform retrieved successfully",
            data,
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

export default {
    createPlatform,
    getPlatforms,
    getPlatformByName
};
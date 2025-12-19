import logger from "../config/logger.js";

const SHIPROCKET_AUTH_URL =
  "https://apiv2.shiprocket.in/v1/external/auth/login";
const SHIPROCKET_ALL_REPORTS_BASE =
  "https://apiv2.shiprocket.in/v1/reports/all";
const CLIENT_MANAGEMENT_API =
  "https://client-management-system-998939518235.asia-south1.run.app/api/v1/clients";

const getClientCred = async (clientname) => {
  try {
    console.log(clientname);

    const response = await fetch(
      `${CLIENT_MANAGEMENT_API}/${clientname}/shiprocket`,
      {
        headers: {
          Authorization: "Bearer 7xQ92fTnA4pL0kDbH3vR8wJyS5mEqZtC",
        },
      }
    );

    if (!response.ok) {
      logger.error(`Failed to fetch client credentials (${response.status})`);
      throw new Error("Failed to fetch client credentials");
    }

    const result = await response.json();

    if (!result.data || !result.data.username || !result.data.password) {
      throw new Error("Invalid credentials format in response");
    }

    return {
      username: result.data.username,
      password: result.data.password,
    };
  } catch (error) {
    logger.error(`Error fetching client credentials: ${error.message}`);
    throw error;
  }
};

const loginToShiprocket = async (email, password) => {
  const response = await fetch(SHIPROCKET_AUTH_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "User-Agent": "NodeJS",
    },

    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    logger.error(
      `Shiprocket API error (${response.status}): ${
        data?.message || "Login failed"
      }`
    );
    throw new Error(data.message || "Shiprocket login failed");
  }

  return data;
};

const getAllReports = async (token) => {
  const toDate = new Date();
  const fromDate = new Date();
  fromDate.setMonth(fromDate.getMonth() - 1);

  // Fix: Use numeric date format YYYY-MM-DD
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const from = formatDate(fromDate);
  const to = formatDate(toDate);

  const url = `${SHIPROCKET_ALL_REPORTS_BASE}?from=${from}&to=${to}&is_web=1&page=1&per_page=15&title_id=&type_id=`;

  logger.info(`Fetching Shiprocket reports from ${from} to ${to}`);

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "User-Agent": "NodeJS",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    logger.error(
      `Shiprocket API error (${response.status}): ${
        data?.message || "Failed to fetch reports"
      }`
    );
    throw new Error(data.message || "Shiprocket reports fetch failed");
  }

  return data;
};

export default {
  loginToShiprocket,
  getClientCred,
  getAllReports,
};

import { BaseApiClient } from "./BaseApiClient";

class AdminApiClient extends BaseApiClient {
    constructor() {
        super(process.env.REACT_APP_API_ADMIN_URL);
    }

    handleError(status, errorData) {
        if (status === 401) {
            window.location.href = "/admin/signin";
        } else {
            console.error(`[Admin API Error]: ${errorData.message}`);
        }
    }
}

export const adminApiClient = new AdminApiClient();
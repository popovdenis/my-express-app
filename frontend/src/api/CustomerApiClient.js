import { BaseApiClient } from "./BaseApiClient";

class CustomerApiClient extends BaseApiClient {
    constructor() {
        super(process.env.REACT_APP_API_URL);
    }

    handleError(status, errorData) {
        if (status === 401) {
            window.location.href = "/signin";
        } else {
            console.error(`[Customer API Error]: ${errorData.message}`);
        }
    }
}

export const customerApiClient = new CustomerApiClient();
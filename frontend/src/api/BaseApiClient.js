class BaseApiClient {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }

    async request(method, endpoint, options = {}) {
        const { body, params, headers = {}, credentials = "include" } = options;

        const url = new URL(`${this.baseURL}${endpoint}`);

        if (params) {
            Object.keys(params).forEach((key) => url.searchParams.append(key, params[key]));
        }

        if (body instanceof FormData) {
            delete headers["Content-Type"];
        }

        try {
            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    ...headers,
                },
                body: body instanceof FormData ? body : JSON.stringify(body),
                credentials,
            });

            if (!response.ok) {
                const errorData = await response.json();

                this.handleError(response.status, errorData);

                throw new Error(errorData.message || "Unknown error occurred");
            }

            return await response.json();
        } catch (error) {
            console.error(`[API Error]: ${error.message}`);
            throw error;
        }
    }

    get(endpoint, options = {}) {
        return this.request("GET", endpoint, options);
    }

    post(endpoint, options = {}) {
        return this.request("POST", endpoint, options);
    }

    put(endpoint, options = {}) {
        return this.request("PUT", endpoint, options);
    }

    delete(endpoint, options = {}) {
        return this.request("DELETE", endpoint, options);
    }

    handleError(status, errorData) {
        console.error("Base error handler called", status, errorData);
    }
}
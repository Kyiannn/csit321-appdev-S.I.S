export class HttpError extends Error {
    status: number;
    constructor(status: number, message: string) {
        super(message);
        this.status = status;
        this.name = "HttpError";
    }
}

export const API_BASE_URL = import.meta.env.VITE_APP_API_URL;

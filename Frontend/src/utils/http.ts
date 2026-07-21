export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export class HttpError extends Error {
    status: number;

    constructor(status: number, message: string) {
        super(message);
        this.status = status;
        this.name = 'HttpError';
    }
}

// Helper for fetch with auth
export const fetchWithAuth = async (endpoint: string, options: RequestInit = {}) => {
    const response = await fetch(API_BASE_URL + endpoint, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
        credentials: 'include',
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new HttpError(response.status, errorData.message || response.statusText);
    }

    return response;
};
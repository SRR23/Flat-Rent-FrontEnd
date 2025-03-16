import axios from "axios";

const BASE_URL = "https://flat-rent-api.onrender.com/api";

// Create main axios instance
const myaxios = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Create a separate instance for refreshing tokens (no interceptors)
const refreshAxios = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Function to refresh the token
const refreshToken = async () => {
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) return null;

    try {
        console.log("Refreshing token...");
        const response = await refreshAxios.post('/token/refresh/', { refresh: refreshToken });
        const newAccessToken = response.data.access;
        
        // Store new access token
        localStorage.setItem('token', newAccessToken);
        return newAccessToken;
    } catch (err) {
        console.error('Token refresh failed:', err);
        localStorage.removeItem('token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user');
        window.location.href = '/login/';
        return null;
    }
};

// Attach token to requests
myaxios.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    console.log("Sending token:", token);  // Debugging
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Response Interceptor for handling token expiration
myaxios.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;

        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            const newToken = await refreshToken();
            if (newToken) {
                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                return myaxios(originalRequest);
            }
        }
        return Promise.reject(error);
    }
);

export default myaxios;













{/*
import axios from "axios";

const myaxios = axios.create({
    baseURL: "https://flat-rent-api.onrender.com/api",
    headers: {
        'Content-Type': 'application/json',
    },
});

myaxios.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    console.log("Sending token:", token);  // Debugging
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Interceptor for handling token expiration
myaxios.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;
        
        if (error.response && error.response.status === 401) {
            const refreshToken = localStorage.getItem('refresh_token');
            
            if (refreshToken && !originalRequest._retry) {
                originalRequest._retry = true;

                try {
                    console.log("Refreshing token...");
                    const response = await myaxios.post('/token/refresh/', {
                        refresh: refreshToken,
                    }, {
                        headers: { 'Content-Type': 'application/json' }
                    });

                    const newAccessToken = response.data.access;
                    localStorage.setItem('token', newAccessToken);

                    originalRequest.headers = {
                        ...originalRequest.headers,
                        Authorization: `Bearer ${newAccessToken}`,
                    };

                    return myaxios(originalRequest);
                } catch (err) {
                    console.error('Token refresh failed:', err);
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    localStorage.removeItem('refresh_token');
                    window.location.href = '/login/';
                }
            }
        }
        return Promise.reject(error);
    }
);

export default myaxios;
*/}

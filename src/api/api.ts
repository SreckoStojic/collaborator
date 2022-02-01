import axios from 'axios';
import history from '../CustomRouter/history';

let token = localStorage.getItem('accessToken');
const baseUrl = process.env.REACT_APP_API_URL;
const apiInstance = axios.create({
    baseURL: baseUrl,
    headers: {
        'Content-Type': 'application/json',
    },
});

apiInstance.interceptors.request.use(
    (req) => {
        if (!token) {
            token = localStorage.getItem('accessToken');
            req.headers = {
                Authorization: `Bearer ${token}`,
            };
        }
        return req;
    },
    (error) => {
        Promise.reject(error);
    }
);

apiInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async function (error) {
        const originalRequest = error.config;
        if (
            error.respnse.status === 401 &&
            originalRequest.url ===
                `${process.env.REACT_APP_API_URL}/auth/token`
        ) {
            history.replace('/login');
            return Promise.reject(error);
        }
        if (error.respnse.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const refreshToken = localStorage.getItem('refreshToken');
            const res = await axios.post('/auth/token', {
                refreshToken: refreshToken,
            });
            if (res.status === 201) {
                localStorage.setItem('accessToken', res.data.accessToken);
                localStorage.setItem('refreshToken', res.data.refreshToken);
                axios.defaults.headers.common[
                    'Authorization'
                ] = `Bearer ${localStorage.getItem('accessToken')}`;
                return apiInstance(originalRequest);
            }
        }
        return Promise.reject(error);
    }
);

export default apiInstance;

import axios from 'axios';
import history from '@components/CustomRouter/history';

const baseUrl = process.env.REACT_APP_API_URL;
const apiInstance = axios.create({
    baseURL: baseUrl,
    headers: {
        'Content-Type': 'application/json',
    },
});

apiInstance.interceptors.request.use(
    (config) => {
        let token = localStorage.getItem('accessToken');
        if (token) {
            token = localStorage.getItem('accessToken');
            config.headers = {
                Authorization: `Bearer ${token}`,
            };
        }
        return config;
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
            error.message == 'Request failed with status code 401' &&
            originalRequest.url === `${baseUrl}/auth/token`
        ) {
            history.replace('/login');
            return Promise.reject(error);
        }
        if (
            error.message == 'Request failed with status code 403' &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;
            const refreshToken = localStorage.getItem('refreshToken');
            const res = await apiInstance.post('/auth/token', {
                refreshToken: refreshToken,
            });
            console.log(res.data);
            if (res.statusText.toLocaleUpperCase() == 'OK') {
                localStorage.setItem('accessToken', res.data);
                apiInstance.defaults.headers.common[
                    'Authorization'
                ] = `Bearer ${localStorage.getItem('accessToken')}`;
                return apiInstance(originalRequest);
            }
        }
        return Promise.reject(error);
    }
);

export default apiInstance;
